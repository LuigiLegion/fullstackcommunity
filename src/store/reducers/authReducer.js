import axios from 'axios';

// Initial State
const initialState = {
  authError: null,
};

// Actions
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

// Action Creators
const signInSuccessActionCreator = userCredentials => ({
  type: SIGN_IN_SUCCESS,
  userCredentials,
});

const signInErrorActionCreator = error => ({
  type: SIGN_IN_ERROR,
  error,
});

const signOutSuccessActionCreator = () => ({
  type: SIGN_OUT_SUCCESS,
});

const signOutErrorActionCreator = () => ({
  type: SIGN_OUT_ERROR,
});

const signUpSuccessActionCreator = newUser => ({
  type: SIGN_UP_SUCCESS,
  newUser,
});

const signUpErrorActionCreator = error => ({
  type: SIGN_UP_ERROR,
  error,
});

// Thunks
export const signInThunkCreator = userCredentials => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();
      await firebase
        .auth()
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        );
      dispatch(signInSuccessActionCreator(userCredentials));
    } catch (error) {
      console.error(error);
      dispatch(signInErrorActionCreator(error));
    }
  };
};

export const signOutThunkCreator = () => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();
      await firebase.auth().signOut();
      dispatch(signOutSuccessActionCreator());

      // console.log('authReducer localStorage pre-clear: ', localStorage);
      localStorage.clear();
      // console.log('authReducer localStorage post-clear: ', localStorage);
    } catch (error) {
      console.error(error);
      dispatch(signOutErrorActionCreator());
    }
  };
};

export const signUpThunkCreator = newUser => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      // console.log('newUser: ', newUser);
      const firebase = getFirebase();
      const firestore = getFirestore();
      const newUserData = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
      const { data } = await axios.get(
        `https://mtaapi.herokuapp.com/stop?id=${newUser.location.id}`
      );
      // console.log('data: ', data);
      const locationGeocode = { lat: +data.result.lat, lon: +data.result.lon };
      await firestore
        .collection('users')
        .doc(newUserData.user.uid)
        .set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0],
          email: newUser.email,
          gender: newUser.gender,
          status: newUser.status,
          company: newUser.company ? newUser.company : null,
          cohort: newUser.cohort,
          program: newUser.program,
          locationName: newUser.location.name,
          locationId: newUser.location.id,
          locationGeocode,
        });
      dispatch(signUpSuccessActionCreator(newUser));
    } catch (error) {
      console.error(error);
      dispatch(signUpErrorActionCreator(error));
    }
  };
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_ERROR:
      console.log('User sign in error: ', action.error);
      return { ...state, authError: 'Sign in failed' };
    case SIGN_IN_SUCCESS:
      console.log('User signed in successfully: ', action.userCredentials);
      return { ...state, authError: null };
    case SIGN_OUT_ERROR:
      console.log('Sign out error!');
      return state;
    case SIGN_OUT_SUCCESS:
      console.log('Signed out successfully');
      return state;
    case SIGN_UP_ERROR:
      console.log('Sign up error!');
      return { ...state, authError: action.error.message };
    case SIGN_UP_SUCCESS:
      console.log('Signed up successfully');
      return { ...state, authError: null };
    default:
      return state;
  }
};

export default authReducer;
