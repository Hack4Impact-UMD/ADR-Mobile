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

import {AntDesign} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

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
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  item: {
    width: '42%',
    height: 150,
    backgroundColor: '#D9D9D9',
    margin: '4%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export function BookMainPage(props: BookMainPageProps): React.JSX.Element {
  var iconSize = 70;
  return (
    <SafeAreaView style={styles.bkg}>
      <View style={[styles.bookCover, styles.shadowProp]}></View>
      <Text style={styles.bookTitle}>{props.route.params.book.title}</Text>

      <View style={styles.container}>
        <TouchableOpacity style={[styles.item, styles.shadowProp]}>
          <AntDesign name="sound" size={iconSize} color="#222222" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, styles.shadowProp]}
          onPress={() => {
            props.navigation.navigate('BookQuiz', {
              book: props.route.params.book,
            });
          }}>
          <MaterialIcons name="quiz" size={iconSize} color="#222222" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, styles.shadowProp]}
          onPress={() => {
            props.navigation.navigate('BookInfo', {
              book: props.route.params.book,
            });
          }}>
          <Feather name="info" size={iconSize} color="#222222" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item, styles.shadowProp]}>
          <Ionicons name="bookmarks-outline" size={iconSize} color="#222222" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default BookMainPage;
