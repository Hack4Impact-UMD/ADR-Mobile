import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

export const Survey = (props) => {
    const [selectedValue, setSelectedValue] = useState(props.value1);
    return (
        <View>
            <Text>{props.question}</Text>

            <RadioButton.Group
                onValueChange={(value) => setSelectedValue(value)}
                value={selectedValue}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value={props.value1}/>
                    <Text>{props.value1}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value={props.value2}/>
                    <Text>{props.value2}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value={props.value3}/>
                    <Text>{props.value3}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value={props.value4}/>
                    <Text>{props.value4}</Text>
                </View>
            </RadioButton.Group>

            {/* <Text>Selected Value: {selectedValue}</Text> */}
        </View>
    );
  };

export default Survey;