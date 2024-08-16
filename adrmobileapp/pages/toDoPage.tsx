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
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"; 
import CryptoJS from 'crypto-js';
import { Book } from '../customTypes';
import {Chapter} from '../customTypes';

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

  const [tasks, setTasks] = useState<{ id: string; bookId: string; chapterId : string; dueDate: string; taskType: string; completed: boolean; navigateTo: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [frontendLoading, setFrontendLoading] = useState(true);

  async function getDistrict() {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // return docSnap.data().schoolDistrictId;
      return 'University of Maryland';
    } else {
      console.log("No such document");
      return null;
    }
  }

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

  function generateTaskId(uid: string, taskType: string, dueDate: string): string {
    const rawId = `${uid}_${taskType}_${dueDate}`;
    const hash = CryptoJS.SHA256(rawId).toString();
  
    return hash;
  }

  async function writePreSurvey(uid: string) {
    const dueDate = await getPreSurveyDueDate(uid);
  
    let taskId = '';
    if(dueDate) {
      taskId = generateTaskId(uid, 'presurvey', dueDate);
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
      dueDate,
      taskType: 'presurvey',
      completed: false,
      navigateTo: 'PreSurvey',
    };
  
    await setDoc(taskDocRef, presurveyData);
    console.log("Pre-Survey task created with ID:", taskId);
  }

  async function getReadingSchedule() {
    const districtId = await getDistrict();

    const collectionRef = collection(db, 'readingSchedules');
    const q = query(collectionRef, where('schoolDistrictId', '==', districtId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (readingScheduleItem) => {
      const taskId = generateTaskId(userId, 'presurvey', readingScheduleItem.data().dueDate);

      const userRef = doc(db, "users", userId);
      const tasksCollection = collection(userRef, 'tasks');
      const taskDocRef = doc(tasksCollection, taskId);
      const taskDocSnap = await getDoc(taskDocRef);

      if (taskDocSnap.exists()) {
        console.log("Task already exists. Skipping creation.");
      } else {
        const taskData = {
          id: taskId,
          bookId: readingScheduleItem.data().bookId,
          chapterId: readingScheduleItem.data().chapterId,
          dueDate: readingScheduleItem.data().dueDate,
          taskType: 'read',
          completed: false,
          navigateTo: 'BookMain',
        };
        await setDoc(taskDocRef, taskData);
        console.log("Reading task created with ID:", taskId);
      }
    

      const quizTaskId = generateTaskId(userId, 'quiz', readingScheduleItem.data().dueDate);
      const quizTaskDocRef = doc(tasksCollection, quizTaskId);
      const quizTaskDocSnap = await getDoc(quizTaskDocRef);

      if (quizTaskDocSnap.exists()) {
        console.log("Quiz task already exists. Skipping creation.");
      } else {
        const quizTaskData = {
          id: quizTaskId,
          bookId: readingScheduleItem.data().bookId,
          chapterId: readingScheduleItem.data().chapterId,
          dueDate: readingScheduleItem.data().dueDate,
          taskType: 'quiz',
          completed: false,
          navigateTo: 'BookQuiz',
        };
        await setDoc(quizTaskDocRef, quizTaskData);
        console.log("Quiz task created with ID:", quizTaskId);
      }
    });
  }

  type Task = {
    id: string;
    bookId: string;
    chapterId: string;
    dueDate: string;
    taskType: string;
    completed: boolean;
    navigateTo: string;
  };

  async function getBook(bookId:string) {
    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const bookData = docSnap.data();
      const book: Book = {
        title: bookData.title,
        author: bookData.author,
        info: '',
        pages: 0,
        isbn: '',
        picture_link: bookData.imageUrl,
        description: bookData.description
      };
      return book;
    } else {
      console.log("No such book");
      return undefined;
    }
  }

  async function getChapter(bookId:string, chapterId:string) {
    const docRef = doc(db, "books", bookId, "Chapters", chapterId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      const chapterData = docSnap.data();

      const chapter: Chapter = {
        chapterNum: chapterData.chapterNumber,
        questions: chapterData.questions,
        answers: chapterData.answers,
      };
      return chapter;
    } else {
      console.log("No such chapter");
      return undefined;
    }
  }
  
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
  
      const tasksWithTitles = await Promise.all(incompleteTasks.map(async (task) => {
        if (!task.taskType.includes('survey')) {
          const book = await getBook(task.bookId);
          const chapter = await getChapter(task.bookId, task.chapterId);
  
          if (book && chapter) {
            return {
              ...task,
              book: book,
              chapter: chapter 
            };
          } else {
            return null;
          }
        } else {
          return task;
        }
      }));

      const filteredTasks = tasksWithTitles.filter(task => task !== null);
  
      setTasks(filteredTasks as Task[]);
      console.log("Tasks refreshed");
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  }
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        if (userId) {
          await Promise.all([
            writePreSurvey(userId),
            getReadingSchedule(),
            getTasks(userId)
          ]);
        }
        setLoading(false);
      };
  
      fetchData();
    }, [userId])
  );

  useEffect(() => {
    if (!loading) {
      // Simulate frontend tasks
      setTimeout(() => {
        setFrontendLoading(false);
      }, 1000); // Adjust the timeout as needed
    }
  }, [loading]);

  if (loading || frontendLoading) {
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
            bookTitle={item.book?.title}
            chapterNumber={item.chapter?.chapterNum}
            task={item.task}
            dueDate={item.dueDate}
            completed={item.completed}
            taskType={item.taskType}
            onPress={() => {
              if (item.navigateTo) {
                const targetScreen = item.navigateTo;
                const taskType = item.taskType;
                try {
                  if (taskType != 'presurvey' && taskType != 'postsurvey') {
                    props.navigation.navigate(targetScreen, {book: item.book, chapter: item.chapter, taskId: item.id});
                  } else {
                    console.log('nav');
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