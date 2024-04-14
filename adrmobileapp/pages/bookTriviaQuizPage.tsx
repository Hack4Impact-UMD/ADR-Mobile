import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import {RootStackParamList} from '../App';

import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';
import questions from '../data/questions';
import TextHighlight from 'react-native-text-highlighter';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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
    backgroundColor: '#0071BA',
    marginBottom: '5%',
  },
  bookTitle: {
    fontFamily: 'CrimsonPro',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: '20%',
    marginLeft: '4%',
    marginRight: '5%',
    color: '#FFFFFF',
  },
  subText: {
    fontFamily: 'Karla-Bold',
    fontSize: 25,
    color: 'black',
    lineHeight: 50,
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
    backgroundColor: '#C4DEEF',
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

  const maxQuestions = Object.keys(questions).length;

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

  const [fontsLoaded, fontError] = useFonts({
    CrimsonPro: require('../assets/fonts/CrimsonPro-VariableFont_wght.ttf'),
    Karla: require('../assets/fonts/Karla-VariableFont_wght.ttf'),
    'Karla-Bold': require('../assets/fonts/Karla-Bold.ttf'),
    'Karla-Medium': require('../assets/fonts/Karla-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <SafeAreaView style={styles.bkg} onLayout={onLayoutRootView}>
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
        <Ionicons name="arrow-back" size={30} color="white" />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.subText}>Questions Answered</Text>
        <TextHighlight
          textStyle={[styles.subText, {fontFamily: 'Karla-Medium'}]}
          textToHighlight={` ${
            question ? question : '0'
          }  out of  ${maxQuestions} `}
          searchWords={[` ${question} `, ` ${maxQuestions} `, ' 0 ']}
          highlightTextStyle={{
            backgroundColor: '#C4DEEF',
            fontFamily: 'Karla-Medium',
          }}
        />
      </View>

      <View style={styles.progress}>
        <Text
          style={[
            styles.subText,
            {color: progressPercentage === 1 ? '#0071BA' : '#000000'},
          ]}>
          Progress{' '}
          {progressPercentage
            ? `${(progressPercentage * 100).toFixed(0)}%`
            : '0%'}
        </Text>
        <Progress.Bar
          progress={progressPercentage}
          borderColor={'#0071BA'}
          borderRadius={25}
          borderWidth={2}
          height={50}
          width={395}
          color={'#0071BA'}
          unfilledColor={'#FFFFFF'}
        />
      </View>

      <View style={styles.buttonView}>
        <Pressable
          style={[
            styles.btn,
            {backgroundColor: progressPercentage === 1 ? '#0071BA' : '#C4DEEF'},
          ]}
          onPress={() => {
            if (progressPercentage < 1) {
              if (question != undefined) {
                props.navigation.navigate('BookQuizQuestions', {
                  book: props.route.params.book,
                  question: question,
                });
              } else {
                props.navigation.navigate('BookQuizQuestions', {
                  book: props.route.params.book,
                  question: 1,
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
              color: progressPercentage === 1 ? '#FFFFFF' : '#0071BA',
              fontFamily: 'Karla-Bold',
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
              color: '#0071BA',
              fontFamily: 'Karla-Bold',
            }}>
            Clear Storage
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default BookTriviaQuizPage;
