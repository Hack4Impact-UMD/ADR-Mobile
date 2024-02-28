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

type routeProp = RouteProp<RootStackParamList, 'BookMain'>;
type navProp = StackNavigationProp<RootStackParamList, 'BookMain'>;

type BookMainPageProps = {
  route: routeProp;
  navigation: navProp;
};

const styles = StyleSheet.create({
  bookCover: {
    height: 200,
    backgroundColor: 'white',
    marginBottom: '5%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    width: '44%',
    height: 100,
    backgroundColor: 'white',
    margin: '3%',
  },
});

export function BookMainPage(props: BookMainPageProps): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.bookCover}></View>
      <Text>{props.route.params.book.title}</Text>

      <View style={styles.container}>
        <TouchableOpacity style={styles.item}>
          <Text>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            props.navigation.navigate('BookQuiz', {
              book: props.route.params.book,
            });
          }}>
          <Text>Trivia Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            props.navigation.navigate('BookInfo', {
              book: props.route.params.book,
            });
          }}>
          <Text>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text>Bookmark</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default BookMainPage;
