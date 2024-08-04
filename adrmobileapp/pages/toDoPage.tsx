import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  SectionList,
  Image,
} from 'react-native';
import ScheduleItem from '../components/ScheduleItem';
import moment from 'moment';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../components/AuthProvider';

type routeProp = RouteProp<RootStackParamList, 'ToDo'>;
type navProp = StackNavigationProp<RootStackParamList, 'ToDo'>;

type ToDoPageProps = {
  route: routeProp;
  navigation: navProp;
};
export function ToDoScreen(props: ToDoPageProps): React.JSX.Element {
  const navigation = useNavigation();

  const tasks = [
    {
      id: '1',
      bookTitle: 'Ready Player One',
      task: 'Read Chapter 1',
      dueDate: '4/8',
      taskType: 'read',
      completed: false,
      navigateTo: 'BookMain',
      book: {
        id: 1,
        title: 'Ready Player One',
        author: 'Ernest Cline',
        description: 'A world at stake. A quest for the ultimate prize. Are you ready? In the year 2045, reality is an ugly place. The only time Wade Watts really feels alive is when he’s jacked into the OASIS, a vast virtual world where most of humanity spends their days. When the eccentric creator of the OASIS dies, he leaves behind a series of fiendish puzzles, based on his obsession with the pop culture of decades past. Whoever is first to solve them will inherit his vast fortune—and control of the OASIS itself. Then Wade cracks the first clue. Suddenly he’s beset by rivals who’ll kill to take this prize. The race is on—and the only way to survive is to win.',
        picture_link: 'https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_.jpg',
        pages: '374',
        chapter: '1',
        chapterNumber: '1',
      }
    },
    {
      id: '2',
      bookTitle: 'Ready Player One',
      task: 'Chapter 1 Quiz',
      dueDate: '4/10',
      taskType: 'quiz',
      completed: false,
      navigateTo: 'BookQuiz',
      book: {
        id: 1,
        title: 'Ready Player One',
        author: 'Ernest Cline',
        description: 'Cool book about VR and stuff',
        picture_link: 'https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_.jpg',
        pages: '374',
        chapter: '1',
        chapterNumber: '1',
      }
    },
    {
      id: '3',
      bookTitle: 'Ready Player One',
      task: 'Pre-Survey',
      dueDate: '7/12',
      taskType: 'survey',
      completed: false,
      navigateTo: 'PreSurvey',
    },
    {
      id: '4',
      bookTitle: 'Ready Player One',
      task: 'Post-Survey',
      dueDate: '5/1',
      taskType: 'survey',
      completed: false,
      navigateTo: 'PostSurvey',
    },
    // Add more tasks
  ];
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


  const context = useAuth();
  const userId = context.user?.uid;
  console.log("User Id  for ToDoPage: ", userId); 
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
                // Handle optional navigation with error checking
                const targetScreen = item.navigateTo;
                if (targetScreen == 'BookMain' || targetScreen == 'BookQuiz') {
                  navigation.navigate(targetScreen, {book: item.book, chapter: item.book.chapter});
                } else if(targetScreen == 'PreSurvey' || targetScreen == 'PostSurvey') {
                  navigation.navigate(targetScreen);
                } else {
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
