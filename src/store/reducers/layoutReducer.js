// Initial State
const initialState = {
  isLoading: false,
};

// Action Types
const TOGGLED_PRELOADER = 'TOGGLED_PRELOADER';

// Action Creators
export const toggledPreloaderActionCreator = status => ({
  type: TOGGLED_PRELOADER,
  status,
});

// Reducer
const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLED_PRELOADER:
      return {
        ...state,
        isLoading: action.status,
      };

    default:
      return state;
  }
};

// Exports
export default layoutReducer;
