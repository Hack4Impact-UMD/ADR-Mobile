/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, StyleSheet, FlatList, SectionList} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, BottomNavigation, List, Checkbox} from 'react-native-paper';

import {AssignmentPage} from './assignmentPage';
import{Landing} from './landing';
import {DonatePage} from './donatePage';

import {Feather} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import ScheduleItem from '../components/ScheduleItem';
import moment from 'moment';
import {ToDoScreen} from './toDoPage';
import {FontAwesome} from '@expo/vector-icons';

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
        component={Landing}
        options={{
          tabBarIcon: () => {
            return <Feather name="home" size={iconSize} color="#222222" />;
          },
        }}
      />
      <Tab.Screen
        name="ToDo"
        component={ToDoScreen}
        options={{
          tabBarIcon: () => {
            return (
              <Feather name="clipboard" size={iconSize} color="#222222" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Donate"
        component={DonatePage}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="dollar" size={iconSize} color="#222222" />
          ),
        }}
      />
    </Tab.Navigator>
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
