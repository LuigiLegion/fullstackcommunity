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

const projectReducer = (state = initialState, action) => {
  return state;
};

export default projectReducer;
