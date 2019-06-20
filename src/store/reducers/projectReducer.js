import axios from 'axios';

// Initial State
const initialState = {
  projects: [
    { id: '1', title: 'Help me find a study buddy', content: 'Pretty please!' },
    {
      id: '2',
      title: 'Help me find someone to complain about my significant other to',
      content: 'Would you?',
    },
    { id: '3', title: 'Help me find a job', content: 'Anytime now...' },
  ],
};

// Actions
const CREATE_PROJECT = 'CREATE_PROJECT';

// Action Creators
export const createProjectActionCreator = newProject => ({
  type: CREATE_PROJECT,
  newProject,
});

// Thunk Creators
export const createProjectThunkCreator = projectData => {
  return async (dispatch, { getFirebase, getFirestore }) => {
    try {
      // const { data } = await axios.post('/', projectData);
      dispatch(createProjectActionCreator(projectData));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      console.log('created project', action.newProject);
      return state;
    default:
      return state;
  }
};

export default projectReducer;
