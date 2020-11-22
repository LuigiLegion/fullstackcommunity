// Imports
import axios from 'axios';

import { toggledPreloaderActionCreator } from './layoutReducer';

// Initial State
const initialState = {
  signUpError: null,
  signInError: null,
  signOutError: null,
};

// Actions Types
const SIGNED_UP_SUCCESS = 'SIGNED_UP_SUCCESS';
const SIGNED_UP_ERROR = 'SIGNED_UP_ERROR';
const SIGNED_IN_SUCCESS = 'SIGNED_IN_SUCCESS';
const SIGNED_IN_ERROR = 'SIGNED_IN_ERROR';
const SIGNED_OUT_SUCCESS = 'SIGNED_OUT_SUCCESS';
const SIGNED_OUT_ERROR = 'SIGNED_OUT_ERROR';

// Action Creators
const signedUpSuccessActionCreator = () => ({
  type: SIGNED_UP_SUCCESS,
});

const signedUpErrorActionCreator = error => ({
  type: SIGNED_UP_ERROR,
  error,
});

const signedInSuccessActionCreator = () => ({
  type: SIGNED_IN_SUCCESS,
});

const signedInErrorActionCreator = error => ({
  type: SIGNED_IN_ERROR,
  error,
});

const signedOutSuccessActionCreator = () => ({
  type: SIGNED_OUT_SUCCESS,
});

const signedOutErrorActionCreator = error => ({
  type: SIGNED_OUT_ERROR,
  error,
});

// Thunk Creators
export const signUpThunkCreator = newUser => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(toggledPreloaderActionCreator(true));

      const firebase = getFirebase();
      const firestore = getFirestore();

      const newUserData = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);

      const { data } = await axios.get(
        `https://mtaapi.herokuapp.com/stop?id=${newUser.location.id}`
      );

      const locationGeocode = {
        lat: Number(data.result.lat),
        lon: Number(data.result.lon),
      };

      await firestore
        .collection('users')
        .doc(newUserData.user.uid)
        .set({
          email: newUser.email,
          githubUsername: newUser.githubUsername,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          gender: newUser.gender,
          status: newUser.status,
          company: newUser.company ? newUser.company : null,
          cohort: newUser.cohort,
          program: newUser.program,
          locationName: newUser.location.name,
          locationId: newUser.location.id,
          locationGeocode,
        });

      dispatch(signedUpSuccessActionCreator());
    } catch (error) {
      console.error(error);
      dispatch(signedUpErrorActionCreator(error));
    } finally {
      dispatch(toggledPreloaderActionCreator(false));
    }
  };
};

export const signInThunkCreator = userCredentials => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      dispatch(toggledPreloaderActionCreator(true));

      const firebase = getFirebase();

      await firebase
        .auth()
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        );

      dispatch(signedInSuccessActionCreator());
    } catch (error) {
      console.error(error);
      dispatch(signedInErrorActionCreator(error));
    } finally {
      dispatch(toggledPreloaderActionCreator(false));
    }
  };
};

export const signOutThunkCreator = () => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      dispatch(toggledPreloaderActionCreator(true));

      const firebase = getFirebase();

      await firebase.auth().signOut();

      dispatch(signedOutSuccessActionCreator());
    } catch (error) {
      console.error(error);
      dispatch(signedOutErrorActionCreator(error));
    } finally {
      dispatch(toggledPreloaderActionCreator(false));
    }
  };
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNED_UP_SUCCESS:
      return {
        ...state,
        signUpError: null,
      };

    case SIGNED_UP_ERROR:
      console.error('Sign up error!', action.error.message);
      return {
        ...state,
        signUpError: action.error.message,
      };

    case SIGNED_IN_SUCCESS:
      return {
        ...state,
        signInError: null,
      };

    case SIGNED_IN_ERROR:
      console.error('Sign in error!', action.error.message);
      return {
        ...state,
        signInError: action.error.message,
      };

    case SIGNED_OUT_SUCCESS:
      return {
        ...state,
        signOutError: null,
      };

    case SIGNED_OUT_ERROR:
      console.error('Sign out error!', action.error.message);
      return {
        ...state,
        signOutError: action.error.message,
      };

    default:
      return state;
  }
};

// Exports
export default authReducer;
