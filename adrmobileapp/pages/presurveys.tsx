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


type PreSurveyNavigationProp = StackNavigationProp<RootStackParamList, 'PreSurvey'>;

interface SurveyQuestion {
  question: string;
  options: string[];
}

interface PreSurveyProps {}

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
  content: {
    marginLeft: '4%',
    marginRight: '4%',
    flex: 1,
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
  arrow: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '8%',
  },
  navButton: {
    padding: 10,
    backgroundColor: '#0071BA',
    borderRadius: 5,
  },
  navButtonText: {
    color: 'white',
    fontSize: 18,
  },
  arrow: {
    position: 'absolute',
    left: 20,
    top: 70,
    zIndex: 1,
  },
});

export const PreSurvey: React.FC<PreSurveyProps> = (): React.JSX.Element => {
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

  const initialResponses = questionOptions.map((question) => question.options[0]);
  const questions = questionOptions.map((question) => question.question);
  const [responses, setResponses] = useState<string[]>(initialResponses);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  const navigation = useNavigation<PreSurveyNavigationProp>();

  const writeSurvey = () => {
    const firestore = getFirestore();
    const surveyDB = doc(collection(firestore, 'surveys'));
    const questionData = {
      type: 'PreProgram',
      questions: questions,
    };
    setDoc(surveyDB, questionData);
    const responsesCollection = doc(collection(surveyDB, 'responses'));

    const responseData = {
      answers: responses,
      submittedAt: serverTimestamp(),
    };

    setDoc(responsesCollection, responseData);
  };

  return (
    <SafeAreaView style={styles.bkg}>
      <FontLoader>
        <Pressable
          style={styles.arrow}
          onPress={() => 
            navigation.goBack()
          }>
          <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>

        <View style={styles.bookCover}>
          <Text style={styles.bookTitle}>Pre-Survey</Text>
        </View>
        <Pressable
          style={styles.arrow}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={30} color="white" />
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
          <Pressable style={styles.navButton} onPress={previousQuestion} disabled={currentQuestionIndex === 0}>
            <Text style={styles.navButtonText}>Previous</Text>
          </Pressable>
          {currentQuestionIndex < questionOptions.length - 1 ? (
            <Pressable style={styles.navButton} onPress={nextQuestion}>
              <Text style={styles.navButtonText}>Next</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.navButton} onPress={writeSurvey}>
              <Text style={styles.navButtonText}>Submit</Text>
            </Pressable>
          )}
        </View>
      </FontLoader>
    </SafeAreaView>
  );
};

export default PreSurvey;
