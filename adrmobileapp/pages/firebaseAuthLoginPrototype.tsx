import React, {useState} from 'react';
import {Text, TextInput, View, Button, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

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
    <View style={styles.container}>
      {/* <Text>Login Here</Text> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          autoCapitalize="none" // Prevents auto-capitalization of the first character
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none" // Prevents auto-capitalization of the first character
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text>{feedbacktext}</Text>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width; // Get the width of the device's screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: windowWidth * 0.6,
  },
  loginButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FirebaseAuthLoginPrototype;
