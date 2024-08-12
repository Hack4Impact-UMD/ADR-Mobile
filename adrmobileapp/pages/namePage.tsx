import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type userSettingsProps = StackNavigationProp<RootStackParamList, 'UserName'>;
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
  title: {
    textAlign: 'center',
    fontFamily: 'MontserratBold',
    fontSize: 26,
    marginLeft: 10,
    marginTop: 25,
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
    marginLeft: 25,
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
});

export function UserName(props: userSettingsProps): React.JSX.Element {
  const navigation = useNavigation<userSettingsProps>();
  const [currentName, setCurrentName] = useState<string>('');
  const [newName, setNewName] = useState<string>(''); // Initialize as empty string

  const fetchUserName = useCallback(async () => {
    const auth = getAuth();
    const userID = auth.currentUser?.uid;
    if (!userID) return;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', userID);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      setCurrentName(userData?.name || ''); // Use this for displaying current name
      // Do not set newName here
    }
  }, []);

  useEffect(() => {
    fetchUserName();
  }, [fetchUserName]);

  async function handleUpdateName() {
    if (newName === '') {
      Alert.alert('Validation Error', 'Please enter a new name.');
      return;
    }

    const auth = getAuth();
    const userID = auth.currentUser?.uid;
    if (!userID) return;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', userID);

    try {
      await updateDoc(userDocRef, { name: newName });
      setCurrentName(newName);
      Alert.alert('Success', 'Name updated successfully!');
    } catch (error) {
      console.error('Error updating name:', error);
      Alert.alert('Error', 'Failed to update name.');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.blob1} source={require('../assets/images/Blob3.png')} />
      <Image style={styles.blob2} source={require('../assets/images/Blob5.png')} />
      <Text style={styles.title}>Change Name</Text>
      <Pressable
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
          placeholder="Enter new name"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleUpdateName}>
          <Text style={styles.buttonText}>Update Name</Text>
        </TouchableOpacity>
      </View>

      <Image style={styles.logo} source={require('../assets/images/tiny_logo-removebg.png')} />
    </SafeAreaView>
  );
}

export default UserName;
