import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import SurveyQuestion from './surveyQuestions';
import { initializeFirebase } from '../config/firebase';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import FontLoader from '../components/FontLoader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import {RouteProp} from '@react-navigation/native';
import { useAuth } from '../components/AuthProvider';
import { SurveyType } from '../types/types';

type routeProp = RouteProp<RootStackParamList, 'PostSurvey'>;
type navProp = StackNavigationProp<RootStackParamList, 'PostSurvey'>;

type PostSurveyProps = {
  route: routeProp;
  navigation: navProp;
};
interface SurveyQuestion {
  question: string;
  options: string[];
}

const styles = StyleSheet.create({
  bkg: {
    backgroundColor: '#ABDAF9',
    height: '100%',
  },
  bookTitle: {
    fontFamily: 'Chillax',
    fontSize: 28,
    marginTop: '6%',
    marginLeft: '30%',
    marginRight: '5%',
    color: '#000000',
  },
  content: {
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '5%',
    marginBottom: '4%',
    backgroundColor: '#F5F5F5',
    flex: 1,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
    borderColor: '#0071BA',
    borderWidth: 2,
  },
  btn: {
    borderRadius: 33,
    backgroundColor: '#D9D9D9',
    paddingVertical: 25,
    width: 180,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '8%',
  },
  navButton: {
    borderRadius: 30,
    backgroundColor: '#0071BA',
    paddingVertical: 20,
    width: 300,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
    padding: 5,
    marginLeft: 40,
  },
  navButtonTextPrev: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'KarlaBold',
    marginLeft: 2,
    marginBottom: '-4%',
  },
  navButtonTextNext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'KarlaBold',
    marginLeft: 120,
  },
  navButtonTextSubmit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'KarlaBold',
    marginLeft: 100,
  },
  arrow: {
    position: 'absolute',
    left: 20,
    top: 70,
    zIndex: 1,
    color: 'black',
  },
  questionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingLeft: 20,
    borderRadius: 15,
    marginBottom: 10,
    borderColor: '#0071BA',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    fontFamily: 'Karla',
    fontSize: 20,
  }
});

export function PostSurvey(props: PostSurveyProps): React.JSX.Element {
  const questionOptions: SurveyQuestion[] = [
    {
      question: 'How often does our family read together?',
      options: ['Daily', 'Weekly', 'Monthly', "We don't read together"],
    },
    {
      question: 'How often does my child read for pleasure?',
      options: ['Daily', 'Weekly', 'Monthly', 'Not at all'],
    },
    {
      question: 'My child enjoys reading books for pleasure.',
      options: ['A great deal', 'Some', 'A little', 'Not at all'],
    },
    {
      question: 'How important is it that my child enjoys reading?',
      options: ['A great deal', 'Some', 'A little', 'Not at all'],
    },
    {
      question: 'Do you believe a program that encourages families reading together would affect my child’s reading enjoyment?',
      options: ['Yes', 'No', 'Not sure'],
    },
  ];

  const initialResponses = questionOptions.map((question) => '');
  const questions = questionOptions.map((question) => question.question);
  const [responses, setResponses] = useState<string[]>(initialResponses);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const context = useAuth();
  const userId = context.user?.uid;

  const handleResponse = (response: string) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = response;
    setResponses(newResponses);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questionOptions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const navigation = useNavigation();
  const surveyId = props.route.params.surveyId;
  console.log(surveyId);

  const writePostSurvey = async () => {
    const firestore = getFirestore();
    const surveyDB = doc(collection(firestore, 'surveys'));
    const questionData = {
      type: SurveyType.PostSurvey,
      questions: questions,
    };
    setDoc(surveyDB, questionData);

    const responsesCollection = doc(collection(surveyDB, 'responses'));
    const responseData = {
      answers: responses,
      submittedAt: serverTimestamp(),
      parentId: userId,
    };
    setDoc(responsesCollection, responseData);

    const docRef = doc(firestore, "users", userId, "tasks", surveyId);
    try {
      await setDoc(docRef, { completed: true }, { merge: true });
      console.log("Task marked as complete:", surveyId);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handlePress = async () => {
    await writePostSurvey();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.bkg}>
      <FontLoader>
        <Pressable
          style={styles.arrow}
          onPress={() => 
            navigation.goBack()
          }>
          <Ionicons name="arrow-back" size={30} color="black"/>
        </Pressable>

        <View>
          <Text style={styles.bookTitle}>Pre-Survey</Text>
        </View>
        <Pressable
          style={styles.arrow}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>
        <ScrollView style={styles.content}>
          <SurveyQuestion
            question={questionOptions[currentQuestionIndex].question}
            options={questionOptions[currentQuestionIndex].options}
            onResponse={handleResponse}
            currentResponse={responses[currentQuestionIndex]}
          />
        </ScrollView>
        <View style={styles.buttonView}>
          {currentQuestionIndex < questionOptions.length - 1 ? (
            <Pressable style={styles.navButton} onPress={nextQuestion}>
              <Text style={styles.navButtonTextNext}>Next</Text>
            </Pressable>
          ) : (
            <Pressable 
              style={styles.navButton} 
              onPress={handlePress}>
                <Text style={styles.navButtonTextSubmit}>Submit</Text>
            </Pressable>
          )}
        </View>
      </FontLoader>
    </SafeAreaView>
  );
};

export default PostSurvey;
