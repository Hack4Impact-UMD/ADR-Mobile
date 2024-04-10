import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

type routeProp = RouteProp<RootStackParamList, 'BookInfo'>;
type navProp = StackNavigationProp<RootStackParamList, 'BookInfo'>;

type BookInfoPageProps = {
  route: routeProp;
  navigation: navProp;
};

const styles = StyleSheet.create({
  bookCover: {
    height: 250,
    backgroundColor: '#C4DEEF',
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
    fontFamily: 'CrimsonPro',
    fontSize: 50,
    width: '70%',
    marginBottom: '4%',
    color: '#000000',
  },
  bookSubtitle: {
    fontFamily: 'Karla',
    fontSize: 20,
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
    fontFamily: 'Karla-Medium',
    marginTop: '2%',
    fontSize: 25,
  },
});

export function BookInfoPage(props: BookInfoPageProps): React.JSX.Element {
  const [fontsLoaded, fontError] = useFonts({
    CrimsonPro: require('../assets/fonts/CrimsonPro-VariableFont_wght.ttf'),
    Karla: require('../assets/fonts/Karla-VariableFont_wght.ttf'),
    'Karla-Bold': require('../assets/fonts/Karla-Bold.ttf'),
    'Karla-Medium': require('../assets/fonts/Karla-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

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
          {props.route.params.book.page_number} pages
        </Text>
        <Text style={styles.text}>{props.route.params.book.info}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookInfoPage;
