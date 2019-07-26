import axios from 'axios';

// Initial State
const initialState = {
  allEvents: [],
};

// Actions
const GOT_EVENTS = 'GOT_EVENTS';

// Action Creators
export const gotEventsActionCreator = events => ({
  type: GOT_EVENTS,
  events,
});

// Thunk Creators
export const getEventsThunkCreator = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=31377401&page=20'
      );
      // console.log('eventReducer data.results: ', data.results);
      dispatch(gotEventsActionCreator(data.results));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_EVENTS:
      // console.log('Fetched meetups successfully in the reducer');
      return { ...state, allEvents: action.events };
    default:
      return state;
  }
};

export default eventsReducer;
