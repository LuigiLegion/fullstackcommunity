// Initial State
const initialState = {
  authError: null,
};

// Actions
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';

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
    } catch (error) {
      console.error(error);
      dispatch(signOutErrorActionCreator());
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
    default:
      return state;
  }
};

export default authReducer;
