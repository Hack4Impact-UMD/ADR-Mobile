import React, {useState} from 'react';
import {Text, TextInput, View, Button} from 'react-native';

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

export function FirebaseAuthPrototype(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleLogin = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View>
      <Text> Register Here</Text>
      <View>
        <TextInput placeholder="Email" onChangeText={text => setEmail(text)} />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
        />
        <Button title="Submit" onPress={handleLogin} />
      </View>
    </View>
  );
}

export default FirebaseAuthPrototype;
