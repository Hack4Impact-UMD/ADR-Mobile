import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import {RootStackParamList} from '../App';

import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';
import TextHighlight from 'react-native-text-highlighter';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getDoc,
  getFirestore,
  query,
  collection,
  getDocs,
  doc,
} from 'firebase/firestore';

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

  clearBtn: {
    borderRadius: 33,
    backgroundColor: '#D9D9D9',
    paddingVertical: 15,
    width: 120,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
    marginTop: '5%',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end', // Center vertically
    alignItems: 'center', // Center horizontally
    marginBottom: '8%',
  },
  arrow: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
});

export function BookTriviaQuizPage(
  props: BookTriviaQuizPageProps,
): React.JSX.Element {
  let key = 'question';
  const [question, setQuestion] = useState(0);
  const [questionSet, setQuestionSet] = useState({});

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(key, question.toString());
      console.log('Question successfully saved to storage: ' + question);
    } catch (e) {
      console.log('Failed to save the question to the storage');
    }
  };

  const readData = async () => {
    try {
      if (
        props.route.params.prevScreen == 'BookQuizQuestions' &&
        props.route.params.question != null
      ) {
        await AsyncStorage.setItem(key, props.route.params.question.toString());
        console.log(
          'Question in storage is set to: ' + props.route.params.question,
        );

        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setQuestion(parseInt(value));
          console.log('Question state is set to ' + value);
        }
      } else if (props.route.params.prevScreen == 'BookMain') {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setQuestion(parseInt(value));
          console.log('Question state is set to ' + value);
        } else {
          console.log('Value was null');
        }
      }
    } catch (e) {
      console.log('Failed to read the async storage.');
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setQuestion(0);
      console.log('Storage successfully cleared!');
      props.navigation.navigate('BookMain', {
        book: props.route.params.book,
      });
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('Called screen');
    if (isFocused) {
      readData();
    }
  }, [isFocused]);

  var questions = {};

  useEffect(() => {
    async function getQuestionSet() {
      const questionIDs = props.route.params.book.chapter.questionIds;
      var counter: number = 1;
      questionIDs.map(async id => {
        var docRef = doc(getFirestore(), 'questions', id);
        var docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          questions[counter] = docSnap.data()['text'];
          counter += 1;
          setQuestionSet({...questions});
        }
      });
    }
    getQuestionSet();
  }, []);

  const maxQuestions = Object.keys(questionSet).length;

  let progressPercentage = 0;
  if (maxQuestions > 0) {
    progressPercentage = question / maxQuestions;
  }

  if (
    isNaN(progressPercentage) ||
    progressPercentage < 0 ||
    progressPercentage > 1
  ) {
    progressPercentage = 0;
  }

  return (
    <SafeAreaView style={styles.bkg}>
      <View style={styles.bookCover}>
        <Text style={styles.bookTitle}>
          {props.route.params.book.title} Trivia Quiz
        </Text>
      </View>
      <Pressable
        style={styles.arrow}
        onPress={() => {
          saveData();
          props.navigation.navigate('BookMain', {
            book: props.route.params.book,
          });
        }}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.subText}>Questions Answered</Text>
        <TextHighlight
          textStyle={styles.subText}
          textToHighlight={` ${
            question ? question : '0'
          }  out of  ${maxQuestions} `}
          searchWords={[` ${question} `, ` ${maxQuestions} `, ' 0 ']}
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
            if (progressPercentage < 1) {
              if (question != undefined) {
                props.navigation.navigate('BookQuizQuestions', {
                  book: props.route.params.book,
                  question: question,
                  questionSet: questionSet,
                });
              } else {
                props.navigation.navigate('BookQuizQuestions', {
                  book: props.route.params.book,
                  question: 1,
                  questionSet: questionSet,
                });
              }
            } else {
              // Backend to submit the quiz
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

        <Pressable
          style={[styles.clearBtn]}
          onPress={() => {
            clearStorage();
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: '#726E6E',
              fontWeight: 'bold',
            }}>
            Clear Storage
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default BookTriviaQuizPage;
