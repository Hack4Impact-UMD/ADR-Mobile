import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, updateEmail, sendEmailVerification, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { RootStackParamList } from '../App';

type userSettingsProps = StackNavigationProp<RootStackParamList, 'UserEmail'>;
const windowWidth = Dimensions.get('window').width;

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
  title: {
    textAlign: 'center',
    fontFamily: 'MontserratBold',
    fontSize: 26,
    marginLeft: 10,
    marginTop: 70,
  },
  genText: {
    textAlign: 'center',
    fontFamily: 'MontserratSemiBold',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 70,
  },
  logo: {
    position: 'absolute',
    alignItems: 'center',
    left: 140,
    top: 700,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: windowWidth * 0.8,
    borderColor: '#0071BA',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    fontFamily: 'Karla',
    fontSize: 20,
  },
  inputContainer: {
    padding: 10,
    paddingTop: 50,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height,
  },
});

export function UserEmail(props: userSettingsProps): React.JSX.Element {
  const navigation = useNavigation<userSettingsProps>();
  const auth = getAuth();

  const [newEmail, setNewEmail] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [password, setPassword] = useState('');


  
  
  return (
    <View style={styles.container}>
      <Image style={styles.blob1} source={require('../assets/images/Blob3.png')} />
      <Image style={styles.blob2} source={require('../assets/images/Blob5.png')} />
      <Text style={styles.title}>Email</Text>
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
        placeholder="Enter old email address"
        placeholderTextColor="#C4DEEF"
        autoCapitalize="none"
        returnKeyType="done"
        value={oldEmail}
        onChangeText={setOldEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new email address"
        placeholderTextColor="#C4DEEF"
        autoCapitalize="none"
        returnKeyType="done"
        value={newEmail}
        onChangeText={setNewEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#C4DEEF"
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
      />
      </View>
      <Image
        style={styles.logo}
        source={require('../assets/images/tiny_logo-removebg.png')}
      />
    </View>
  );
}


export default UserEmail;
