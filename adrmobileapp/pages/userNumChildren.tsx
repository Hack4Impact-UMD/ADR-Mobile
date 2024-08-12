import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type userSettingsProps = StackNavigationProp<RootStackParamList, 'UserChildren'>;
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
    top: 5,
    left: -5,
    fontFamily: 'MontserratMedium',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'MontserratBold',
    fontSize: 24,
    marginLeft: 20,
    marginTop: 25,
  },
  wrapTitle: {
    textAlign: 'center',
    fontFamily: 'MontserratBold',
    fontSize: 24,
    marginLeft: 20,
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
});

export function UserChildren(props: userSettingsProps): React.JSX.Element {
  const navigation = useNavigation<userSettingsProps>();
  const [numberOfChildren, setNumberOfChildren] = useState<number | null>(null);
  const [newNumberOfChildren, setNewNumberOfChildren] = useState<string>(''); // Initialize with empty string

  const fetchNumberOfChildren = useCallback(async () => {
    const auth = getAuth();
    const userID = auth.currentUser?.uid;
    if (!userID) return;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', userID);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const numChildren = userData?.numChildren || 0;
      setNumberOfChildren(numChildren);
    }
  }, []);

  useEffect(() => {
    fetchNumberOfChildren();
  }, [fetchNumberOfChildren]);

  async function handleUpdateNumberOfChildren() {
    if (newNumberOfChildren === '') {
      Alert.alert('Please enter a new number of children.');
      return;
    }

    const auth = getAuth();
    const userID = auth.currentUser?.uid;
    if (!userID) return;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', userID);

    try {
      await updateDoc(userDocRef, { numChildren: parseInt(newNumberOfChildren, 10) });
      setNumberOfChildren(parseInt(newNumberOfChildren, 10));
      Alert.alert('Number of children updated successfully!');
    } catch (error: any) {
      console.error('Error updating number of children:', error);
      Alert.alert('Failed to update number of children.');
    }
  }

  return (
    <SafeAreaView>
      <Image style={styles.blob1} source={require('../assets/images/Blob3.png')} />
      <Image style={styles.blob2} source={require('../assets/images/Blob5.png')} />
      <Text style={styles.title}>Update Number</Text>
      <Text style={styles.wrapTitle}>of Children</Text>

      <Pressable
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>

      <ScrollView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={newNumberOfChildren}
          onChangeText={setNewNumberOfChildren}
          placeholder="Enter number of children"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleUpdateNumberOfChildren}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>

      <Image style={styles.logo} source={require('../assets/images/tiny_logo-removebg.png')} />
    </SafeAreaView>
  );
}

export default UserChildren;
