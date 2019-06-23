// Initial State
const initialState = {
  creationError: null,
};

// Actions
const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
const CREATE_PROJECT_ERROR = 'CREATE_PROJECT_ERROR';

// Action Creators
export const createProjectSuccessActionCreator = newProject => ({
  type: CREATE_PROJECT_SUCCESS,
  newProject,
});

export const createProjectErrorActionCreator = error => ({
  type: CREATE_PROJECT_ERROR,
  error,
});

// Thunk Creators
export const createProjectThunkCreator = newProject => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      const curAuthorProfile = getState().firebase.profile;
      const curAuthorId = getState().firebase.auth.uid;
      await firestore.collection('projects').add({
        ...newProject,
        authorFirstName: curAuthorProfile.firstName,
        authorLastName: curAuthorProfile.lastName,
        authorEmail: curAuthorProfile.email,
        authorId: curAuthorId,
        createdAt: new Date(),
      });
      dispatch(createProjectSuccessActionCreator(newProject));
    } catch (error) {
      console.error(error);
      dispatch(createProjectErrorActionCreator(error));
    }
  };
};

// Reducer
const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT_ERROR:
      console.log('Create new project error: ', action.error);
      return { ...state, creationError: action.error };
    case CREATE_PROJECT_SUCCESS:
      console.log('Created new project successfully: ', action.newProject);
      return { ...state, creationError: null };
    default:
      return state;
  }
};

export default projectReducer;
