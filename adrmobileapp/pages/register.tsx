import React, {useCallback, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import FontLoader from '../components/FontLoader';

type RegisterProps = {
  navigation: NavigationProp<RootStackParamList>;
};

export function RegistrationScreen(_props: RegisterProps): React.JSX.Element {
  const [name, setName] = useState('');
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
    <ScrollView contentContainerStyle={styles.container}>
      <FontLoader>
        <Text style={{fontFamily: 'Chillax', fontSize: 25, marginTop: 120}}>
          Sign up
        </Text>
        <Image
          style={styles.logo}
          source={require('../assets/images/adr_logo.png')}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#C4DEEF"
            autoCapitalize="none" // Prevents auto-capitalization of the first character
            returnKeyType="done"
            onChangeText={text => setName(text)}
          />
          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#C4DEEF"
            autoCapitalize="none" // Prevents auto-capitalization of the first character
            returnKeyType="done"
            onChangeText={text => setEmail(text)}
          />
          {/* Password */}
          <View>
            {/* Password input */}
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#C4DEEF"
              autoCapitalize="none"
              returnKeyType="done"
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
                _props.navigation.navigate('SecondRegistrationScreen', {
                  name: name,
                  email: email,
                });
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
      </FontLoader>
      <Image
        style={styles.blob1}
        source={require('../assets/images/blob1.png')}
      />
      <Image
        style={styles.blob2}
        source={require('../assets/images/blob2.png')}
      />
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width; // Get the width of the device's screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 0,
  },
  inputContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingLeft: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: windowWidth * 0.8,
    borderColor: '#0071BA',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    fontFamily: 'Karla',
    fontSize: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpButtonContainer: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#0071BA',
    shadowColor: '#000000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontFamily: 'KarlaBold',
    fontSize: 24,
  },
  logo: {
    width: 250,
    height: 240,
    resizeMode: 'cover',
    marginTop: 10,
  },
  blob1: {
    position: 'absolute',
    bottom: 0,
    left: -60,
    height: '38%',
    width: '99%',
    aspectRatio: 1,
    zIndex: -1,
  },
  blob2: {
    position: 'absolute',
    bottom: 185,
    right: 0,
    height: 340,
    width: 300,
    aspectRatio: 1,
    zIndex: -1,
  },
});

export default RegistrationScreen;
