import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Moment from 'moment';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {Book} from '../customTypes';

type AssignmentProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const styles = StyleSheet.create({
  book: {
    height: 300,
    backgroundColor: 'white',
    margin: '5%',
  },
});

export function AssignmentPage(props: AssignmentProps): React.JSX.Element {
  Moment.locale('en');
  const today = new Date();

  const books: Book[] = [
    {
      title: 'Ready Player One',
      author: 'Ernest Cline',
      page_number: 368,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Dune',
      author: 'Author 2',
      page_number: 200,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Alice in Wonderland',
      author: 'Author 3',
      page_number: 300,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Romeo and Juliet',
      author: 'William Shakespeare',
      page_number: 400,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Welcome Back!</Text>
        <Text>{Moment(today).format('MMMM Do, YYYY')}</Text>
        {books.map(book => {
          return (
            <TouchableOpacity
              style={styles.book}
              onPress={() => {
                props.navigation.navigate('BookMain');
              }}>
              <Text>{book.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AssignmentPage;
