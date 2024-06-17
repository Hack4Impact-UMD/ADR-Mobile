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

export function ToDoScreen() {
  const tasks = [
    {
      id: '1',
      bookTitle: 'Ready Player One',
      task: 'Read Chapter 1',
      dueDate: '4/8',
      taskType: 'read',
      completed: false,
    },
    {
      id: '2',
      bookTitle: 'Ready Player One',
      task: 'Chapter 1 Quiz',
      dueDate: '4/10',
      taskType: 'quiz',
      completed: false,
    },
    {
      id: '3',
      bookTitle: 'Ready Player One',
      task: 'Chapter 1 Quiz',
      dueDate: '4/11',
      taskType: 'survey',
      completed: false,
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

  return (
    <SafeAreaView
      style={styles.scrollView}
    >
      <Image style={styles.blob} source={require('../assets/images/todoBlob.png')} />
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
