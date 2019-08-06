import axios from 'axios';

// Initial State
const initialState = {
  allCommits: [],
  fetchedCommits: false,
};

// Actions
const GOT_COMMITS = 'GOT_COMMITS';

// Action Creators
export const gotCommitsActionCreator = commits => ({
  type: GOT_COMMITS,
  commits,
});

// Thunk Creators
export const getCommitsThunkCreator = () => {
  return async dispatch => {
    try {
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
      dispatch(gotCommitsActionCreator(allMeetupsData));

      // console.log('eventsReducer localStorage pre-set: ', localStorage);
      localStorage.clear();
      localStorage.setItem('meetups', JSON.stringify(allMeetupsData));
      // console.log('eventsReducer localStorage post-set: ', localStorage);
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const commitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_COMMITS:
      // console.log('Fetched meetups successfully in the reducer');
      return { ...state, allCommits: action.commits, fetchedCommits: true };
    default:
      return state;
  }
};

export default commitsReducer;
