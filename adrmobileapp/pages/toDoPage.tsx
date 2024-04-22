import React from 'react';
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
import {NavigationProp} from '@react-navigation/native';
import {BookInfoPage} from '../pages/bookInfoPage';

export function ToDoScreen({ navigation }: { navigation: NavigationProp }) {
  const tasks = [
    {
      id: '1',
      bookTitle: 'Ready Player One',
      task: 'Read Chapter 1',
      dueDate: '4/23',
      taskType: 'read',
      completed: false,
    },
    {
      id: '2',
      bookTitle: 'Ready Player One',
      task: 'Chapter 1 Quiz',
      dueDate: '4/24',
      taskType: 'quiz',
      completed: false,
    },
    {
      id: '3',
      bookTitle: 'Ready Player One',
      task: 'Chapter 1 Quiz',
      dueDate: '4/25',
      taskType: 'survey',
      completed: false,
    },
    // Add more tasks
  ];

  const handleItemClick = () => {
    navigation.navigate('BookInfoPage'); // Navigate to BookInfoPage
  };
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
            <ScheduleItem
              bookTitle={item.bookTitle}
              task={item.task}
              dueDate={item.dueDate}
              completed={item.completed}
              taskType={item.taskType}
              onItemClick={handleItemClick} // Pass handleItemClick as prop
            />
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
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',

    
  },
});

