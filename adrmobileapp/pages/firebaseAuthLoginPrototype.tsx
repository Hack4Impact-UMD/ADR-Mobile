import React, {useState} from 'react';
import {Text, TextInput, View, Button} from 'react-native';

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

export function FirebaseAuthLoginPrototype(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedbacktext, setFeedbackText] = useState('');

  const auth = getAuth();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        setFeedbackText('Logged in successfully');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setFeedbackText(errorMessage);
      });
  };

  return (
    <View>
      <Text>Login Here</Text>
      <View>
        <TextInput placeholder="Email" onChangeText={text => setEmail(text)} />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
        />
        <Button title="Submit" onPress={handleLogin} />
      </View>
      <Text>{feedbacktext}</Text>
    </View>
  );
}

export default FirebaseAuthLoginPrototype;
