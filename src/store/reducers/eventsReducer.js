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
      const javascriptCodersMeetupsData = await axios.get(
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
      const allMeetupsData = [
        ...javascriptCodersMeetupsData.data.results,
        ...bootcampersAnonymousMeetups.data.results,
      ];
      dispatch(gotEventsActionCreator(allMeetupsData));

      // console.log('eventsReducer localStorage pre-set: ', localStorage);
      // localStorage.clear();
      localStorage.setItem('meetups', JSON.stringify(allMeetupsData));
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
