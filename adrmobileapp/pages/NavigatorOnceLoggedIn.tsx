/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, StyleSheet, FlatList, SectionList} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, BottomNavigation, List, Checkbox} from 'react-native-paper';

import {AssignmentPage} from './assignmentPage';

import {Feather} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import ScheduleItem from '../components/ScheduleItem';
import moment from 'moment';

const Tab = createBottomTabNavigator();

export default function HomePage() {
  const iconSize = 30;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={AssignmentPage}
        options={{
          tabBarIcon: () => {
            return <Feather name="home" size={iconSize} color="#222222" />;
          },
        }}
      />
      <Tab.Screen
        name="Chapters"
        component={ChaptersScreen}
        options={{
          tabBarIcon: () => {
            return <AntDesign name="book" size={iconSize} color="#222222" />;
          },
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: () => {
            return (
              <AntDesign name="calendar" size={iconSize} color="#222222" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          tabBarIcon: ({color, size}) => {
            return (
              <Ionicons
                name="bookmarks-outline"
                size={iconSize}
                color="#222222"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

function ChaptersScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Chapters</Text>
    </View>
  );
}

function BookmarksScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Bookmarks</Text>
    </View>
  );
}
function ScheduleScreen() {
  const tasks = [
    {
      id: '1',
      bookTitle: 'Ready Player One',
      task: 'Read Chapter 1',
      dueDate: '3/9',
      completed: false,
    },
    {
      id: '2',
      bookTitle: 'Ready Player One',
      task: 'Chapter 1 Quiz',
      dueDate: '3/10',
      completed: true,
    },
    {
      id: '3',
      bookTitle: 'Ready Player One',
      task: 'Chapter 1 Quiz',
      dueDate: '3/11',
      completed: false,
    }
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
    .sort((a, b) => moment(a, 'MMMM D').diff(moment(b, 'MMMM D')))
    .map(key => ({
      title: key,
      data: sections[key].data,
    }));
  return (
    <View style={styles.container}>
      <SectionList
        sections={sortedSections}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ScheduleItem
            bookTitle={item.bookTitle}
            task={item.task}
            dueDate={item.dueDate}
            completed={item.completed}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
});
