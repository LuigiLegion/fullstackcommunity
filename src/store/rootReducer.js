import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './reducers/authReducer';
import projectReducer from './reducers/projectReducer';
import eventsReducer from './reducers/eventsReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  project: projectReducer,
  events: eventsReducer,
});

export default rootReducer;
