import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Moment from 'moment';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {Book} from '../customTypes';

import {CommonActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import {
  getDoc,
  getFirestore,
  query,
  collection,
  getDocs,
  doc,
} from 'firebase/firestore';
import {ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

type AssignmentProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
  },
  scrollView: {
    margin: '5%',
  },
  welcomeBack: {
    fontSize: 40,
    marginBottom: '4%',
    color: '#726E6E',
  },
  date: {
    fontSize: 20,
    marginBottom: '4%',
    color: 'black',
    fontWeight: 'bold',
  },

  book: {
    height: 300,
    width: '70%',
    backgroundColor: '#D9D9D9',
    marginBottom: '5%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 50,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookTitle: {
    color: '#726E6E',
    fontSize: 25,
    padding: '5%',
  },
  arrow: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
});

export function AssignmentPage(props: AssignmentProps): React.JSX.Element {
  Moment.locale('en');
  const today = new Date();

  const [chapters, setChapters] = useState<any>([]);

  useEffect(() => {
    var readingSchedules: any[] = [];
    async function getReadingSchedule() {
      const q = query(collection(getFirestore(), 'readingSchedules'));
      const querySnapshot = await getDocs(q);

      await querySnapshot.forEach(async recvDoc => {
        var data = recvDoc.data();
        var bookID = data['bookId'];
        var chapterIDs = data['chapterIds'];

        var docRef = doc(getFirestore(), 'books', bookID);
        var docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          var bookData = docSnap.data();

          chapterIDs.forEach(async (chapter: string) => {
            docRef = doc(getFirestore(), `books/${bookID}/Chapters`, chapter);
            docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const newObj = {
                id: docSnap.id,
                title: bookData['title'],
                author: bookData['author'],
                description: bookData['description'],
                picture_link: bookData['imageUrl'],
                pages: bookData['pages'],
                chapter: docSnap.data(),
                chapterNumber: docSnap.data()['chapterNumber'],
              };
              readingSchedules.push(newObj);
              setChapters(readingSchedules.slice(0));
            }
          });
        }
      });
    }
    getReadingSchedule();
  }, []);
  // console.log(chapters)
  return (
    <SafeAreaView style={styles.view}>
      <Pressable
          style={styles.arrow}
          onPress={() => {
            props.navigation.navigate('LandingScreen');
          }}>
          <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeBack}>Welcome Back!</Text>
        <Text style={styles.date}>{Moment(today).format('MMMM Do, YYYY')}</Text>
        {chapters.map(book => {
          return (
            <TouchableOpacity
              style={[styles.book, styles.shadowProp]}
              onPress={() => {
                // console.log("book");
                // console.log(book);
                props.navigation.navigate('BookMain', {
                  book: book,
                  chapter: book.chapterNumber,
                });
              }}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookTitle}>{book.chapterNumber}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AssignmentPage;
