import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type userSettingsProps = StackNavigationProp<RootStackParamList, 'UserDistrict'>;

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
    padding: 25,
  },
  logo: {
    position: 'absolute',
    alignItems: 'center',
    left: 140,
    top: 700,
  },
  input: {
    height: 40,
    borderColor: '#0071BA',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#0071BA',
  },
  buttonContainer: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    marginRight: 25,
    marginLeft: 18,
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
  picker: {
    // height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginTop: -10,
  },
  pickerItems: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'KarlaMedium',
  },
});

export function UserDistrict(props: userSettingsProps): React.JSX.Element {
  const navigation = useNavigation<userSettingsProps>();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  const fetchCurrentDistrict = useCallback(async () => {
    const auth = getAuth();
    const userID = auth.currentUser?.uid;
    if (!userID) return;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', userID);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      // Ensure district is set correctly, defaulting to empty string if not set
      setSelectedDistrict('');
    } else {
      console.log('No such document!');
      setSelectedDistrict(''); // Ensure default value is set
    }
  }, []);

  useEffect(() => {
    fetchCurrentDistrict();
  }, [fetchCurrentDistrict]);

  async function handleUpdateDistrict() {
    if (selectedDistrict === '') {
      Alert.alert('Error', 'Please select a district.');
      return;
    }

    const auth = getAuth();
    const userID = auth.currentUser?.uid;
    if (!userID) return;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', userID);

    try {
      await updateDoc(userDocRef, { schoolDistrictId: selectedDistrict });
      setSelectedDistrict(selectedDistrict);
      console.log("district: ", selectedDistrict)
      Alert.alert('Success', 'District updated successfully!');
    } catch (error: any) {
      console.error('Error updating district:', error);
      Alert.alert('Error', `Failed to update district: ${error.message}`);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.blob1} source={require('../assets/images/Blob3.png')} />
      <Image style={styles.blob2} source={require('../assets/images/Blob5.png')} />
      <Text style={styles.title}>Change District</Text>
      <Pressable
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>

      <View style={{ margin: 20 }}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItems}
          selectedValue={selectedDistrict}
          onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
        >
          <Picker.Item label="Select a district" value="" />
          <Picker.Item label="District 1" value="District 1" />
          <Picker.Item label="District 2" value="District 2" />
          <Picker.Item label="District 3" value="District 3" />
        </Picker>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleUpdateDistrict}>
          <Text style={styles.buttonText}>Update District</Text>
        </TouchableOpacity>
      </View>

      <Image style={styles.logo} source={require('../assets/images/tiny_logo-removebg.png')} />
    </SafeAreaView>
  );
}

export default UserDistrict;