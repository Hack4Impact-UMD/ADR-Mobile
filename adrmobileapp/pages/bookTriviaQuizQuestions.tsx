import React, {useState} from 'react';
import {View, Text, Pressable, SafeAreaView, StyleSheet} from 'react-native';

import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import FontLoader from '../components/FontLoader';

type routeProp = RouteProp<RootStackParamList, 'BookQuizQuestions'>;
type navProp = StackNavigationProp<RootStackParamList, 'BookQuizQuestions'>;

type BookTriviaQuizQuestionsProps = {
  route: routeProp;
  navigation: navProp;
};

const styles = StyleSheet.create({
  bkg: {
    backgroundColor: '#ABDAF9',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  quizBkg: {
    height: 550,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    width: '90%',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding:'4%'
  },
  questionNum: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '5%',
  },
  question: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
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
    borderColor: '#0071BA',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    width: 340,
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontFamily: 'Chillax',
    fontSize: 25,
    color: '#000000',
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    marginTop: '5%',
    fontFamily: 'MontserratSemiBold',
  },
  chapterTitle: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
    color: '#000000',
    marginTop: '3%',
  },
  endAnswerChoice: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000000',
    fontFamily: 'MontserratSemiBold',
  },
});

export function BookTriviaQuizQuestions(
  props: BookTriviaQuizQuestionsProps,
): React.JSX.Element {
  const [questionNum, setQuestionNum] = useState(props.route.params.question);

  const questionSet = props.route.params.questionSet;
  const maxQuestions = Object.keys(questionSet).length;

  const handleNextQuestion = () => {
    if (questionNum < maxQuestions) {
      setQuestionNum(prev => prev + 1);
    } else {
      console.log('Submit');
      props.navigation.navigate('BookQuiz', {
        book: props.route.params.book,
        question: maxQuestions,
        prevScreen: 'BookQuizQuestions',
        chapter: props.route.params.chapter,
        taskId: props.route.params.taskId,
      });
    }
  };

  const handleBack = () => {
    if (questionNum > 0) {
      setQuestionNum(prev => prev - 1);
    } else {
      props.navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.bkg}>
      <FontLoader>
        <View style={styles.heading}>
          <Pressable style={styles.arrow} onPress={handleBack}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </Pressable>
          <Text style={styles.title}>{props.route.params.book.title}</Text>
        </View>
        <Text style={styles.chapterTitle}>
          Ch {props.route.params.chapter.chapterNum} Questions
        </Text>
        <View style={styles.quizBkg}>
          <Text style={styles.questionNum}>
            {questionNum + 1 <= maxQuestions ? `Q${questionNum + 1}` : null}
          </Text>
          <Text style={styles.question}>
            {questionNum + 1 <= maxQuestions
              ? questionSet[questionNum as keyof typeof questionSet]
              : 'How long did you take reading together tonight?'}
          </Text>
          {questionNum + 1 === maxQuestions + 1 && (
            <>
              <Pressable style={styles.endAnswer}>
                <Text style={styles.endAnswerChoice}> Up to 10 min </Text>
              </Pressable>
              <Pressable style={styles.endAnswer}>
                <Text style={styles.endAnswerChoice}> Up to 20 min </Text>
              </Pressable>
              <Pressable style={styles.endAnswer}>
                <Text style={styles.endAnswerChoice}> Up to 30 min </Text>
              </Pressable>
              <Pressable style={styles.endAnswer}>
                <Text style={styles.endAnswerChoice}> More than 30 min </Text>
              </Pressable>
            </>
          )}
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
                backgroundColor: '#0071BA',
              },
            ]}
            onPress={handleNextQuestion}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 23,
                color: '#FFFFFF',
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
