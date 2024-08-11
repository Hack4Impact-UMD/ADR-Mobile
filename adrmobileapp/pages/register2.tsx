import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {RootStackParamList} from '../App';
import {initializeFirebase} from '../config/firebase';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import {StackNavigationProp} from '@react-navigation/stack';
import {createUser} from '../backend/CloudFunctionsCalls';
import FontLoader from '../components/FontLoader';

type routeProp = RouteProp<RootStackParamList, 'SecondRegistrationScreen'>;
type navProp = StackNavigationProp<
  RootStackParamList,
  'SecondRegistrationScreen'
>;

type Register2Props = {
  navigation: navProp;
  route: routeProp; // Route prop to access parameters
};

export function SecondRegistrationScreen(
  props: Register2Props,
): React.JSX.Element {
  const {name, email} = props.route.params; // Access name and email from route parameters

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [showSchoolPicker, setShowSchoolPicker] = useState(false);
  const [numChildren, setNumChildren] = useState('');
  const [creationDate, setCreationDate] = useState('')

  initializeFirebase();
  const firestore = getFirestore();

  // schoolId and schoolDistrictId are populated in the next page
  async function writeUser() {
    try {
      // Adds a new document with an automatically generated ID
      await createUser(
        name,
        email,
        selectedSchool,
        selectedDistrict,
        numChildren,
        creationDate
      );
      console.log('Document written');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // Checking if num children input is an integer >= 0
  const handleNumChildrenChange = (text: string) => {
    if (/^\d+$/.test(text) || text === '') {
      setNumChildren(text);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.ellipse}
        source={require('../assets/images/ellipse.png')}
      />
      <FontLoader>
        <Text style={{fontFamily: 'Chillax', fontSize: 25}}>
          School Information
        </Text>
        <View style={styles.inputContainer}>
          {/* District Input */}
          <View style={styles.input}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDistrictPicker(!showDistrictPicker)}>
              <Text style={styles.inputTitle}>Choose a School District</Text>
              <Text style={styles.selector}>
                {selectedDistrict || 'Search for your district'}
              </Text>
            </TouchableOpacity>
            {showDistrictPicker && (
              <Picker
                style={styles.input}
                itemStyle={styles.pickerItems}
                selectedValue={selectedDistrict}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedDistrict(itemValue);
                  setShowDistrictPicker(false);
                }}>
                <Picker.Item label="Select a district" value="" />
                <Picker.Item label="District 1" value="District 1" />
                <Picker.Item label="District 2" value="District 2" />
                <Picker.Item label="District 3" value="District 3" />
              </Picker>
            )}
          </View>
          {/* School Input */}
          <View style={styles.input}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowSchoolPicker(!showSchoolPicker)}>
              <Text style={styles.inputTitle}>Choose a School</Text>
              <Text style={styles.selector}>
                {selectedSchool || 'Search for your school'}
              </Text>
            </TouchableOpacity>
            {showSchoolPicker && (
              <Picker
                style={styles.input}
                itemStyle={styles.pickerItems}
                selectedValue={selectedSchool}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedSchool(itemValue);
                  setShowSchoolPicker(false);
                }}>
                <Picker.Item label="Select a school" value="" />
                <Picker.Item label="School 1" value="School 1" />
                <Picker.Item label="School 2" value="School 2" />
                <Picker.Item label="School 3" value="School 3" />
              </Picker>
            )}
          </View>
          {/* Children Number Input */}
          <View style={styles.input}>
            <Text style={styles.inputTitle}>Number of Children Attending</Text>
            <TextInput
              style={styles.textInput}
              value={numChildren}
              onChangeText={handleNumChildrenChange}
              keyboardType="numeric"
              placeholder="#"
              placeholderTextColor={'#C4DEEF'}
              autoCapitalize="none"
              returnKeyType="done"
            />
          </View>
          <View>
            {/* Login Button */}
            <TouchableOpacity
              style={styles.finishButtonContainer}
              onPress={async () => {
                try {
                  await writeUser();
                  props.navigation.navigate('HomeScreen');
                } catch (error) {
                  console.error('Error finishing registration: ', error);
                }
              }}>
              <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </FontLoader>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width; // Get the width of the device's screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginBottom: 40,
    // maxHeight: '50%',
  },
  inputContainer: {
    padding: 10,
    marginTop: 50,
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
  inputTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'MontserratSemiBold',
    marginBottom: 10,
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
  finishButtonContainer: {
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
  finishButtonText: {
    color: '#FFFFFF',
    fontFamily: 'KarlaBold',
    fontSize: 24,
  },
  ellipse: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '33%',
    aspectRatio: 1,
    overflow: 'visible',
  },
  logo: {
    width: 250,
    height: 240,
    resizeMode: 'cover',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default SecondRegistrationScreen;