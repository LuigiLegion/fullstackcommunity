// Initial State
const initialState = {
  authError: null,
};

// Actions
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

// Action Creators
const signInSuccessActionCreator = userCredentials => ({
  type: SIGN_IN_SUCCESS,
  userCredentials,
});

const signInErrorActionCreator = error => ({
  type: SIGN_IN_ERROR,
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

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_ERROR:
      console.log('User sign in error: ', action.error);
      return { ...state, authError: 'Sign in failed' };
    case SIGN_IN_SUCCESS:
      console.log('User signed in successfully: ', action.userCredentials);
      return { ...state, authError: null };
    default:
      return state;
  }
};

export default authReducer;
