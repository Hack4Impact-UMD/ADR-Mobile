import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type BookMainPageProps = {
  navigation: NavigationProp<RootStackParamList>;
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
      <Text>Ready Player One</Text>

      <View style={styles.container}>
        <TouchableOpacity style={styles.item}>
          <Text>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            props.navigation.navigate('BookQuiz');
          }}>
          <Text>Trivia Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            props.navigation.navigate('BookInfo');
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
