import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import {RootStackParamList} from '../App';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FontLoader from '../components/FontLoader';
import {Ionicons} from '@expo/vector-icons';

type routeProp = RouteProp<RootStackParamList, 'BookInfo'>;
type navProp = StackNavigationProp<RootStackParamList, 'BookInfo'>;

type BookInfoPageProps = {
  route: routeProp;
  navigation: navProp;
};

const styles = StyleSheet.create({
  bookCover: {
    height: 260,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookTitle: {
    fontFamily: 'Chillax',
    fontSize: 50,
    width: '70%',
    color: '#000000',
    marginBottom: '4%',
    marginLeft: '1%',
  },
  bookSubtitle: {
    fontFamily: 'MontserratMedium',
    fontSize: 18,
    marginBottom: '2%',
    color: '#000000',
    marginLeft: '1%',
  },
  scrollView: {
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '5%',
    marginBottom: '10%',
    height: '100%',
    backgroundColor: 'white',
  },
  bkg: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'MontserratMedium',
    marginTop: '2%',
    fontSize: 20,
    marginLeft: '1%',
  },
  covercontainer: {
    marginBottom: '5%',
    height: 250,
  },
  shadowPropBlue: {
    shadowColor: '#0071BA',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  arrow: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
});

export function BookInfoPage(props: BookInfoPageProps): React.JSX.Element {
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <Text style={styles.bookTitle}>{props.route.params.book.title}</Text>
          <Text style={styles.bookSubtitle}>
            {props.route.params.book.author}
          </Text>
          <Text style={styles.bookSubtitle}>
            {props.route.params.book.pages} Pages
          </Text>
          <Text style={styles.text}>{props.route.params.book.description}</Text>
        </ScrollView>
      </FontLoader>
    </View>
  );
}

export default BookInfoPage;
