import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable, SafeAreaView, Image} from 'react-native';
import {RootStackParamList} from '../App';

import {RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontLoader from '../components/FontLoader';



import {
  getDoc,
  getFirestore,
  query,
  collection,
  getDocs,
  doc,
  setDoc,
  where,
} from 'firebase/firestore';
import { useAuth } from '../components/AuthProvider';

type routeProp = RouteProp<RootStackParamList, 'BookQuiz'>;
type navProp = StackNavigationProp<RootStackParamList, 'BookQuiz'>;

type BookTriviaQuizPageProps = {
  route: routeProp;
  navigation: navProp;
};

const styles = StyleSheet.create({
  bkg: {
    backgroundColor: 'white',
    height: '100%',
  },
  bookCover: {
    height: 260,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
  },
  bookTitle: {
    fontFamily: 'Chillax',
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: '4%',
    marginRight: '5%',
    color: '#000000',
    marginTop: 20,
  },
  subTitle: {
    fontFamily: 'Chillax',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '4%',
    marginRight: '5%',
    color: '#000000',
  },
  subText: {
    fontFamily: 'KarlaMedium',
    fontSize: 25,
    color: 'black',
    lineHeight: 50,
  },
  content: {
    marginLeft: '4%',
  },
  covercontainer: {
    marginBottom: '5%',
    height: 250,
  },
  progress: {
    marginLeft: '4%',
    marginTop: '5%',
  },
  btn: {
    borderRadius: 33,
    backgroundColor: '#D9D9D9',
    paddingVertical: 25,
    width: 190,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
  },

  clearBtn: {
    borderRadius: 33,
    backgroundColor: '#C4DEEF',
    paddingVertical: 15,
    width: 120,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
    marginTop: '5%',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end', // Center vertically
    alignItems: 'center', // Center horizontally
    marginBottom: '15%',
  },
  arrow: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
  shadowPropBlue: {
    shadowColor: '#0071BA',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

export function BookTriviaQuizPage(
  props: BookTriviaQuizPageProps,
): React.JSX.Element {
  const key = `question_${props.route.params.book.title}_${props.route.params.chapter.chapterNum}`;
  const [question, setQuestion] = useState(0);
  const [questionSet, setQuestionSet] = useState({});
  const [answer, setAnswer] = useState(0);
  const [answerSet, setAnswerSet] = useState({});

  const context = useAuth();
  const userId = context.user.uid;
  const firestore = getFirestore();

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(key, question.toString());
      // console.log('Question successfully saved to storage: ' + question);
    } catch (e) {
      console.log('Failed to save the question to the storage');
    }
  };

  const readData = async () => {
    try {
      if (
        props.route.params.prevScreen == 'BookQuizQuestions' &&
        props.route.params.question != null
      ) {
        await AsyncStorage.setItem(key, props.route.params.question.toString());
        // console.log(
        //   'Question in storage is set to: ' + props.route.params.question,
        // );

        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setQuestion(parseInt(value));
          // console.log('Question state is set to ' + value);
        }
      } else if (props.route.params.prevScreen == 'BookMain') {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setQuestion(parseInt(value));
          // console.log('Question state is set to ' + value);
        } else {
          console.log('Value was null');
        }
      }
    } catch (e) {
      console.log('Failed to read the async storage.');
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(key);  // Use removeItem to clear specific key
      setQuestion(0);
      console.log('Storage successfully cleared!');
      // props.navigation.navigate('BookMain', {
      //   book: props.route.params.book,
      //   chapter: props.route.params.chapter,
      // });
      navigation.goBack();
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    // console.log('Called screen');
    if (isFocused) {
      readData();
    }
  }, [isFocused]);

  var questions = {};

  useEffect(() => {
    async function getQuestionSet() {
      // const questionIDs = props.route.params.book.chapter.questionIds;
      // var counter: number = 1;
      // questionIDs.map(async id => {
      //   var docRef = doc(getFirestore(), 'questions', id);
      //   var docSnap = await getDoc(docRef);
      //   if (docSnap.exists()) {
      //     questions[counter] = docSnap.data()['text'];
      //     counter += 1;
      //     setQuestionSet({...questions});
      //   }
      // });
      setQuestionSet(props.route.params.chapter.questions);
      setAnswerSet(props.route.params.chapter.answers);
    }
    getQuestionSet();
  }, []);

  

  const maxQuestions = Object.keys(questionSet).length;

  let progressPercentage = 0;
  if (maxQuestions > 0) {
    progressPercentage = question / maxQuestions;
  }

  if (
    isNaN(progressPercentage) ||
    progressPercentage < 0 ||
    progressPercentage > 1
  ) {
    progressPercentage = 0;
  }
  // console.log(props.route.params.chapter)
  
  const navigation = useNavigation();


  async function submitFromQuiz() {
    const taskId = props.route.params.taskId;
    const docRef = doc(firestore, "users", userId, "tasks", taskId);
    try {
      await setDoc(docRef, { completed: true }, { merge: true });
      console.log("Quiz marked as complete:", taskId);
      
      // Fetch the corresponding reading assignment
      const taskRef = doc(firestore, "users", userId, "tasks", taskId);
      const docSnap = await getDoc(taskRef);
      if(docSnap.exists()) {
        const bookId = docSnap.data().bookId;
        const chapterId = docSnap.data().chapterId;

        // Fetch the corresponding reading assignment
        const tasksRef2 = collection(firestore, "users", userId, "tasks");
        const q = query(tasksRef2, where("taskType", "==", "read"), where("bookId", "==", bookId), where("chapterId", "==", chapterId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          // Update each reading assignment to mark it as complete
          const readDocRef = doc.ref;
          await setDoc(readDocRef, { completed: true }, { merge: true });
          console.log("Reading assignment marked as complete:", readDocRef.id);
        });
      }
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  }

  async function submitFromReading() {
    const taskId = props.route.params.taskId;
    const docRef = doc(firestore, "users", userId, "tasks", taskId);
    try {
      await setDoc(docRef, { completed: true }, { merge: true });
      console.log("Reading marked as complete:", taskId);
      
      // Fetch the corresponding Quiz assignment
      const taskRef = doc(firestore, "users", userId, "tasks", taskId);
      const docSnap = await getDoc(taskRef);
      if(docSnap.exists()) {
        const bookId = docSnap.data().bookId;
        const chapterId = docSnap.data().chapterId;

        const tasksRef2 = collection(firestore, "users", userId, "tasks");
        const q = query(tasksRef2, where("taskType", "==", "quiz"), where("bookId", "==", bookId), where("chapterId", "==", chapterId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          const readDocRef = doc.ref;
          await setDoc(readDocRef, { completed: true }, { merge: true });
          console.log("Quiz assignment marked as complete:", readDocRef.id);
        });
      }
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  }

  return (
    <View style={styles.bkg}>
    <FontLoader>
      <View style={[styles.covercontainer, styles.shadowPropBlue]}>
        <Image style={styles.bookCover} src={props.route.params.book.picture_link}/>
      </View>
      <View>
        <Text style={styles.bookTitle}>
          {props.route.params.book.title}
        </Text>
        <Text style={styles.subTitle}>
          Chapter {props.route.params.chapter.chapterNum} Quiz
        </Text>
      </View>
      <Pressable
        style={styles.arrow}
        onPress={() => {
          saveData();
          navigation.goBack();
        }}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </Pressable>

      <View style={styles.progress}>
        <Text
          style={[
            styles.subText,
            {color: progressPercentage === 1 ? '#0071BA' : '#000000'},
          ]}>
          Progress {"\n"}{question}/{maxQuestions}
        </Text>
        <Progress.Bar
          progress={progressPercentage}
          // borderColor={'#FFFFFF'}
          borderRadius={25}
          borderWidth={0}
          height={50}
          width={395}
          color={'#0071BA'}
          unfilledColor={'#ABDAF9'}
          style={styles.shadowProp}
        />
      </View>

      <View style={styles.buttonView}>
        <Pressable
          style={[
            styles.btn,
            {backgroundColor: '#0071BA'},
          ]}
          onPress={async () => {
            if (progressPercentage < 1) {
              if (question != undefined) {
                props.navigation.navigate('BookQuizQuestions', {
                  book: props.route.params.book,
                  question: question,
                  questionSet: questionSet,
                  answerSet: answerSet,
                  chapter: props.route.params.chapter,
                  taskId: props.route.params.taskId,
                });
              } else {
                props.navigation.navigate('BookQuizQuestions', {
                  book: props.route.params.book,
                  question: 1,
                  questionSet: questionSet,
                  answerSet: answerSet,
                  chapter: props.route.params.chapter,
                  taskId: props.route.params.taskId,
                });
              }
            } else {
              const taskId = props.route.params.taskId;
              const docRef = doc(firestore, "users", userId, "tasks", taskId);
              const docSnap = await getDoc(docRef);
              if(docSnap.exists()) {
                const taskType = docSnap.data().taskType;

                if(taskType === "quiz") {
                  console.log('called')
                  await submitFromQuiz();
                } else {
                  console.log('called2')
                  await submitFromReading();
                }
              }
              navigation.goBack();
            }
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 23,
              color: '#FFFFFF',
              fontFamily: 'KarlaBold',
            }}>
            {progressPercentage >= 1
              ? 'Finish'
              : progressPercentage > 0
              ? 'Continue  >'
              : 'Begin Now  >'}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.clearBtn]}
          onPress={() => {
            clearStorage();
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: '#0071BA',
              fontFamily: 'KarlaBold',
            }}>
            Clear Storage
          </Text>
        </Pressable>
      </View>
      </FontLoader>
    </View>
  );
}

export default BookTriviaQuizPage;