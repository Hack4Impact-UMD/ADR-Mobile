import React, {useState} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {RadioButton} from 'react-native-paper';

export const Survey = props => {
  const [selectedValue, setSelectedValue] = useState(props.value1);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <View>
      <Text style={[isDarkTheme ? {color: 'white'} : {color: 'black'}]}>
        {props.question}
      </Text>

      <RadioButton.Group
        onValueChange={value => setSelectedValue(value)}
        value={selectedValue}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton value={props.value1} />
          <Text style={[isDarkTheme ? {color: 'white'} : {color: 'black'}]}>
            {props.value1}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton value={props.value2} />
          <Text style={[isDarkTheme ? {color: 'white'} : {color: 'black'}]}>
            {props.value2}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton value={props.value3} />
          <Text style={[isDarkTheme ? {color: 'white'} : {color: 'black'}]}>
            {props.value3}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton value={props.value4} />
          <Text style={[isDarkTheme ? {color: 'white'} : {color: 'black'}]}>
            {props.value4}
          </Text>
        </View>
      </RadioButton.Group>

      {/* <Text style={[isDarkTheme ? { color: 'white' } : { color: 'black' }]}>
                Selected Value: {selectedValue}
            </Text> */}
    </View>
  );
};

export default Survey;
