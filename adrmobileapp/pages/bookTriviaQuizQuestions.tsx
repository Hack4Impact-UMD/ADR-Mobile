import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, StyleSheet } from 'react-native';

import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { max } from 'moment';

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
    backgroundColor: '#D9D9D9',
    marginTop: '20%',
    width:'90%',
    borderRadius: 20,
    padding: '5%',
    position: 'relative',
  },
  questionNum: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#726E6E',
    marginBottom: '5%',
  },
  question:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#726E6E',
  },
  btn:{
    marginTop: '10%',
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
    paddingVertical: 15,
    width: 350,
  },
  questionCount:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#726E6E',
    textAlign:'center',
    position: 'absolute',
    bottom: 20,
    marginLeft: '40%',
  },
});

export function BookTriviaQuizQuestions(
  props: BookTriviaQuizQuestionsProps,
): React.JSX.Element {  
  
  const questions = {
    1: 'What is the capital of France?',
    2: 'Who wrote the novel "Pride and Prejudice"?',
    3: 'What is the largest planet in our solar system?',
  };
  
  const [questionNum, setQuestionNum] = useState(1);
  const maxQuestions = Object.keys(questions).length;

  return (
    <SafeAreaView style={styles.bkg}>
      <View style={styles.quizBkg}>
        <Text style={styles.questionNum}>Q{questionNum}</Text>
        <Text style={styles.question}>{questions[questionNum as keyof typeof questions]}</Text>
        <Text style={styles.questionCount}>{questionNum}/{maxQuestions}</Text>
      </View>
      
      <View>
        <Pressable style={[styles.btn, {backgroundColor: questionNum === maxQuestions ? '#33363F' : '#D9D9D9'}]}
          onPress={() => {
            questionNum === maxQuestions ? null : setQuestionNum(questionNum + 1)
          }}
        >
          <Text style={{textAlign:'center', fontSize: 23, color: questionNum === maxQuestions ? '#D9D9D9' : '#726E6E', fontWeight:'bold'}}>
            {questionNum === maxQuestions ? 'Submit' : 'Next'}
          </Text>        
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default BookTriviaQuizQuestions;