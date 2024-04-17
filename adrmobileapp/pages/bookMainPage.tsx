import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FontLoader from '../components/FontLoader';

import SoundIcon from '../assets/icons/SoundIcon.tsx';
import TriviaIcon from '../assets/icons/TriviaIcon.tsx';

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
    height: 250,
    backgroundColor: '#C4DEEF',
    marginBottom: '5%',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  bookTitle: {
    fontFamily: 'CrimsonPro',
    fontSize: 50,
    marginLeft: '4%',
    marginBottom: '4%',
    color: '#000000',
    fontWeight: 'bold', // 600 is semibold
    width: '70%',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%', // Adjust as needed
  },
  item: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#0071BA',
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  iconText: {
    color: '#0071BA', // Color specified
    fontFamily: 'KarlaMedium', // Inter font with Semibold weight
    fontSize: 28, // Font size specified
    paddingLeft: '5%',
  },
  triviaQuestions: {
    marginTop: 20, // Adjust as needed
  },
  chapterInfo: {
    height: 100,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14, // Adjust as needed
    borderColor: '#0071BA',
    borderWidth: 1.5,
    alignSelf: 'center',
    marginBottom: 30,
    padding: '3%',
  },
  chapterText: {
    fontFamily: 'KarlaMedium',
    fontWeight: '800',
    color: '#000000', // gray text color
    fontSize: 15,
  },
});

export function BookMainPage(props: BookMainPageProps): React.JSX.Element {
  var iconSize = 70;

  return (
    <SafeAreaView style={styles.bkg}>
      <FontLoader>
        <View style={[styles.bookCover, styles.shadowProp]} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('BookInfo', {
              book: props.route.params.book,
            });
          }}>
          <Text style={styles.bookTitle}>{props.route.params.book.title}</Text>
        </TouchableOpacity>

        {/* Need to replace text with Assignment Description (inputted from the school liaison website) */}
        <View style={[styles.chapterInfo, styles.shadowProp]}>
          <Text style={styles.chapterText}>Assignment Description Goes Here</Text>
        </View>

        <View style={styles.container}>
          <TouchableOpacity style={styles.iconContainer}>
            <View style={[styles.item, styles.shadowProp]}>
              <SoundIcon width={iconSize} height={iconSize} color="#FFFFFF" />
            </View>
            <Text style={styles.iconText}>audio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconContainer, styles.triviaQuestions]}
            onPress={() => {
              props.navigation.navigate('BookQuiz', {
                book: props.route.params.book,
                prevScreen: 'BookMain',
              });
            }}>
            <View style={[styles.item, styles.shadowProp]}>
              <TriviaIcon width={iconSize} height={iconSize} color="#FFFFFF" />
            </View>
            <Text style={styles.iconText}>trivia questions</Text>
          </TouchableOpacity>
        </View>
      </FontLoader>
    </SafeAreaView>
  );
}

export default BookMainPage;
