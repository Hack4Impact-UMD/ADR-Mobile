/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  AppRegistry,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {initializeFirebase, registerApp} from './config/firebase';
import {name as adrmobileapp} from './app.json';
import {registerRootComponent} from 'expo';
import {Login} from './pages/login';
import {Landing} from './pages/landing';
import HomePage from './pages/NavigatorOnceLoggedIn';
import {BookMainPage} from './pages/bookMainPage';
import {BookInfoPage} from './pages/bookInfoPage';
import {BookTriviaQuizPage} from './pages/bookTriviaQuizPage';
import {BookTriviaQuizQuestions} from './pages/bookTriviaQuizQuestions.tsx';
import {PreSurvey} from './pages/presurveys';
import {PostSurvey} from './pages/postsurveys';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationScreen from './pages/register.tsx';
import SecondRegistrationScreen from './pages/register2.tsx';
import {Book} from './customTypes';
import {Chapter} from './customTypes';
import {AssignmentPage} from './pages/assignmentPage';
import {DonatePage} from './pages/donatePage';
import { ToDoScreen } from './pages/toDoPage.tsx';
import UserSettings from './pages/userSettings.tsx';
import UserName from './pages/namePage.tsx';
import UserEmail from './pages/userEmail.tsx';
import UserSchool from './pages/userSchool.tsx';
import UserPassword from './pages/userPassword.tsx';
import UserChildren from './pages/userNumChildren.tsx';
import UserDistrict from './pages/districtPage.tsx';
import { AuthProvider } from './components/AuthProvider.tsx';

// Initialize Firebase
initializeFirebase();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// defining the screens and their corresponding parameters
export type RootStackParamList = {
  HomeScreen: undefined;
  RegistrationScreen: undefined;
  SecondRegistrationScreen: {name: string; email: string};
  BookMain: {book: Book; chapter: Chapter; taskId: string;};
  BookQuiz: {book: Book; question?: number; prevScreen?: string; chapter: Chapter; taskId: string;};
  BookQuizQuestions: {book: Book; question: number; questionSet: any; chapter: Chapter; taskId: string;};
  BookInfo: {book: Book, chapter: number};
  Assignments: undefined;
  LandingScreen: undefined;
  Donate: undefined;
  PreSurvey: {surveyId: string};
  ToDo: undefined;
  UserSettings: undefined;
  UserName: undefined;
  UserEmail: undefined;
  UserSchool: undefined;
  UserPassword: undefined;
  UserChildren: undefined;
  UserDistrict: undefined;
};

// used for page navigation
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#FFFFFF',
  };

  return (
    <View style={[backgroundStyle, {height: '100%', position: 'relative'}]}>
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Login navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

const AssignmentScreen = ({route, navigation}) => {
  return <AssignmentPage navigation={navigation} route={route} />;
};

const ToDoPage = ({route, navigation}) => {
  return <ToDoScreen navigation={navigation} route={route} />;
}

const BookMainScreen = ({route, navigation}) => {
  return <BookMainPage navigation={navigation} route={route} />;
};

const BookInfoScreen = ({route, navigation}) => {
  return <BookInfoPage navigation={navigation} route={route} />;
};

const BookQuizScreen = ({route, navigation}) => {
  return <BookTriviaQuizPage navigation={navigation} route={route} />;
};

const BookQuizQuestionsScreen = ({route, navigation}) => {
  return <BookTriviaQuizQuestions navigation={navigation} route={route} />;
};

const LandingScreen = ({route, navigation}) => {
  return <Landing navigation={navigation} route={route} />;
};

const DonateScreen = ({route, navigation}) => {
  return <DonatePage navigation={navigation} route={route} />;
};

//UserName

// create app
function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SecondRegistrationScreen"
            component={SecondRegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="LandingScreen" 
            component={HomePage} 
            options={{headerShown: false}}
          />
          <Stack.Screen name="ToDo" 
            component={ToDoPage} 
            options={{headerShown: false}}
          />
          <Stack.Screen name="Assignments" 
            component={AssignmentPage} 
            options={{headerShown: false}}
          />
          <Stack.Screen name="BookMain" 
            component={BookMainScreen} 
            options={{headerShown: false}}
          />
          <Stack.Screen name="BookInfo" 
            component={BookInfoScreen} 
            options={{headerShown: false}}
          />
          <Stack.Screen name="BookQuiz" 
            component={BookQuizScreen} 
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BookQuizQuestions"
            component={BookQuizQuestionsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Donate"
            component={DonatePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserSettings"
            component={UserSettings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PreSurvey"
            component={PreSurvey}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PostSurvey"
            component={PostSurvey}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserName"
            component={UserName}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserEmail"
            component={UserEmail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserSchool"
            component={UserSchool}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserPassword"
            component={UserPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserChildren"
            component={UserChildren}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserDistrict"
            component={UserDistrict}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
//UserDistrict
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

AppRegistry.registerComponent('adrmobileapp', () => App);
registerRootComponent(App);

export default App;
