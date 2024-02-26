import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type BookTriviaQuizPageProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const styles = StyleSheet.create({
  bookCover: {
    height: 200,
    backgroundColor: 'white',
    marginBottom: '5%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    width: '44%',
    height: 100,
    backgroundColor: 'white',
    margin: '3%',
  },
});

export function BookTriviaQuizPage(
  props: BookTriviaQuizPageProps,
): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.bookCover}>
        <Text>Ready Player One Trivia Quiz</Text>
        <Button title="Begin Now >"></Button>
      </View>
      <Text>Questions Answered</Text>
      <Text>0 out of 10</Text>
      <Text>Progress</Text>
      <Text>0%</Text>
    </SafeAreaView>
  );
}

export default BookTriviaQuizPage;
