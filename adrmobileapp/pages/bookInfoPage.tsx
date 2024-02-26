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
    height: 200,
    backgroundColor: 'white',
    marginBottom: '5%',
  },
  scrollView: {
    margin: '2%',
  },
  text: {
    fontSize: 42,
  },
});

export function BookInfoPage(props: BookInfoPageProps): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.bookCover}></View>
      <Text>{props.route.params.book.title}</Text>
      <Text>{props.route.params.book.author}</Text>
      <Text>{props.route.params.book.page_number} pages</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.text}>{props.route.params.book.info}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookInfoPage;
