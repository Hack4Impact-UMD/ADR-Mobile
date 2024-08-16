import React, {useCallback, useEffect, useState} from 'react';
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
import { Picker } from '@react-native-picker/picker';
import {createUser} from '../backend/CloudFunctionsCalls';
import { initializeFirebase } from '../config/firebase';
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore';

type RegisterProps = {
  navigation: NavigationProp<RootStackParamList>;
};

export function RegistrationScreen(_props: RegisterProps): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);
  const [numChildren, setNumChildren] = useState('');
  const [feedbacktext, setFeedbackText] = useState('');

  const auth = getAuth();
  initializeFirebase();
  const firestore = getFirestore();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const userId = userCredential.user.uid;
      const creationDate = userCredential.user.metadata.creationTime ?? "undefined";

      await createUser(
        userId,
        name,
        email,
        selectedDistrict,
        numChildren,
        creationDate,
      );  

      console.log("Registration successful:", userCredential.user);
    } catch (error: any) {
      console.error("Registration error:", error.message);
      setFeedbackText(error.message);
    }
  };
  
  const handleNumChildrenChange = (text: string) => {
    if (/^\d+$/.test(text) || text === '') {
      setNumChildren(text);
    }
  };

  async function getDistricts() {
    try {
      const districtsCollection = collection(firestore, 'schoolDistrictIds');
      const districtSnapshot = await getDocs(districtsCollection);
      const districtsArray: string[] = districtSnapshot.docs.map(doc => doc.id);
      setDistricts(districtsArray);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  }

  useEffect(() => {
    getDistricts(); // Fetch districts when the component mounts
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FontLoader>
        <Text style={{fontFamily: 'Chillax', fontSize: 25, marginTop: 100}}>
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
          {/* District Input */}
          <View style={styles.input}>
            <TouchableOpacity
              style={null}
              onPress={() => setShowDistrictPicker(!showDistrictPicker)}>
              <Text style={[styles.selectorPlaceholderWithValue, !selectedDistrict && styles.selectorPlaceholder]}>
                {selectedDistrict || 'Select a district'}
              </Text>
            </TouchableOpacity>
            {showDistrictPicker && (
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItems}
                selectedValue={selectedDistrict}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedDistrict(itemValue);
                  setShowDistrictPicker(false);
                }}>
                {districts.map((district, index) => (
                  <Picker.Item key={index} label={district} value={district} />
                ))}
              </Picker>
            )}
          </View>
          {/* Children Number Input */}
          <View>
            <TextInput
              style={styles.input}
              value={numChildren}
              onChangeText={handleNumChildrenChange}
              keyboardType="numeric"
              placeholder="Number of Children"
              placeholderTextColor={'#C4DEEF'}
              autoCapitalize="none"
              returnKeyType="done"
            />
          </View>
          {/* Login Button */}
          <TouchableOpacity
            style={styles.signUpButtonContainer}
            onPress={async () => {
              try {
                await handleRegister();
                _props.navigation.navigate('HomeScreen');
              } catch (error: any) {
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
  selectorPlaceholder: {
    fontFamily: 'Karla',
    fontSize: 20,
    color: '#ABDAF9',
  },
  selectorPlaceholderWithValue: {
    fontFamily: 'Karla',
    fontSize: 20,
    color: '#000000',
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
  selector: {
    padding: 15,
    paddingLeft: 20,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 10,
    width: windowWidth * 0.8,
    borderColor: '#0071BA',
    borderWidth: 2,
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
    color: '#C4DEEF',
    backgroundColor: '#FFFFFF',
  },
  pickerItems: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'KarlaMedium',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 50,
    marginBottom: 10,
    width: windowWidth * 0.6,
    borderColor: '#0071BA',
    borderWidth: 2,
    shadowColor: '#000000',
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
  },
  picker: {
    marginTop: -50,
  },
});

export default RegistrationScreen;
