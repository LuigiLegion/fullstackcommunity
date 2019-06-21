import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  auth: authReducer,
  project: projectReducer,
});

export default rootReducer;
