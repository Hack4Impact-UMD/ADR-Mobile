import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import ScheduleItem from '../components/ScheduleItem';
import moment from 'moment';
import {
  getDoc,
  getFirestore,
  query,
  collection,
  getDocs,
  doc,
} from 'firebase/firestore';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type ToDoProps = {
  navigation: NavigationProp<RootStackParamList>;
};

export function ToDoScreen(props: ToDoProps): React.JSX.Element {
  const [tasks, setTasks] = useState<any>([]);

  useEffect(() => {
    var taskList: any[] = [];
    async function getReadingSchedule() {
      const q = query(collection(getFirestore(), 'readingSchedules'));
      const querySnapshot = await getDocs(q);

      await querySnapshot.forEach(async recvDoc => {
        var data = recvDoc.data();
        var bookID = data['bookId'];
        var chapterIDs = data['chapterIds'];
        var dueDates = data['dueDates'];

        var docRef = doc(getFirestore(), 'books', bookID);
        var docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          var bookData = docSnap.data();

          for (var i = 0; i < chapterIDs.length; i++) {
            var chapter = chapterIDs[i];
            var dueDate = dueDates[i];

            docRef = doc(getFirestore(), `books/${bookID}/Chapters`, chapter);
            docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const read = {
                id: docSnap.id,
                title: bookData['title'],
                author: bookData['author'],
                description: bookData['description'],
                picture_link: bookData['picture_link'],
                pages: bookData['pages'],
                chapter: docSnap.data(),
                taskType: 'read',
                completed: false,
                dueDate: dueDate,
                task: 'Read ' + docSnap.data()['title'],
              };
              const quiz = {
                id: docSnap.id,
                title: bookData['title'],
                author: bookData['author'],
                description: bookData['description'],
                picture_link: bookData['picture_link'],
                pages: bookData['pages'],
                chapter: docSnap.data(),
                taskType: 'quiz',
                completed: false,
                dueDate: dueDate,
                task: docSnap.data()['title'] + ' Quiz',
              };
              const survey = {
                id: docSnap.id,
                title: bookData['title'],
                author: bookData['author'],
                description: bookData['description'],
                picture_link: bookData['picture_link'],
                pages: bookData['pages'],
                chapter: docSnap.data(),
                taskType: 'survey',
                completed: false,
                dueDate: dueDate,
                task: docSnap.data()['title'] + ' Survey',
              };
              taskList.push(read);
              taskList.push(quiz);
              taskList.push(survey);
              setTasks(taskList.slice(0));
            }
          }
        }
      });
    }
    getReadingSchedule();
  }, []);

  const sections = tasks.reduce((acc, task) => {
    const dueDate = moment(task.dueDate, 'M/D').format('MMMM D');
    const category = task.completed ? 'Completed' : dueDate;

    if (!acc[category]) {
      acc[category] = {title: category, data: []};
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
      showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>To Do</Text>
      <SectionList
        sections={sortedSections}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ScheduleItem item={item} navigation={props.navigation} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  view: {
    backgroundColor: 'white',
  },
  scrollView: {
    margin: '5%',
    height: '100%',
  },
  header: {
    fontSize: 30,
    marginBottom: '4%',
    color: '#726E6E',
    textAlign: 'center',
  },
});
