import React, {useCallback, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, StyleSheet} from 'react-native';

import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import questions from '../data/questions';
import FontLoader from '../components/FontLoader';

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
    fontFamily: 'KarlaBold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: '5%',
  },
  question: {
    fontFamily: 'KarlaBold',
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
    fontFamily: 'KarlaBold',
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
  endAnswer: {
    marginTop: '10%',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    width: 350,
  },
});

export function BookTriviaQuizQuestions(
  props: BookTriviaQuizQuestionsProps,
): React.JSX.Element {
  const [questionNum, setQuestionNum] = useState(props.route.params.question);

  const questionSet = props.route.params.questionSet;
  const maxQuestions = Object.keys(questionSet).length;

  return (
    <SafeAreaView style={styles.bkg}>
      <FontLoader>
        <Pressable
          style={styles.arrow}
          onPress={() => {
            questionNum === maxQuestions
              ? setQuestionNum(questionNum - 1)
              : setQuestionNum(questionNum + 1);
            props.navigation.navigate('BookQuiz', {
              book: props.route.params.book,
              question: questionNum,
              prevScreen: 'BookQuizQuestions',
            });
          }}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>
        <View style={styles.quizBkg}>
          <Text style={styles.questionNum}>
            {questionNum + 1 <= maxQuestions ? `Q${questionNum + 1}` : null}
          </Text>
          <Text style={styles.question}>
            {questionNum + 1 <= maxQuestions
              ? questions[(questionNum + 1) as keyof typeof questions]
              : 'How long did it take to finish this quiz?'}
          </Text>
          {questionNum + 1 == maxQuestions + 1 && [
            <Pressable style={styles.endAnswer}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 23,
                  color: '#0071BA',
                  fontFamily: 'KarlaBold',
                }}>
                0-30 min
              </Text>
            </Pressable>,
            <Pressable style={styles.endAnswer}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 23,
                  color: '#0071BA',
                  fontFamily: 'KarlaBold',
                }}>
                31-60 min
              </Text>
            </Pressable>,
            <Pressable style={styles.endAnswer}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 23,
                  color: '#0071BA',
                  fontFamily: 'KarlaBold',
                }}>
                61-90 min
              </Text>
            </Pressable>,
            <Pressable style={styles.endAnswer}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 23,
                  color: '#0071BA',
                  fontFamily: 'KarlaBold',
                }}>
                91+ min
              </Text>
            </Pressable>,
          ]}
          <Text style={styles.questionCount}>
            {questionNum + 1 <= maxQuestions
              ? `${questionNum + 1}/${maxQuestions}`
              : null}
          </Text>
        </View>

        <View>
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor:
                  questionNum + 1 === maxQuestions + 1 ? '#0071BA' : '#C4DEEF',
              },
            ]}
            onPress={() => {
              if (questionNum + 1 === maxQuestions + 1) {
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
                color:
                  questionNum + 1 === maxQuestions + 1 ? '#FFFFFF' : '#0071BA',
                fontWeight: 'bold',
              }}>
              {questionNum + 1 === maxQuestions + 1 ? 'Submit' : 'Next'}
            </Text>
          </Pressable>
        </View>
      </FontLoader>
    </SafeAreaView>
  );
}

export default BookTriviaQuizQuestions;
