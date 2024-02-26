import React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type BookInfoPageProps = {
  navigation: NavigationProp<RootStackParamList>;
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
      <Text>Ready Player One</Text>
      <Text>Ernest Cline</Text>
      <Text>386 pages</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookInfoPage;
