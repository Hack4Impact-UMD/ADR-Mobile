import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import {RootStackParamList} from '../App';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';
import questions from '../data/questions';
import TextHighlight from 'react-native-text-highlighter';

type routeProp = RouteProp<RootStackParamList, 'BookQuiz'>;
type navProp = StackNavigationProp<RootStackParamList, 'BookQuiz'>;

type BookTriviaQuizPageProps = {
  route: routeProp;
  navigation: navProp;
};

const styles = StyleSheet.create({
  bkg: {
    backgroundColor: 'white',
    height: '100%',
  },
  bookCover: {
    height: 250,
    backgroundColor: '#D9D9D9',
    marginBottom: '5%',
  },
  bookTitle: {
    fontSize: 40,
    marginTop: '20%',
    marginLeft: '4%',
    marginRight: '5%',
    color: '#726E6E',
  },
  subText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 45,
  },
  content: {
    marginLeft: '4%',
  },
  progress: {
    marginLeft: '4%',
    marginTop: '15%',
  },
  btn: {
    borderRadius: 33,
    backgroundColor: '#D9D9D9',
    paddingVertical: 25,
    width: 180,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end', // Center vertically
    alignItems: 'center', // Center horizontally
    marginBottom: '8%',
  },
});

export function BookTriviaQuizPage(
  props: BookTriviaQuizPageProps,
): React.JSX.Element {
  let progressPercentage = 0;
  if (props.route.params.maxQuestions > 0) {
    progressPercentage =
      props.route.params.question / props.route.params.maxQuestions;
  }

  if (
    isNaN(progressPercentage) ||
    progressPercentage < 0 ||
    progressPercentage > 1
  ) {
    progressPercentage = 0; // Set a default value or handle the case appropriately
  }

  const maxQuestions = Object.keys(questions).length;

  return (
    <SafeAreaView style={styles.bkg}>
      <View style={styles.bookCover}>
        <Text style={styles.bookTitle}>
          {props.route.params.book.title} Trivia Quiz
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subText}>Questions Answered</Text>
        <TextHighlight
          textStyle={styles.subText}
          textToHighlight={` ${
            props.route.params.question ? props.route.params.question : '0'
          }  out of  ${maxQuestions} `}
          searchWords={[
            ` ${props.route.params.question} `,
            ` ${maxQuestions} `,
            ' 0 ',
          ]}
          highlightTextStyle={{backgroundColor: '#D9D9D9'}}
        />
      </View>

      <View style={styles.progress}>
        <Text style={styles.subText}>
          Progress{' '}
          {progressPercentage
            ? `${(progressPercentage * 100).toFixed(0)}%`
            : '0%'}
        </Text>
        <Progress.Bar
          progress={progressPercentage}
          borderColor={'white'}
          borderRadius={22}
          height={50}
          width={395}
          color={'#726E6E'}
          unfilledColor={'#D9D9D9'}
        />
      </View>

      <View style={styles.buttonView}>
        <Pressable
          style={[
            styles.btn,
            {backgroundColor: progressPercentage === 1 ? '#33363F' : '#D9D9D9'},
          ]}
          onPress={() => {
            if (props.route.params.question != undefined) {
              props.navigation.navigate('BookQuizQuestions', {
                book: props.route.params.book,
                question: props.route.params.question,
              });
            } else {
              props.navigation.navigate('BookQuizQuestions', {
                book: props.route.params.book,
                question: 1,
              });
            }
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 23,
              color: progressPercentage === 1 ? '#D9D9D9' : '#726E6E',
              fontWeight: 'bold',
            }}>
            {progressPercentage >= 1
              ? 'Finish'
              : progressPercentage > 0
              ? 'Continue'
              : 'Begin Now'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default BookTriviaQuizPage;
