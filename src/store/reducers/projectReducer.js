// Initial State
const initialState = {
  projects: [
    { id: '1', title: 'Help me find a study buddy', content: 'Pretty please!' },
    {
      id: '2',
      title:
        'Help me find someone to complain to about my significant other being busy all the time',
      content: 'Would you?',
    },
    { id: '3', title: 'Help me find my dream job', content: 'Anytime now...' },
  ],
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
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();
      await firestore.collection('projects').add({
        ...newProject,
        authorFirstName: 'Doug',
        authorLastName: 'DaPug',
        authorId: 2,
        createdAt: new Date(),
      });
      dispatch(createProjectSuccessActionCreator(newProject));
    } catch (error) {
      console.error(error);
      dispatch(createProjectErrorActionCreator(error));
    }
  };
};

// export const createProjectThunkCreator = project => {
//   return (dispatch, getState, { getFirestore }) => {
//     // make async call to database
//     const firestore = getFirestore();
//     firestore
//       .collection('projects')
//       .add({
//         ...project,
//         authorFirstName: 'Doug',
//         authorLastName: 'DaPug',
//         authorId: 2,
//         createdAt: new Date(),
//       })
//       .then(() => {
//         dispatch(createProjectActionCreator(project));
//       })
//       .catch(error => {
//         dispatch(createProjectErrorActionCreator(error));
//       });
//   };
// };

// Reducer
const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT_ERROR:
      console.log('Create new project error: ', action.error);
      return state;
    case CREATE_PROJECT_SUCCESS:
      console.log('Created new project successfully: ', action.newProject);
      return state;
    default:
      return state;
  }
};

export default projectReducer;
