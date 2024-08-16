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
} from 'react-native';
import {RootStackParamList} from '../App';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type LandingProps = {
    navigation: NavigationProp<RootStackParamList>;
};

// person-circle-outline
const styles = StyleSheet.create({
  welcome:{
    fontFamily: 'GilroyExtraBold',
    fontSize: 42,
    left: -10,
    top: 20,
  },
  date:{
    fontFamily:'MontserratSemiBold',
    fontSize: 18,
    marginTop: 30,
  },
  container:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  getInvolved:{
    textAlign: 'center',
    color: 'white',
    fontFamily: 'MontserratBold',
    fontSize: 24,
    marginTop: 170,
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  paragraph:{
    textAlign: 'center',
    color: 'white',
    fontFamily: 'MontserratSemiBold',
    fontSize: 14,
    marginTop: 10,
  },
  card:{
    paddingHorizontal: 40,
    height:350,
    width:395,
    borderRadius: 50,
    marginTop: 20,
  },
  donateButton: {
    backgroundColor: '#FFFFFF',
    width: 180,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  donateButtonText: {
    color: '#0071BA',
    fontFamily: 'MontserratSemiBold',
    fontSize: 16,
  },
  assignmentButton: {
    backgroundColor: '#0071BA',
    width: 395,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  assignmentButtonText: {
    color: 'white',
    fontFamily: 'MontserratBold',
    fontSize: 16,
  },
  textContainer: {
    marginRight: 'auto',
    marginLeft: '6%',
  },
  arrow: {
    position: 'absolute',
    right: 25,
    top: -35,
  },
  menu_icon: {
    position: 'absolute',
    left: -315,
    top: 0,
  },
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 35,
  },
  //// menu-outline
});

export function Landing(props: LandingProps): React.JSX.Element {
    Moment.locale('en');
    const today = new Date();
     
    return (
    <SafeAreaView>
        <View style={styles.container}>

        
            <View style={styles.textContainer}>
                <Text style={styles.welcome}>Welcome Back!</Text>
                <Text style={styles.date}>{Moment(today).format('MMMM Do, YYYY')}</Text>
            </View>
            
            <ImageBackground style={styles.card} resizeMode="cover" source={require('../assets/images/homeimg.png')}>
                <Text style={styles.getInvolved}>Get Involved</Text>
                <Text style={styles.paragraph}>If you are a business, foundation, or individual that wants to support this initiative, please contact us.</Text>
                <TouchableOpacity 
                    style={styles.donateButton}
                    onPress={() => {
                        props.navigation.navigate('Donate');
                    }}
                >
                    <Text style={styles.donateButtonText}>Donate</Text>
                </TouchableOpacity>
            </ImageBackground>
            <TouchableOpacity 
                style={styles.assignmentButton}
                onPress={() => {
                    props.navigation.navigate('ToDo');
                }}>
                <Text style={styles.assignmentButtonText}>Jump to Today</Text>
            </TouchableOpacity>
            <Pressable
              style={styles.arrow}
              onPress={() => 
                props.navigation.navigate('UserSettings')
              }>
              <Ionicons name="person-circle-outline" size={40} color="black" />
            </Pressable>
        </View>
    </SafeAreaView>
    );
}

export default Landing;
