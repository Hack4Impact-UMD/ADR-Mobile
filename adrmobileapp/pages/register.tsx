import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type RegisterProps = {
  navigation: NavigationProp<RootStackParamList>;
};

export function RegistrationScreen(_props: RegisterProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedbacktext, setFeedbackText] = useState('');

  const auth = getAuth();

  const handleRegister = () => {
    return new Promise<void>((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed up successfully
          const user = userCredential.user;
          setFeedbackText('');
          resolve(); // Resolve the promise
        })
        .catch(error => {
          // Error during registration
          const errorMessage = error.message;
          setFeedbackText(errorMessage);
          reject(error); // Reject the promise with the error
        });
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="none" // Prevents auto-capitalization of the first character
          //onChangeText={text => setEmail(text)}
        />
        {/* Email Input */}
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
        </View>
        {/* Login Button */}
        <TouchableOpacity
          style={styles.signUpButtonContainer}
          onPress={async () => {
            try {
              await handleRegister();
              // Iif handleRegister doesn't throw error, navigate to next screen
              _props.navigation.navigate('SecondRegistrationScreen');
            } catch (error) {
              const errorMessage = error.message;
              setFeedbackText(errorMessage);
            }
          }}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
          {/* Display feedbacktext only if it's not empty */}
        </TouchableOpacity>
      </View>
      {feedbacktext !== '' && <Text>{feedbacktext}</Text>}
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
  signUpButtonContainer: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;

