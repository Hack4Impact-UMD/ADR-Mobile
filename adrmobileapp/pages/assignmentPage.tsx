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
  view: {
    backgroundColor: 'white',
  },
  scrollView: {
    margin: '5%',
  },
  welcomeBack: {
    fontFamily: 'Inter',
    fontSize: 40,
    marginBottom: '4%',
    color: '#726E6E',
  },
  date: {
    fontFamily: 'Inter',
    fontSize: 20,
    marginBottom: '4%',
    color: 'black',
    fontWeight: 'bold',
  },

  book: {
    height: 300,
    width: '70%',
    backgroundColor: '#D9D9D9',
    marginBottom: '5%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 50,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookTitle: {
    color: '#726E6E',
    fontFamily: 'Inter',
    fontSize: 25,
    padding: '5%',
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
      isbn: 'none',
    },
    {
      title: 'Dune',
      author: 'Author 2',
      page_number: 200,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isbn: 'none',
    },
    {
      title: 'Alice in Wonderland',
      author: 'Author 3',
      page_number: 300,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isbn: 'none',
    },
    {
      title: 'Romeo and Juliet',
      author: 'William Shakespeare',
      page_number: 400,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isbn: 'none',
    },
  ];

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeBack}>Welcome Back!</Text>
        <Text style={styles.date}>{Moment(today).format('MMMM Do, YYYY')}</Text>
        {books.map(book => {
          return (
            <TouchableOpacity
              style={[styles.book, styles.shadowProp]}
              onPress={() => {
                props.navigation.navigate('BookMain', {
                  book: book,
                });
              }}>
              <Text style={styles.bookTitle}>{book.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AssignmentPage;
