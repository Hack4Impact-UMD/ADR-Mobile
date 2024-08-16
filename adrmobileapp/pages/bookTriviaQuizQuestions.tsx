import React, {useState} from 'react';
import {View, Text, Pressable, SafeAreaView, StyleSheet} from 'react-native';

import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import FontLoader from '../components/FontLoader';
import AntDesign from '@expo/vector-icons/AntDesign';
import { addDoc, collection, doc, getFirestore } from 'firebase/firestore';
import { SurveyType } from '../types/types';
import { useAuth } from '../components/AuthProvider';



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
  answerBkg: {
    backgroundColor: '#0071BA',
    height: 550,
    marginTop: 30,
    width: '90%',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding:'4%'
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
  questionPressed: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
  },
  btn: {
    marginTop: '10%',
    borderRadius: 15,
    backgroundColor: '#0071BA',
    paddingVertical: 15,
    width: 320,
  },
  btnPressed: {
    backgroundColor: '#0056A0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  questionCount: {
    fontFamily: 'KarlaBold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    position: 'absolute',
    bottom: 20,
    marginLeft: '40%',
  },
  questionCountAlt: {
    fontFamily: 'KarlaBold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0071BA',
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
    width: 310,
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
  questionMarkStyle: {
    position: 'absolute',
    left: 290,
    top: 20,
    zIndex: 1,
    color: 'black',
  }
});

export function BookTriviaQuizQuestions(
  props: BookTriviaQuizQuestionsProps,
): React.JSX.Element {
  const [questionNum, setQuestionNum] = useState(props.route.params.question);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const [endAnswerPressed, setEndAnswerPressed] = useState<number | null>(null);

  const questionSet = props.route.params.questionSet;
  const answerSet = props.route.params.answerSet;
  const maxQuestions = Object.keys(questionSet).length;
  const context = useAuth();
  const userId = context.user?.uid;

  const handleNextQuestion = () => {
    setBtnPressed(true);
    setTimeout(() => setBtnPressed(false), 300);
    if (questionNum < maxQuestions) {
      setQuestionNum(prev => prev + 1);
      setShowAnswer(false);
    } else {
      console.log('Submit');
      saveToFirebase(responses[questionNum]);
      props.navigation.navigate('BookQuiz', {
        book: props.route.params.book,
        question: maxQuestions,
        prevScreen: 'BookQuizQuestions',
        chapter: props.route.params.chapter,
        taskId: props.route.params.taskId,
      });
    }
  };
  const firestore = getFirestore();
  const db = doc(collection(firestore, 'surveys'));

  const saveToFirebase = async (readingTime: string) => {
    try {
      await addDoc(collection(firestore, 'surveys'), {
        bookTitle: props.route.params.book.title,
        chapter: props.route.params.chapter.chapterNum,
        taskId: props.route.params.taskId,
        readingTime,
        timestamp: new Date(),
        surveyType: SurveyType.ChapterQuiz,
        parentId: userId,
      });
      console.log('Document written successfully');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleBack = () => {
    if (questionNum > 0) {
      setQuestionNum(prev => prev - 1);
      setShowAnswer(false);
    } else {
      props.navigation.goBack();
    }
  };
  const toggleShowAnswer = () => {
    setShowAnswer(prevShowAnswer => !prevShowAnswer);
  };

  const handleAnswerSelection = (questionNum: number, answer: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionNum]: answer,
    }));
  };

  const handleEndAnswerPress = (index: number, answer: string) => {
    setEndAnswerPressed(index); // Set the pressed button index
    handleAnswerSelection(questionNum, answer);
    setTimeout(() => setEndAnswerPressed(null), 300); // Reset after delay
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
        <View style={showAnswer ? styles.answerBkg : styles.quizBkg}>
        {showAnswer ? (
                <AntDesign name="questioncircle" size={24} style={styles.questionMarkStyle} onPress={toggleShowAnswer} />
              ) : (
                <AntDesign name="questioncircleo" size={24} style={styles.questionMarkStyle} onPress={toggleShowAnswer}/>
          )}
          <Text style={styles.questionNum}>
            {questionNum + 1 <= maxQuestions ? `Q${questionNum + 1}` : null}
          </Text>
          <Text style={styles.question}>
            {showAnswer && questionNum + 1 <= maxQuestions
              ? answerSet[questionNum] // Show the answer when showAnswer is true
              : questionNum + 1 <= maxQuestions
              ? questionSet[questionNum] // Show the question when showAnswer is false
              : 'How long did you take reading together tonight?'}
          </Text>
          
          {questionNum + 1 == maxQuestions + 1 && [
            <Pressable
              style={styles.endAnswer}
              onPress={() => handleAnswerSelection(questionNum, 'Up to 10 min')}>
              <Text style={styles.endAnswerChoice}> Up to 10 min </Text>
            </Pressable>,
            <Pressable
              style={styles.endAnswer}
              onPress={() => handleAnswerSelection(questionNum, 'Up to 20 min')}>
              <Text style={styles.endAnswerChoice}> Up to 20 min </Text>
            </Pressable>,
            <Pressable
              style={styles.endAnswer}
              onPress={() => handleAnswerSelection(questionNum, 'Up to 30 min')}>
              <Text style={styles.endAnswerChoice}> Up to 30 min </Text>
            </Pressable>,
            <Pressable
              style={styles.endAnswer}
              onPress={() => handleAnswerSelection(questionNum, 'More than 30 min')}>
              <Text style={styles.endAnswerChoice}> More than 30 min </Text>
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
            style={[styles.btn, btnPressed && styles.btnPressed]}
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
