import React, { useState } from 'react';
import { View, Text, useColorScheme, Button } from 'react-native';
import {Survey} from '../components/survey';
import {initializeFirebase} from '../config/firebase';
import { getFirestore } from "firebase/firestore";
import { collection, serverTimestamp, doc, setDoc } from "firebase/firestore"; 
  
export function PreSurvey(): React.JSX.Element {
    const questionOptions = [
        {
            question: 'How often does our family read together?',
            options: ["Daily", "Weekly", "Monthly", "We don't read together"]
        },
        {
            question: 'How often does my child read for pleasure?',
            options: ["Daily", "Weekly", "Monthly", "Not at all"]
        },
        {
            question: 'My child enjoys reading books for pleasure.',
            options: ["A great deal", "Some", "A little", "Not at all"]
        },
        {
            question: 'How important is it that my child enjoys reading?',
            options: ["A great deal", "Some", "A little", "Not at all"]
        },
        {
            question: 'Do you believe a program that encourages families reading together would affect my child’s reading enjoyment?',
            options: ["Yes", "No", "Not sure"]
        }
    ];

    // State to store responses
    const initialResponses = questionOptions.map((question) => question.options[0]);
    const questions = questionOptions.map((question) => question.question);
    const [responses, setResponses] = useState<string[]>(initialResponses);
    
    // Function to handle survey response
    const handleResponse = (index: number, response: string) => {
        const newResponses = [...responses];
        newResponses[index] = response;
        setResponses(newResponses);
    };

    initializeFirebase();
    const firestore = getFirestore();

    function writeSurvey(){
        const surveyDB = doc(collection(firestore, "surveys"));
        const questionData = {
            type: 'PreProgram',
            questions: questions,
        };
        setDoc(surveyDB, questionData);
        const responsesCollection = doc(collection(surveyDB, "responses"));

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
            <Text style={[isDarkTheme ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' }]}>
                Pre-Survey
            </Text>
            {questionOptions.map((question, index) => (
                <Survey
                    key={index}
                    question={question.question}
                    options={question.options}
                    onResponse={(response) => handleResponse(index, response)}
                />
            ))}

            <Button
                title="Submit"
                onPress={writeSurvey}
            />
        </View>
    );
}

export default PreSurvey;
