import React from 'react';
import {View, StyleSheet} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, BottomNavigation} from 'react-native-paper';

import {AssignmentPage} from './assignmentPage';

import {Feather} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomePage() {
  const iconSize = 30;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
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
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Schedule</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
