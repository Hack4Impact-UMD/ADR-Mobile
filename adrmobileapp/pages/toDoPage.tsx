import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  Image,
} from 'react-native';
import ScheduleItem from '../components/ScheduleItem';
import moment from 'moment';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../components/AuthProvider';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"; 
import CryptoJS from 'crypto-js';

type routeProp = RouteProp<RootStackParamList, 'ToDo'>;
type navProp = StackNavigationProp<RootStackParamList, 'ToDo'>;

type ToDoPageProps = {
  route: routeProp;
  navigation: navProp;
};
export function ToDoScreen(props: ToDoPageProps): React.JSX.Element {
  const navigation = useNavigation();
  const context = useAuth();
  const userId = context.user?.uid;
  const db = getFirestore();

  const [tasks, setTasks] = useState<{ id: string; bookTitle: string; task: string; dueDate: string; taskType: string; completed: boolean; navigateTo: string; }[]>([]);
  const [loading, setLoading] = useState(true);

  async function getPreSurveyDueDate(uid: string) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const creationDate = docSnap.data().creationDate;
      const date = new Date(creationDate);
      const dueDate = moment(date).add(1, 'day').format('M/D');
      return dueDate;
    } else {
      console.log("No such document");
      return null;
    }
  }

  function generateTaskId(uid: string, bookTitle: string, task: string, dueDate: string): string {
    const rawId = `${uid}_${bookTitle}_${task}_${dueDate}`;
    const hash = CryptoJS.SHA256(rawId).toString();
  
    return hash;
  }

  async function writePreSurvey(uid: string) {
    const bookTitle = 'Survey';
    const task = 'Pre-Survey';
    const dueDate = await getPreSurveyDueDate(uid);
  
    let taskId = '';
    if(dueDate) {
      taskId = generateTaskId(uid, bookTitle, task, dueDate);
    }
  
    const docRef = doc(db, "users", uid);
    const tasksCollection = collection(docRef, 'tasks');
    const taskDocRef = doc(tasksCollection, taskId);
  
    const taskDocSnap = await getDoc(taskDocRef);
    if (taskDocSnap.exists()) {
      console.log("Task already exists. Skipping creation.");
      return;
    }
  
    const presurveyData = {
      id: taskId,
      bookTitle,
      task,
      dueDate,
      taskType: 'survey',
      completed: false,
      navigateTo: 'PreSurvey',
    };
  
    await setDoc(taskDocRef, presurveyData);
    console.log("Pre-Survey task created with ID:", taskId);
  }

  type Task = {
    id: string;
    bookTitle: string;
    task: string;
    dueDate: string;
    taskType: string;
    completed: boolean;
    navigateTo: string;
  };
  
  async function getTasks(uid: string) {
    const docRef = doc(db, "users", uid);
    const tasksCollection = collection(docRef, 'tasks');
  
    try {
      const querySnapshot = await getDocs(tasksCollection);
      const fetchedTasks: Task[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
  
      const incompleteTasks = fetchedTasks.filter(task => !task.completed);
      
      setTasks(incompleteTasks);
      console.log("Tasks refreshed");
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  }
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (userId) {
          await writePreSurvey(userId);
          await getTasks(userId);
        }
        setLoading(false);
      };
  
      fetchData();
    }, [userId])
  );  

  if (loading) {
    return (
      <SafeAreaView style={styles.scrollView}>
        <Text style={styles.header}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const sections = tasks.reduce((acc, task) => {
    const dueDate = moment(task.dueDate, 'M/D').format('MMMM D');
    const category = task.completed ? 'Completed' : dueDate;

    if (!acc[category]) {
      acc[category] = { title: category, data: [] };
    }
    acc[category].data.push(task);
    return acc;
  }, {});

  const sortedSections = Object.keys(sections)
    .sort((a, b) => {
      if (a === 'Completed') return 1;
      if (b === 'Completed') return -1;

      return moment(a, 'MMMM D').diff(moment(b, 'MMMM D'));
    })
    .map(key => ({
      title: key,
      data: sections[key].data,
    }));

  return (
    <SafeAreaView
      style={styles.scrollView}
    >
      <Image style={styles.blob} source={require('../assets/images/todoBlob.png')} />
      <Text style={styles.header}>To Do</Text>
      <SectionList
        sections={sortedSections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ScheduleItem
            bookTitle={item.bookTitle}
            task={item.task}
            dueDate={item.dueDate}
            completed={item.completed}
            taskType={item.taskType}
            onPress={() => {
              if (item.navigateTo) {
                const targetScreen = item.navigateTo;
                const taskType = item.taskType;
                try {
                  if (taskType != 'survey') {
                    props.navigation.navigate(targetScreen, {book: item.book, chapter: item.book.chapter});
                  } else {
                    props.navigation.navigate(targetScreen, {surveyId: item.id});
                  }
                } catch (error) {
                  console.warn(`Navigation target "${item.navigateTo}" not found.`);
                }
              }
            }
          }
        />
      )}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',  
    alignItems: 'center',
  },
  header: {
    fontFamily:"Chillax",
    fontSize: 30,
    marginBottom: '4%',
    color: '#000000',
    textAlign: 'center',
    marginTop: '10%',
  },
  blob: {
    position: 'absolute',
    width: 450,
    height: 480,
    top:225,
    overflow: 'visible',
  }
});
