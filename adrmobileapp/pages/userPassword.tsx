import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type userSettingsProps = StackNavigationProp<RootStackParamList, 'UserPassword'>;
const windowWidth = Dimensions.get('window').width; // Get the width of the device's screen


const styles = StyleSheet.create({
  blob1: {
    position: 'absolute',
    width: 420,
    height: 180,
    top: 200,
    left: -15,
    overflow: 'visible',
  },
  blob2: {
    position: 'absolute',
    width: 380,
    height: 180,
    top: 220,
    left: -5,
    overflow: 'visible',
  },
  arrow: {
    position: 'absolute',
    left: 30,
    top: 70,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0071BA',
    top: 13,
    left: -5,
    fontFamily: 'MontserratMedium',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'MontserratBold',
    fontSize: 26,
    marginLeft: 12,
    marginTop: 68,
  },
  logo: {
    position: 'absolute',
    alignItems: 'center',
    left: 140,
    top: 700,
  },
  inputContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 40,
    marginLeft: 30,
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
  buttonContainer: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    marginRight: 25,
    backgroundColor: '#0071BA',
    shadowColor: '#000000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 4,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'KarlaBold',
  },
  message: {
    textAlign: 'center',
    margin: 10,
    fontSize: 16,
    fontFamily: 'MontserratMedium',
  },
});

export function UserPassword(props: userSettingsProps): React.JSX.Element {
  const navigation = useNavigation<userSettingsProps>();
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');

  const handleForgotPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      setResetPasswordMessage('Password reset email sent!');
      setForgotPasswordEmail(''); // Clear the forgot password input field
    } catch (error: any) {
      console.error('Error sending password reset email:', error.message);
      setResetPasswordMessage('Error: ' + error.message);
    }
  };

  return (
    <View>
      <Image style={styles.blob1} source={require('../assets/images/Blob3.png')} />
      <Image style={styles.blob2} source={require('../assets/images/Blob5.png')} />
      <Text style={styles.title}>Change Password</Text>

      <Pressable
        style={styles.arrow}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={forgotPasswordEmail}
          onChangeText={setForgotPasswordEmail}
          autoCapitalize="none"
          keyboardType="email-address" 
        />


        <TouchableOpacity style={styles.buttonContainer} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
      {resetPasswordMessage ? (
        <Text style={styles.message}>{resetPasswordMessage}</Text>
      ) : null}

      <Image style={styles.logo} source={require('../assets/images/tiny_logo-removebg.png')} />
    </View>
  );
}

export default UserPassword;
