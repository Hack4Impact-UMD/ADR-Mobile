import React, {useState} from 'react';
import {Text, TextInput, View, Button} from 'react-native';

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type FirebaseAuthRegisterPrototypeProps = {
  navigation: NavigationProp<RootStackParamList>;
};

export function FirebaseAuthRegisterPrototype(
  props: FirebaseAuthRegisterPrototypeProps,
): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedbacktext, setFeedbackText] = useState('');

  const auth = getAuth();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        setFeedbackText('Registered successfully');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setFeedbackText(errorMessage);
      });
  };

  return (
    <View>
      <Text>Register Here</Text>
      <View>
        <TextInput
          placeholder="Email"
          autoCapitalize="none" // Prevents auto-capitalization of the first character
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none" // Prevents auto-capitalization of the first character
          onChangeText={text => setPassword(text)}
        />
        <Button title="Submit" onPress={handleRegister} />
        <Button title="Go Back" onPress={() => props.navigation.goBack()} />
      </View>
      <Text>{feedbacktext}</Text>
    </View>
  );
}

export default FirebaseAuthRegisterPrototype;
