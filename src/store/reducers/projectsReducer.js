// Imports
import { toggledPreloaderActionCreator } from './layoutReducer';
import { toastNotificationGenerator } from '../../helpers';

// Initial State
const initialState = {
  projectCreationError: null,
};

// Action Types
const CREATED_PROJECT_SUCCESS = 'CREATED_PROJECT_SUCCESS';
const CREATED_PROJECT_ERROR = 'CREATED_PROJECT_ERROR';

// Action Creators
const createdProjectSuccessActionCreator = project => ({
  type: CREATED_PROJECT_SUCCESS,
  project,
});

const createdProjectErrorActionCreator = error => ({
  type: CREATED_PROJECT_ERROR,
  error,
});

// Thunk Creators
export const createProjectThunkCreator = project => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      dispatch(toggledPreloaderActionCreator(true));

      const firestore = getFirestore();

      const curAuthorProfile = getState().firebase.profile;
      const curAuthorId = getState().firebase.auth.uid;

      await firestore.collection('projects').add({
        ...project,
        authorFirstName: curAuthorProfile.firstName,
        authorLastName: curAuthorProfile.lastName,
        authorEmail: curAuthorProfile.email,
        authorId: curAuthorId,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      dispatch(createdProjectSuccessActionCreator(project));
      dispatch(toggledPreloaderActionCreator(false));

      toastNotificationGenerator('New Project Created Successfully', 'green');
    } catch (error) {
      console.error(error);
      dispatch(createdProjectErrorActionCreator(error));
      dispatch(toggledPreloaderActionCreator(false));
    }
  };
};

// Reducer
const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATED_PROJECT_ERROR:
      console.error('Project creation error!', action.error);
      return {
        ...state,
        projectCreationError: action.error,
      };

    case CREATED_PROJECT_SUCCESS:
      return {
        ...state,
        projectCreationError: null,
      };

    default:
      return state;
  }
};

export default projectsReducer;
