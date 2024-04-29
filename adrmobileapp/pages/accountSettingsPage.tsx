import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getAuth, updateEmail, updatePassword} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

import {AntDesign} from '@expo/vector-icons';

type HandleFunctionType = () => Promise<void>;

interface SettingItemProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  handleFunction: HandleFunctionType;
}

export function SettingItem({
  title,
  value,
  onChangeText,
  secureTextEntry = false,
  handleFunction,
}: SettingItemProps): JSX.Element {
  return (
    <View style={styles.settingContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        <TextInput
          style={styles.input}
          placeholder={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <AntDesign
          name="arrowright"
          style={styles.buttonText}
          onPress={handleFunction}
        />
      </TouchableOpacity>
    </View>
  );
}

export function AccountSettingsPage(): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [numChildren, setNumChildren] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const fetchUserData = async () => {
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', user.uid);
        console.log('USERID: ', user.uid);

        try {
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setName(userData.name || ''); // Assuming the field in Firestore is called "name"
            setEmail(userData.email || ''); // Assuming the field in Firestore is called "email"
            setSelectedDistrict(userData.schoolDistrictId || '');
            setSelectedSchool(userData.schoolId || '');
            setNumChildren(userData.numChildren || ''); // Assuming the field in Firestore is called "name"
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleUpdateProfile = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();

    if (user) {
      //await updateProfile(user, {displayName: name});
      const userDocRef = doc(firestore, 'users', user.uid);
      const userData = {
        name: name,
        email: email,
        userType: 'Parent',
        schoolId: selectedSchool,
        schoolDistrictId: selectedDistrict,
        numChildren: numChildren,
      };

      // Set the data in the document. If doc already exists, it's overwritten
      setDoc(userDocRef, userData, {merge: true})
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
    } else {
      setFeedbackText('User not authenticated.');
    }
  };

  const handleUpdateEmail = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      updateEmail(auth.currentUser, email)
        .then(() => {
          console.log('email updated!');
          // ...
        })
        .catch(error => {
          // An error occurred
          // ...
        });
    } else {
      setFeedbackText('User not authenticated.');
    }
  };

  const handleUpdatePassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      updatePassword(auth.currentUser, password)
        .then(() => {
          console.log('password updated!');
          // ...
        })
        .catch(error => {
          // An error occurred
          // ...
        });
    } else {
      setFeedbackText('User not authenticated.');
    }
  };

  // Checking if num children input is an integer >= 0
  const handleNumChildrenChange = (text: string) => {
    if (/^\d+$/.test(text) || text === '') {
      setNumChildren(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Account</Text>
      </View>
      <SettingItem
        title="Name"
        value={name}
        onChangeText={setName}
        secureTextEntry={false}
        handleFunction={handleUpdateProfile}
      />
      <SettingItem
        title="Email"
        value={email}
        onChangeText={setEmail}
        secureTextEntry={false}
        handleFunction={handleUpdateEmail}
      />
      <SettingItem
        title="Password"
        value="" // placeholder
        onChangeText={setPassword}
        secureTextEntry={true}
        handleFunction={handleUpdatePassword}
      />
      <SettingItem
        title="School District"
        value={selectedDistrict}
        onChangeText={setSelectedDistrict}
        secureTextEntry={false}
        handleFunction={handleUpdateProfile}
      />
      <SettingItem
        title="School"
        value={selectedSchool}
        onChangeText={setSelectedSchool}
        secureTextEntry={false}
        handleFunction={handleUpdateProfile}
      />
      <SettingItem
        title="Number of Children"
        value={numChildren}
        onChangeText={handleNumChildrenChange}
        secureTextEntry={false}
        handleFunction={handleUpdateProfile}
      />
      <Text style={styles.feedbackText}>{feedbackText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: '10%',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  feedbackText: {
    marginTop: 20,
    color: 'red',
  },
  input: {
    width: '100%',
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    color: '#757575',
  },
  settingContainer: {
    flexDirection: 'row', // Arrange title and TextInput in a row
    justifyContent: 'space-between', // Align children components with space between them
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 10, // Adjust the border radius as needed
    borderWidth: 1,
    paddingTop: 3,
    marginBottom: 10, // Add margin to create space between setting items
    width: '80%',
  },
  innerContainer: {
    flexDirection: 'column', // Arrange title and TextInput in a row
    alignItems: 'flex-start', // Align items vertically
  },
  settingTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5, // Add margin to create space between title and TextInput
    alignItems: 'flex-start', // Align items vertically
    paddingLeft: 10,
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    alignItems: 'flex-end',
  },
});

export default AccountSettingsPage;
