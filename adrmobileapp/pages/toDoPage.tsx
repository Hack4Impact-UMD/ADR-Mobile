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
    <SafeAreaView style={styles.view}>
      <ScrollView
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
            />
          )}
        />
      </ScrollView>
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
