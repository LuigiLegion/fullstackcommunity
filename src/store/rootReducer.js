// Imports
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './reducers/authReducer';
import projectsReducer from './reducers/projectsReducer';
import meetupsReducer from './reducers/meetupsReducer';
import layoutReducer from './reducers/layoutReducer';

// Initializations
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  projects: projectsReducer,
  meetups: meetupsReducer,
  layout: layoutReducer,
});

// Exports
export default rootReducer;
