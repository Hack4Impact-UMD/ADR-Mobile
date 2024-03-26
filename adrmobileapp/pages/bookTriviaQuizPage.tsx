import React, { useState } from 'react';
import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import {RootStackParamList} from '../App';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';

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
    marginLeft:'4%',
  },
  progress: {
    marginLeft:'4%',
    marginTop: '15%',
  },
  btn:{
    borderRadius: 33,
    backgroundColor: '#D9D9D9',
    paddingVertical: 25,
    paddingHorizontal: 38,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonView:{
    flex: 1,
    justifyContent: 'flex-end', // Center vertically
    alignItems: 'center', // Center horizontally
    marginBottom:'8%'
  }
});

export function BookTriviaQuizPage(
  props: BookTriviaQuizPageProps,
): React.JSX.Element {
  
  return (
    <SafeAreaView style={styles.bkg}>
      <View style={styles.bookCover}>
        <Text style={styles.bookTitle}>{props.route.params.book.title} Trivia Quiz</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subText}>Questions Answered</Text>
        <TextHighlight
          textStyle={styles.subText}
          textToHighlight=' 0  out of  10 '
          searchWords={[" 0 ", " 10 "]}
          highlightTextStyle={{ backgroundColor: '#D9D9D9' }}
        />
      </View>

      <View style={styles.progress}>
        <Text style={styles.subText}>Progress 0%</Text>
        <Progress.Bar
          progress={0.05}
          borderColor={'white'}
          borderRadius={22}
          height={50}
          width={395}
          color={'#726E6E'}
          unfilledColor={'#D9D9D9'}
        /> 
      </View>
      
      <View style={styles.buttonView}>
        <Pressable style={styles.btn}
        onPress={() => {
          props.navigation.navigate('BookQuizQuestions', {
            book: props.route.params.book,
          });
        }}>
          <Text style={{fontSize: 23, color:'#726E6E', fontWeight:'bold'}}>Begin Now {'>'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default BookTriviaQuizPage;
