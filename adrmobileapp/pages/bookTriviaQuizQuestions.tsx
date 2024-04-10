import React, {useState} from 'react';
import {View, Text, Pressable, SafeAreaView, StyleSheet} from 'react-native';

import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import questions from '../data/questions';

type routeProp = RouteProp<RootStackParamList, 'BookQuizQuestions'>;
type navProp = StackNavigationProp<RootStackParamList, 'BookQuizQuestions'>;

type BookTriviaQuizQuestionsProps = {
  route: routeProp;
  navigation: navProp;
};

const styles = StyleSheet.create({
  bkg: {
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  quizBkg: {
    height: 550,
    backgroundColor: '#0071BA',
    marginTop: '20%',
    width: '90%',
    borderRadius: 20,
    padding: '5%',
    position: 'relative',
  },
  questionNum: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: '5%',
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  btn: {
    marginTop: '10%',
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
    paddingVertical: 15,
    width: 350,
  },
  questionCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    bottom: 20,
    marginLeft: '40%',
  },
  arrow: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
});

export function BookTriviaQuizQuestions(
  props: BookTriviaQuizQuestionsProps,
): React.JSX.Element {
  const [questionNum, setQuestionNum] = useState(props.route.params.question);
  const maxQuestions = Object.keys(questions).length;

  return (
    <SafeAreaView style={styles.bkg}>
      <Pressable
        style={styles.arrow}
        onPress={() => {
          questionNum === maxQuestions ? null : setQuestionNum(questionNum + 1);
          props.navigation.navigate('BookQuiz', {
            book: props.route.params.book,
            question: questionNum,
            prevScreen: 'BookQuizQuestions',
          });
        }}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>
      <View style={styles.quizBkg}>
        <Text style={styles.questionNum}>Q{questionNum + 1}</Text>
        <Text style={styles.question}>
          {questions[(questionNum + 1) as keyof typeof questions]}
        </Text>
        <Text style={styles.questionCount}>
          {questionNum + 1}/{maxQuestions}
        </Text>
      </View>

      <View>
        <Pressable
          style={[
            styles.btn,
            {
              backgroundColor:
                questionNum + 1 === maxQuestions ? '#0071BA' : '#C4DEEF',
            },
          ]}
          onPress={() => {
            if (questionNum + 1 === maxQuestions) {
              console.log('Submit');
              props.navigation.navigate('BookQuiz', {
                book: props.route.params.book,
                question: maxQuestions,
                prevScreen: 'BookQuizQuestions',
              });
            } else {
              setQuestionNum(questionNum + 1);
            }
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 23,
              color: questionNum + 1 === maxQuestions ? '#FFFFFF' : '#0071BA',
              fontWeight: 'bold',
            }}>
            {questionNum + 1 === maxQuestions ? 'Submit' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default BookTriviaQuizQuestions;
