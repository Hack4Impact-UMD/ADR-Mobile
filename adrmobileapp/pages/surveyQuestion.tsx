import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface SurveyQuestionProps {
  question: string;
  options: string[];
  onResponse: (response: string) => void;
  currentResponse: string;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({
  question,
  options,
  onResponse,
  currentResponse,
}) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => (
        <Pressable key={index} style={styles.optionButton} onPress={() => onResponse(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SurveyQuestion;
