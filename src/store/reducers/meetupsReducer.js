// Imports
import axios from 'axios';

import { toggledPreloaderActionCreator } from './layoutReducer';
import { toastNotificationGenerator } from '../../helpers';

// Initial State
const initialState = {
  groupMeetups: [],
  allMeetups: [],
  fetchedMeetups: false,
  meetupsFetchingError: null,
};

// Actions Types
const GOT_MEETUPS_SUCCESS = 'GOT_MEETUPS_SUCCESS';
const GOT_MEETUPS_ERROR = 'GOT_MEETUPS_ERROR';

// Action Creators
const gotMeetupsSuccessActionCreator = (groupMeetups, allMeetups) => ({
  type: GOT_MEETUPS_SUCCESS,
  groupMeetups,
  allMeetups,
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

      // // Meetup group with no upcoming meetups for testing purposes:
      // const starWarsNycMeetups = await axios.get(
      //   'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=148015&page=20'
      // );
      // const allMeetupsData = [...starWarsNycMeetups.data.results];
      // dispatch(gotMeetupsActionCreator(allMeetupsData));

      // Meetup groups with future meetups:
      const nycCodersMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=31377401&page=20'
      );
      const bootcampersAnonymousMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=19344391&page=20'
      );
      const reactNycMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=22884788&page=20'
      );
      const useReactNycMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=31543338&page=20'
      );
      const vueNycMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=23275212&page=20'
      );
      const graphqlNycMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=24714233&page=20'
      );
      // const mongodbNycMeetups = await axios.get(
      //   'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=1629296&page=20'
      // );

      const groupMeetups = [
        {
          name: 'NYC Coders',
          meetups: [...nycCodersMeetups.data.results],
        },
        {
          name: 'Bootcampers Anonymous',
          meetups: [...bootcampersAnonymousMeetups.data.results],
        },
        {
          name: 'React NYC',
          meetups: [...reactNycMeetups.data.results],
        },
        {
          name: 'useReactNYC',
          meetups: [...useReactNycMeetups.data.results],
        },
        {
          name: 'Vue NYC',
          meetups: [...vueNycMeetups.data.results],
        },
        {
          name: 'GraphQL NYC',
          meetups: [...graphqlNycMeetups.data.results],
        },
        // {
        //   name: 'MongoDB NYC',
        //   meetups: [...mongodbNycMeetups.data.results],
        // },
      ];

      const allMeetups = [
        ...nycCodersMeetups.data.results,
        ...bootcampersAnonymousMeetups.data.results,
        ...reactNycMeetups.data.results,
        ...useReactNycMeetups.data.results,
        ...vueNycMeetups.data.results,
        // ...mongodbNycMeetups.data.results,
      ];

      dispatch(gotMeetupsSuccessActionCreator(groupMeetups, allMeetups));
      dispatch(toggledPreloaderActionCreator(false));
    } catch (error) {
      console.error(error);
      dispatch(gotMeetupsErrorActionCreator(error));
      dispatch(toggledPreloaderActionCreator(false));
      toastNotificationGenerator('Error! Unable To Fetch Meetups', 'red');
    }
  };
};

// Reducer
const meetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MEETUPS_SUCCESS:
      return {
        ...state,
        groupMeetups: action.groupMeetups,
        allMeetups: action.allMeetups,
        fetchedMeetups: true,
      };

    case GOT_MEETUPS_ERROR:
      console.log('Meetups fetching error!', action.error.message);
      return {
        ...state,
        fetchedMeetups: false,
        meetupsFetchingError: action.error.message,
      };

    default:
      return state;
  }
};

export default meetupsReducer;
