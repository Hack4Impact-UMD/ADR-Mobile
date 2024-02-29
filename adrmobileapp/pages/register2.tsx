import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {RootStackParamList} from '../App';

type Register2Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export function SecondRegistrationScreen(
  _props: Register2Props,
): React.JSX.Element {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [showSchoolPicker, setShowSchoolPicker] = useState(false);
  const [numChildren, setNumChildren] = useState('');

  // Checking if num children input is an integer >= 0
  const handleNumChildrenChange = (text: string) => {
    if (/^\d+$/.test(text) || text === '') {
      setNumChildren(text);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        {/* District Input */}
        <View style={styles.input}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDistrictPicker(!showDistrictPicker)}>
            <Text style={styles.inputTitle}>Choose a School District</Text>
            <Text>{selectedDistrict || 'Select a district'}</Text>
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
            <Text>{selectedSchool || 'Select a School'}</Text>
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
            autoCapitalize="none"
            returnKeyType="done"
          />
        </View>
        <View>
          {/* Login Button */}
          <TouchableOpacity
            style={styles.finishButtonContainer}
            onPress={() => _props.navigation.navigate('HomeScreen')}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width; // Get the width of the device's screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 50,
  },
  inputContainer: {
    padding: 10,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 50,
    marginBottom: 10,
    width: windowWidth * 0.6,
  },
  inputTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
  },
  pickerItems: {
    color: 'black',
    fontSize: 15,
  },
  finishButtonContainer: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  finishButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SecondRegistrationScreen;
