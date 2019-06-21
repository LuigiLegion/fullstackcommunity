import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAs0HKr_J4GMUZy3Rf9vbdYxzHu7AC8l0M',
  authDomain: 'fullstack-community.firebaseapp.com',
  databaseURL: 'https://fullstack-community.firebaseio.com',
  projectId: 'fullstack-community',
  storageBucket: 'fullstack-community.appspot.com',
  messagingSenderId: '345263845894',
  appId: '1:345263845894:web:d9497de8ab625c53',
};

firebase.initializeApp(config);

export default firebase;
