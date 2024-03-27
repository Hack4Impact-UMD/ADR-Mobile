import React, {useState} from 'react';
import {View, Text, useColorScheme, Button} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {initializeFirebase} from '../config/firebase';
import {getFirestore} from 'firebase/firestore';
import {collection, addDoc, doc, setDoc} from 'firebase/firestore';

initializeFirebase();
const firestore = getFirestore();

export const Survey = (props: {
  question: string;
  options: string[];
  onResponse: (response: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState(props.options[0]);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  // Getter method to get the selected value
  const getResponse = () => selectedValue;

  return (
    <View>
      <Text style={[isDarkTheme ? {color: 'white'} : {color: 'black'}]}>
        {props.question}
      </Text>

      <RadioButton.Group
        onValueChange={value => {
          setSelectedValue(value);
          props.onResponse(value);
        }}
        value={selectedValue}>
        {props.options.map((option, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton value={option} />
            <Text style={[isDarkTheme ? {color: 'white'} : {color: 'black'}]}>
              {option}
            </Text>
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
};

export default Survey;
