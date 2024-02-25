import React, { useState } from 'react';
import { View, Text, useColorScheme } from 'react-native';
import {Survey} from '../components/survey';
  
export function PostSurvey(): React.JSX.Element {
    const theme = useColorScheme();
    const isDarkTheme = theme === 'dark';

    return (
        <View>
            <Text style={[isDarkTheme ? { color: 'white', fontWeight: 'bold' } : { color: 'black', fontWeight: 'bold' }]}>
                Post-Survey
            </Text>

            <Survey 
            question = "How often does our family read together?" 
            numOfOptions = {4}
            options = {["Daily", "Weekly", "Monthly", "We don't read together"]}
            />

            <Survey 
            question = "How often does my child read for pleasure?" 
            numOfOptions = {4}
            options = {["Daily", "Weekly", "Monthly", "Not at all"]}
            />

            <Survey 
            question = "My child enjoys reading books for pleasure:" 
            numOfOptions = {4}
            options = {["A great deal", "Some", "A little", "Not at all"]} 
            />

            <Survey 
            question = "How important is it that my child enjoys reading?" 
            numOfOptions = {4}
            options = {["A great deal", "Some", "A little", "Not at all"]} 
            />

            <Survey 
            question = "Do you believe the ALL DISTRICT READS program has encouraged my child’s reading enjoyment?" 
            numOfOptions = {3}
            options = {["Yes", "No", "Not sure"]}
            />
        </View>
    );
}

export default PostSurvey;