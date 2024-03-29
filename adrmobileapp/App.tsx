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
import HomePage from './pages/NavigatorOnceLoggedIn';
import {BookMainPage} from './pages/bookMainPage';
import {BookInfoPage} from './pages/bookInfoPage';
import {BookTriviaQuizPage} from './pages/bookTriviaQuizPage';
import {PreSurvey} from './pages/presurveys';
import {PostSurvey} from './pages/postsurveys';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationScreen from './pages/register.tsx';
import SecondRegistrationScreen from './pages/register2.tsx';
import {Book} from './customTypes';

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
  BookMain: {book: Book};
  BookQuiz: {book: Book};
  BookInfo: {book: Book};
  Assignments: undefined;
};

// used for page navigation
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {/* <FirebaseAuthRegisterPrototype /> */}
          <Login navigation={navigation} />

          {/* Delete once login and registration screens are completed */}
          {/* <Button
            title="Go To Assignments Prototype"
            onPress={() => navigation.navigate('Assignments')}
          /> */}
          <PreSurvey />
          <PostSurvey />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AssignmentScreen = ({route, navigation}) => {
  return <AssignmentPage navigation={navigation} route={route} />;
};

const BookMainScreen = ({route, navigation}) => {
  return <BookMainPage navigation={navigation} route={route} />;
};

const BookInfoScreen = ({route, navigation}) => {
  return <BookInfoPage navigation={navigation} route={route} />;
};

const BookQuizScreen = ({route, navigation}) => {
  return <BookTriviaQuizPage navigation={navigation} route={route} />;
};

// create app
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{title: 'Register Here'}}
        />
        <Stack.Screen
          name="SecondRegistrationScreen"
          component={SecondRegistrationScreen}
          options={{title: 'Continue Registration'}}
        />
        <Stack.Screen name="Assignments" component={HomePage} />
        <Stack.Screen name="BookMain" component={BookMainScreen} />
        <Stack.Screen name="BookInfo" component={BookInfoScreen} />
        <Stack.Screen name="BookQuiz" component={BookQuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
