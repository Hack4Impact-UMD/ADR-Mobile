import React, { useState } from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { RadioButton } from 'react-native-paper';

export const Survey = (props: {numOfOptions: number; question: string; options: string[];}) => {
    const [selectedValue, setSelectedValue] = useState(props.options[0]);
    const theme = useColorScheme();
    const isDarkTheme = theme === 'dark';

    return (
        <View>
            <Text style={[isDarkTheme ? { color: 'white' } : { color: 'black' }]}>
                {props.question}
            </Text>

            <RadioButton.Group
                onValueChange={(value) => setSelectedValue(value)}
                value={selectedValue}
            >
                {props.options.slice(0, props.numOfOptions).map((option, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value={option}/>
                        <Text style={[isDarkTheme ? { color: 'white' } : { color: 'black' }]}>
                            {option}
                        </Text>
                    </View>
                ))}
            </RadioButton.Group>

            {/* <Text style={[isDarkTheme ? { color: 'white' } : { color: 'black' }]}>
                Selected Value: {selectedValue}
            </Text> */}
        </View>
    );
  };

export default Survey;