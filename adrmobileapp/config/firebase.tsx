import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyBH7dOlLD1LQ8HZvRxLq6VdUGwYcSGUYAQ",
  authDomain: "all-district-reads-f4e27.firebaseapp.com",
  projectId: "all-district-reads-f4e27",
  storageBucket: "all-district-reads-f4e27.appspot.com",
  messagingSenderId: "652762895994",
  appId: "1:652762895994:web:c9385f66d3f75f524f0dc3",
  measurementId: "G-NRTXT0YXP6"
};

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};
