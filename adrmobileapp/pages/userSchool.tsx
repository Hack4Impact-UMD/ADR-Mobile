import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
  ImageBackground,
  SectionList,
} from 'react-native';
import {RootStackParamList} from '../App';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FontLoader from '../components/FontLoader';

type userSettingsProps = StackNavigationProp<RootStackParamList, 'UserSchool'>;

const styles = StyleSheet.create({
  blob1: {
    position: 'absolute',
    width: 420,
    height: 180,
    top:200,
    left: -15,
    overflow: 'visible',
  },
  blob2: {
    position: 'absolute',
    width: 380,
    height: 180,
    top:220,
    left: -5,
    overflow: 'visible',
  },
  arrow: {
    position: 'absolute',
    left: 30,
    top: 70,
  },
  title:{
    textAlign: 'center',
    fontFamily: 'MontserratBold',
    fontSize: 26,
    marginLeft: 10,
    marginTop: 70
  },
  logo: {
    position: 'absolute',
    alignItems: 'center',
    left: 140,
    top: 700,
  },
})

export function UserSchool(props: userSettingsProps): React.JSX.Element {
  const navigation = useNavigation<userSettingsProps>();

  return (
    <View>
      <Image style={styles.blob1} source={require('../assets/images/Blob3.png')} />
      <Image style={styles.blob2} source={require('../assets/images/Blob5.png')} />
      <Text style={styles.title}>School</Text>
     
      <Pressable
          style={styles.arrow}
          onPress={() => {
              navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>  

      <Image style={styles.logo} source={require('../assets/images/tiny_logo-removebg.png')} />

    </View>
  )
}

export default UserSchool;
