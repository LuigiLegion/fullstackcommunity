import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './reducers/authReducer';
import projectReducer from './reducers/projectReducer';
import meetupsReducer from './reducers/meetupsReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  project: projectReducer,
  meetups: meetupsReducer,
});

export default rootReducer;
