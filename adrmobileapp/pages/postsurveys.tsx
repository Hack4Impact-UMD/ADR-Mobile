import React, {useState} from 'react';
import {View, Text, useColorScheme, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {Survey} from '../components/survey';
import {initializeFirebase} from '../config/firebase';
import {getFirestore} from 'firebase/firestore';
import {collection, serverTimestamp, doc, setDoc} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


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

export function PostSurvey(): React.JSX.Element {
  const questionOptions = [
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
      question:
        'Do you believe the ALL DISTRICT READS program has encouraged my child’s reading enjoyment?',
      options: ['Yes', 'No', 'Not sure'],
    },
  ];

  // State to store responses
  const initialResponses = questionOptions.map(question => question.options[0]);
  const questions = questionOptions.map(question => question.question);
  const [responses, setResponses] = useState<string[]>(initialResponses);

  // Function to handle survey response
  const handleResponse = (index: number, response: string) => {
    const newResponses = [...responses];
    newResponses[index] = response;
    setResponses(newResponses);
  };

  initializeFirebase();
  const firestore = getFirestore();

  function writeSurvey() {
    const surveyDB = doc(collection(firestore, 'surveys'));
    const questionData = {
      type: 'MidProgram',
      questions: questions,
    };
    setDoc(surveyDB, questionData);
    const responsesCollection = doc(collection(surveyDB, 'responses'));

    const responseData = {
      answers: responses,
      submittedAt: serverTimestamp(),
    };

    setDoc(responsesCollection, responseData);
  }

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  

  return (
    <View>
      <Text
        style={[
          isDarkTheme
            ? {color: 'white', fontWeight: 'bold'}
            : {color: 'black', fontWeight: 'bold'},
        ]}>
        Post-Survey
      </Text>
      {questionOptions.map((question, index) => (
        <Survey
          key={index}
          question={question.question}
          options={question.options}
          onResponse={response => handleResponse(index, response)}
        />
      ))}

      <Button title="Submit" onPress={writeSurvey} />
    </View>
  );
}

export default PostSurvey;
