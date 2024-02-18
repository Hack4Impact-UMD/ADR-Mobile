import React, {useState} from 'react';
import {Text, TextInput, View, Button} from 'react-native';

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

export function FirebaseAuthRegisterPrototype(): React.JSX.Element {
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
        <TextInput placeholder="Email" onChangeText={text => setEmail(text)} />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
        />
        <Button title="Submit" onPress={handleRegister} />
      </View>
      <Text>{feedbacktext}</Text>
    </View>
  );
}

export default FirebaseAuthRegisterPrototype;
