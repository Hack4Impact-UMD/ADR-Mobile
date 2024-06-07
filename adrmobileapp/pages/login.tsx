import React, {useCallback, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  Image,
} from 'react-native';

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FontLoader from '../components/FontLoader';


type LoginProps = {
  navigation: NavigationProp<RootStackParamList>;
};

export function Login(_props: LoginProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedbacktext, setFeedbackText] = useState('');

  const auth = getAuth();

  const isDarkMode = useColorScheme() === 'dark';

  const handleLogin = () => {
    return new Promise<void>((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          setFeedbackText('');
          resolve(); // Resolve the promise
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFeedbackText(errorMessage);
          reject(error); // Reject the promise with the error
        });
    });
  };

  return (
    <View style={styles.container}>
      <FontLoader>
        <Text style = {{fontFamily: 'Chillax', fontSize: 25, marginTop: 50}}>Log in</Text>
        <Image style = {styles.logo} source={require('../assets/images/adr_logo.png')} />
        <View style={styles.inputContainer}>
          {/* Login Input */}
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
            {/* Forgot Password */}
            <View style={styles.forgotPasswordButton}>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.loginButtonContainer
            ]}
            onPress={async () => {
              try {
                await handleLogin();
                // Iif handleRegister doesn't throw error, navigate to next screen
                _props.navigation.navigate('Assignments');
              } catch (error) {
                const errorMessage = error.message;
                setFeedbackText(errorMessage);
              }
            }}>
            <Text
              style={[
                styles.loginButtonText,
              ]}>
              Login
            </Text>
          </TouchableOpacity>
          {/* New user registration */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account yet? </Text>
            <TouchableOpacity
              onPress={() => _props.navigation.navigate('RegistrationScreen')}>
              <Text
                style={[
                  styles.signupLink,
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {feedbacktext !== '' && <Text>{feedbacktext}</Text>}
      </FontLoader>
      <Image style={styles.blob1} source={require('../assets/images/blob1.png')} />
      <Image style={styles.blob2} source={require('../assets/images/blob2.png')} />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width; // Get the width of the device's screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height,
  },
  inputContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  logo: {
    width: 250,
    height: 240,
    resizeMode: 'cover',
    marginBottom: 10,
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
  forgotPasswordButton: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Karla',
  },
  loginButtonContainer: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#0071BA',
    shadowColor: '#000000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 4,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'KarlaBold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Karla',
  },
  signupLink: {
    color: '#000000',
    fontFamily: 'Karla',
    fontSize: 14,
  },
  blob1: {
    position: 'absolute',
    bottom: 55 ,
    left: -60,
    height: '38%',
    width:'99%',
    aspectRatio: 1,
    zIndex: -1,
  },
  blob2: {
    position: 'absolute',
    bottom: 250,
    right: 0,
    height: 340,
    width:300,
    aspectRatio: 1 ,
    zIndex: -1,
  },
});

export default Login;
