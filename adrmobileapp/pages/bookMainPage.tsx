import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {RootStackParamList} from '../App';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FontLoader from '../components/FontLoader';

import SoundIcon from '../assets/icons/SoundIcon.tsx';
import TriviaIcon from '../assets/icons/TriviaIcon.tsx';
import {Ionicons} from '@expo/vector-icons';

import {
  getDoc,
  getFirestore,
  query,
  collection,
  getDocs,
  doc,
} from 'firebase/firestore';

type routeProp = RouteProp<RootStackParamList, 'BookMain'>;
type navProp = StackNavigationProp<RootStackParamList, 'BookMain'>;

type BookMainPageProps = {
  route: routeProp;
  navigation: navProp;
};

const styles = StyleSheet.create({
  bkg: {
    backgroundColor: 'white',
    height: '100%',
  },
  bookCover: {
    height: 260,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
  },
  bookTitle: {
    fontFamily: 'Chillax',
    fontSize: 50,
    marginLeft: '4%',
    color: '#000000',
    fontWeight: 'bold', // 600 is semibold
    width: '70%',
    marginTop: 20,
  },
  covercontainer: {
    marginBottom: '5%',
    height: 250,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  item: {
    width: 190,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#ABDAF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  shadowPropBlue: {
    shadowColor: '#0071BA',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  iconText: {
    color: '#0071BA', // Color specified
    fontFamily: 'KarlaMedium', // Inter font with Semibold weight
    fontSize: 20, // Font size specified
  },
  chapterInfo: {
    height: 250,
    marginLeft: '2%',
    width: '90%',
    backgroundColor: '#FFFFFF',
    marginBottom: 30,
    padding: '3%',
  },
  chapterText: {
    fontFamily: 'Chillax',
    color: '#33363F', // gray text color
    fontSize: 22,
  },
  descriptionText: {
    fontFamily: 'MontserratMedium',
    color: '#000000', // gray text color
    fontSize: 18,
    marginTop: 15,
  },
  arrow: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
});

export function BookMainPage(props: BookMainPageProps): React.JSX.Element {
  var iconSize = 50;
  const navigation = useNavigation();

  return (
    <View style={styles.bkg}>
      <FontLoader>
        <Pressable
          style={styles.arrow}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
        <View style={[styles.covercontainer, styles.shadowPropBlue]}>
          <Image
            style={styles.bookCover}
            src={props.route.params.book.picture_link}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('BookInfo', {
              book: props.route.params.book,
              chapter: props.route.params.chapter,
            });
          }}>
          <Text style={styles.bookTitle}>{props.route.params.book.title}</Text>
        </TouchableOpacity>

        {/* Need to replace text with Assignment Description (inputted from the school liaison website) */}
        <View style={styles.chapterInfo}>
          <Text style={styles.chapterText}>
            Chapter {props.route.params.chapter} Description
          </Text>
          <Text style={styles.descriptionText}>
            {props.route.params.book.description}
          </Text>
        </View>

        <View style={styles.container}>
          <TouchableOpacity>
            <View style={[styles.item, styles.shadowProp]}>
              <SoundIcon width={iconSize} height={iconSize} color="#0071BA" />
              <Text style={styles.iconText}>audio</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('BookQuiz', {
                book: props.route.params.book,
                chapter: props.route.params.chapter,
                prevScreen: 'BookMain',
              });
            }}>
            <View style={[styles.item, styles.shadowProp]}>
              <TriviaIcon width={iconSize} height={iconSize} color="#0071BA" />
              <Text style={styles.iconText}>trivia</Text>
            </View>
          </TouchableOpacity>
        </View>
      </FontLoader>
    </View>
  );
}

export default BookMainPage;
