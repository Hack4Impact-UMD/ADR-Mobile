import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {Survey} from '../components/survey';
  
export function PostSurvey(): React.JSX.Element {
    return (
        <View>
            <Text style={{fontWeight: 'bold'}}>Post-survey</Text>
            <Survey 
            question = "How often does our family read together?" 
            value1 = "Daily"
            value2 = "Weekly"
            value3 = "Mon thly"
            value4 = "We don’t read together"
            />

            <Survey 
            question = "How often does my child read for pleasure?" 
            value1 = "Daily"
            value2 = "Weekly"
            value3 = "Monthly"
            value4 = "Not at all"
            />

            <Survey 
            question = "My child enjoys reading books for pleasure:" 
            value1 = "A great deal"
            value2 = "Some"
            value3 = "A little"
            value4 = "Not at all"
            />

            <Survey 
            question = "How important is it that my child enjoys reading?" 
            value1 = "A great deal"
            value2 = "Some"
            value3 = "A little"
            value4 = "Not at all"
            />

            <Survey 
            question = "Do you believe the ALL DISTRICT READS program has encouraged my child’s reading enjoyment?" 
            value1 = "Yes"
            value2 = "No"
            value3 = "Not sure"
            />
        </View>
    );
}

export default PostSurvey;