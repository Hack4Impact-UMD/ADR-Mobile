import React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type routeProp = RouteProp<RootStackParamList, 'BookInfo'>;
type navProp = StackNavigationProp<RootStackParamList, 'BookInfo'>;

type BookInfoPageProps = {
  route: routeProp;
  navigation: navProp;
};

const styles = StyleSheet.create({
  bookCover: {
    height: 250,
    backgroundColor: '#D9D9D9',
    marginBottom: '5%',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookTitle: {
    fontSize: 40,
    marginBottom: '4%',
    color: '#726E6E',
  },
  bookSubtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '2%',
    color: '#000000',
  },
  scrollView: {
    marginLeft: '4%',
    marginRight: '4%',
    height: '100%',
    backgroundColor: 'white',
  },
  bkg: {
    backgroundColor: 'white',
  },
  text: {
    marginTop: '2%',
    fontSize: 20,
  },
});

export function BookInfoPage(props: BookInfoPageProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.bkg}>
      <View style={[styles.bookCover, styles.shadowProp]}></View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.bookTitle}>{props.route.params.book.title}</Text>
        <Text style={styles.bookSubtitle}>
          {props.route.params.book.author}
        </Text>
        <Text style={styles.bookSubtitle}>
          {props.route.params.book.pages} pages
        </Text>
        <Text style={styles.text}>{props.route.params.book.info}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookInfoPage;
