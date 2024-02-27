import React, {useState} from 'react';
import {Text, TextInput, View, Button, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type FirebaseAuthLoginPrototypeProps = {
  navigation: NavigationProp<RootStackParamList>;
};

export function FirebaseAuthLoginPrototype(
  _props: FirebaseAuthLoginPrototypeProps,
): React.JSX.Element {
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
      <View style={styles.inputContainer}>
        {/* Login Input */}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          autoCapitalize="none" // Prevents auto-capitalization of the first character
          onChangeText={text => setEmail(text)}
        />
        {/* Password */}
        <View>
          {/* Password input */}
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
          {/* Forgot Password */}
          <View style={styles.forgotPasswordButton}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        {/* New user registration */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account yet? </Text>
          <TouchableOpacity
            onPress={() => _props.navigation.navigate('RegistrationScreen')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
  },
  inputContainer: {
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
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordButton: {
    alignItems: 'flex-end', // Align to the right
  },
  forgotPasswordText: {
    color: '#B8B8B8',
    fontSize: 13,
  },
  loginButtonContainer: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  signupText: {
    color: '#B8B8B8',
    fontSize: 13,
  },
  signupLink: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default FirebaseAuthLoginPrototype;
