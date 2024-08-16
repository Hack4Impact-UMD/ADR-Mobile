// ./surveyQuestions.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            currentResponse === option && styles.selectedOption,
          ]}
          onPress={() => onResponse(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'MontserratSemiBold',
    padding: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: '#0071BA',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  selectedOption: {
    backgroundColor: '#C4E7FF',
  },
  optionText: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'MontserratSemiBold',
  },
});

export default SurveyQuestion;
