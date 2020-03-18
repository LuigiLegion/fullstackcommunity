import axios from 'axios';

// Initial State
const initialState = {
  allMeetups: [],
  fetchedMeetups: false,
};

// Actions Types
const GOT_MEETUPS = 'GOT_MEETUPS';

// Action Creators
export const gotMeetupsActionCreator = meetups => ({
  type: GOT_MEETUPS,
  meetups,
});

// Thunk Creators
export const getMeetupsThunkCreator = () => {
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
      // dispatch(gotMeetupsActionCreator(allMeetupsData));

      // Meetup groups with future meetups:
      const nycCodersMeetups = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=31377401&page=20'
      );
      // console.log(
      //   'nycCodersMeetups: ',
      //   nycCodersMeetupsData.data.results
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

      dispatch(gotMeetupsActionCreator(allMeetupsReducerData));

      localStorage.setItem(
        'groupMeetups',
        JSON.stringify(allMeetupsReducerData)
      );

      const allMeetupsMapData = [
        ...nycCodersMeetups.data.results,
        ...bootcampersAnonymousMeetups.data.results,
        ...reactNycMeetups.data.results,
        ...useReactNycMeetups.data.results,
        ...vueNycMeetups.data.results,
        // ...mongodbNycMeetups.data.results,
      ];

      // console.log('meetupsReducer localStorage pre-set: ', localStorage);

      localStorage.setItem('allMeetups', JSON.stringify(allMeetupsMapData));

      // console.log('meetupsReducer localStorage post-set: ', localStorage);
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const meetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MEETUPS:
      // console.log('Fetched meetups successfully in the reducer');
      return { ...state, allMeetups: action.meetups, fetchedMeetups: true };
    default:
      return state;
  }
};

export default meetupsReducer;
