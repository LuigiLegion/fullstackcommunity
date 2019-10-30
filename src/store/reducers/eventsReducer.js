import axios from 'axios';

// Initial State
const initialState = {
  allEvents: [],
  fetchedEvents: false,
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
      // // Meetup group with no upcoming meetups for testing purposes:
      // const starWarsNycMeetups = await axios.get(
      //   'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=148015&page=20'
      // );
      // console.log(
      //   'starWarsNycMeetups: ',
      //   starWarsNycMeetups.data.results,
      //   'is an Array: ',
      //   Array.isArray(starWarsNycMeetups.data.results)
      // );
      // const allMeetupsData = [...starWarsNycMeetups.data.results];
      // console.log('allMeetupsData: ', allMeetupsData);
      // dispatch(gotEventsActionCreator(allMeetupsData));

      // Meetup groups with future meetups:
      const javascriptCodersMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=31377401&page=20'
      );
      // console.log(
      //   'javascriptCodersMeetups: ',
      //   javascriptCodersMeetupsData.data.results
      // );

      const bootcampersAnonymousMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=19344391&page=20'
      );
      // console.log(
      //   'bootcampersAnonymousMeetups: ',
      //   bootcampersAnonymousMeetups.data.results
      // );

      const reactNycMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=22884788&page=20'
      );
      // console.log(
      //   'reactNycMeetups: ',
      //   reactNycMeetups.data.results
      // );

      const useReactNycMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=31543338&page=20'
      );
      // console.log(
      //   'useReactNycMeetups: ',
      //   useReactNycMeetups.data.results
      // );

      const vueNycMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=23275212&page=20'
      );
      // console.log(
      //   'vueNycMeetups: ',
      //   vueNycMeetups.data.results
      // );

      const graphqlNycMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=24714233&page=20'
      );

      // const mongodbNycMeetups = await axios.get(
      //   'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=1629296&page=20'
      // );
      // console.log(
      //   'mongodbNycMeetups: ',
      //   mongodbNycMeetups.data.results
      // );

      const allMeetupsReducerData = [
        {
          name: 'JavaScript Coders',
          events: [...javascriptCodersMeetups.data.results],
        },
        {
          name: 'Bootcampers Anonymous',
          events: [...bootcampersAnonymousMeetups.data.results],
        },
        {
          name: 'React NYC',
          events: [...reactNycMeetups.data.results],
        },
        {
          name: 'useReactNYC',
          events: [...useReactNycMeetups.data.results],
        },
        {
          name: 'Vue NYC',
          events: [...vueNycMeetups.data.results],
        },
        {
          name: 'graphQL NYC',
          events: [...graphqlNycMeetups.data.results],
        },
        // {
        //   name: 'mongoDB NYC',
        //   events: [...mongodbNycMeetups.data.results],
        // },
      ];

      dispatch(gotEventsActionCreator(allMeetupsReducerData));

      const allMeetupsMapData = [
        ...javascriptCodersMeetups.data.results,
        ...bootcampersAnonymousMeetups.data.results,
        ...reactNycMeetups.data.results,
        ...useReactNycMeetups.data.results,
        ...vueNycMeetups.data.results,
        // ...mongodbNycMeetups.data.results,
      ];

      // console.log('eventsReducer localStorage pre-set: ', localStorage);

      localStorage.setItem('meetups', JSON.stringify(allMeetupsMapData));

      // console.log('eventsReducer localStorage post-set: ', localStorage);
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
      return { ...state, allEvents: action.events, fetchedEvents: true };
    default:
      return state;
  }
};

export default eventsReducer;
