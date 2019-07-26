import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import authReducer from './authReducer';
import projectReducer from './projectReducer';
import eventsReducer from './eventsReducer';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  project: projectReducer,
  events: eventsReducer,
});

export default rootReducer;
