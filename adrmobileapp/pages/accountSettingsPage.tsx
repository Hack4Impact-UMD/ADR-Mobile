import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getAuth, updateEmail, updatePassword, updateProfile} from 'firebase/auth';
import {getFirestore, doc, updateDoc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';

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

    if (user) {
      try {
        await updateProfile(user, {displayName: name});
        setFeedbackText('Profile updated successfully.');
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setFeedbackText(errorMessage);
      }
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
      <Text style={styles.title}>Account Settings</Text>
      <TextInput
        style={styles.input}
        placeholder={name || 'Name'}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder={selectedDistrict || 'School District'}
        value={name}
        onChangeText={setSelectedDistrict}
      />
      <TextInput
        style={styles.input}
        placeholder={selectedSchool || 'School'}
        value={name}
        onChangeText={setSelectedSchool}
      />
      <TextInput
        style={styles.input}
        placeholder={numChildren || 'Number of Children'}
        onChangeText={handleNumChildrenChange}
        keyboardType="numeric"
        autoCapitalize="none"
        returnKeyType="done"
      />
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateEmail}>
        <Text style={styles.buttonText}>Update Email</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
      <Text style={styles.feedbackText}>{feedbackText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedbackText: {
    marginTop: 20,
    color: 'red',
  },
});

export default AccountSettingsPage;
