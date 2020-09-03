// Imports
import axios from 'axios';

import { toggledPreloaderActionCreator } from './layoutReducer';
import { toastNotification } from '../../utils';

// Initial State
const initialState = {
  meetups: [],
  fetchedMeetups: false,
  meetupsFetchingError: null,
};

// Actions Types
const GOT_MEETUPS_SUCCESS = 'GOT_MEETUPS_SUCCESS';
const GOT_MEETUPS_ERROR = 'GOT_MEETUPS_ERROR';

// Action Creators
const gotMeetupsSuccessActionCreator = meetups => ({
  type: GOT_MEETUPS_SUCCESS,
  meetups,
});

const gotMeetupsErrorActionCreator = error => ({
  type: GOT_MEETUPS_ERROR,
  error,
});

// Thunk Creators
export const getMeetupsThunkCreator = () => {
  return async dispatch => {
    try {
      dispatch(toggledPreloaderActionCreator(true));

      const { data } = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://meetup-tracker.herokuapp.com/api/meetups/curated'
      );

      const meetups = data.reduce(
        (acc, group) => [...acc, ...group.meetups],
        []
      );

      dispatch(gotMeetupsSuccessActionCreator(meetups));
      dispatch(toggledPreloaderActionCreator(false));
    } catch (error) {
      console.error(error);
      dispatch(gotMeetupsErrorActionCreator(error));
      dispatch(toggledPreloaderActionCreator(false));
      toastNotification('Error! Unable To Fetch Meetups', 'red');
    }
  };
};

// Reducer
const meetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MEETUPS_SUCCESS:
      return {
        ...state,
        meetups: action.meetups,
        fetchedMeetups: true,
      };

    case GOT_MEETUPS_ERROR:
      console.error('Meetups Fetching Error!', action.error.message);

      return {
        ...state,
        fetchedMeetups: true,
        meetupsFetchingError: action.error.message,
      };

    default:
      return state;
  }
};

export default meetupsReducer;
