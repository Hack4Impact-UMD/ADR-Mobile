import React from 'react';
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
    backgroundColor: '#D9D9D9',
    marginBottom: '5%',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },

  bookTitle: {
    fontSize: 40,
    marginLeft: '4%',
    marginBottom: '4%',
    color: '#726E6E',
    fontWeight: '600', // 600 is semibold
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
    backgroundColor: '#D9D9D9',
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
    color: '#726E6E', // Color specified
    fontFamily: 'Inter-SemiBold', // Inter font with Semibold weight
    fontSize: 28, // Font size specified
    fontWeight: '600', // 600 is semibold
    paddingLeft: '5%',
  },
  triviaQuestions: {
    marginTop: 20, // Adjust as needed
  },
  chapterInfo: {
    height: 100,
    width: '70%',
    backgroundColor: '#D9D9D9',
    borderRadius: 14, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  chapterText: {
    color: '#333', // gray text color
    fontWeight: 'bold', // bold font weight
  },
});

export function BookMainPage(props: BookMainPageProps): React.JSX.Element {
  var iconSize = 70;
  return (
    <SafeAreaView style={styles.bkg}>
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
            <SoundIcon width={iconSize} height={iconSize} color="#222222" />
          </View>
          <Text style={styles.iconText}>audio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconContainer, styles.triviaQuestions]}
          onPress={() => {
            props.navigation.navigate('BookQuiz', {
              book: props.route.params.book,
            });
          }}>
          <View style={[styles.item, styles.shadowProp]}>
            <TriviaIcon width={iconSize} height={iconSize} color="#222222" />
          </View>
          <Text style={styles.iconText}>trivia questions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default BookMainPage;
