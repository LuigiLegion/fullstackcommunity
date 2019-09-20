import $ from 'jquery';
import moment from 'moment';

import * as githubUsersData from '../../data/github-users-data.json';

// Initial State
const initialState = {
  allCommits: [],
  fetchedCommits: false,
};

// Actions
const GOT_USER_COMMITS = 'GOT_COMMITS';

// Action Creators
export const gotUserCommitsActionCreator = userCommits => ({
  type: GOT_USER_COMMITS,
  userCommits,
});

// Thunk Creators
export const getUserCommitsThunkCreator = () => {
  return async dispatch => {
    try {
      githubUsersData.githubUsernames.forEach((curGithubUser, idx) => {
        setTimeout(() => {
          $.get(
            `https://cors-anywhere.herokuapp.com/https://github.com/${curGithubUser}`,
            function(res) {
              // console.log('res: ', res);

              // Alternative:
              // console.log({ res });

              let filtResArr;
              let curGithubUserTotalCommits;

              if (document.body.offsetWidth > 1007) {
                filtResArr = $(res)
                  .find('h2')
                  .text()
                  .match(/\d+/g);

                // console.log('filtResArr: ', filtResArr);

                curGithubUserTotalCommits = filtResArr
                  ? filtResArr.length === 1
                    ? filtResArr[0]
                    : filtResArr.join('')
                  : 0;

                // console.log(
                //   'curGithubUserTotalCommits: ',
                //   curGithubUserTotalCommits
                // );
              } else {
                const curMonth = moment(Date.now()).format('MMMM');

                // console.log('curMonth: ', curMonth);

                const curMonthCommitsCheck = $(res)
                  .find('span')
                  .text()
                  .includes(`- ${curMonth}`);

                // console.log('curMonthCommitsCheck: ', curMonthCommitsCheck);

                if (!curMonthCommitsCheck) {
                  filtResArr = $(res)
                    .find('button')
                    .text()
                    .match(/\d+/g);
                }

                // console.log('filtResArr: ', filtResArr);

                curGithubUserTotalCommits = filtResArr ? filtResArr[0] : 0;

                // console.log(
                //   'curGithubUserTotalCommits: ',
                //   curGithubUserTotalCommits
                // );
              }

              const curGithubUserObj = {
                githubUsername: curGithubUser,
                totalCommits: Number(curGithubUserTotalCommits),
              };

              // console.log('curGithubUserObj: ', curGithubUserObj);

              dispatch(gotUserCommitsActionCreator(curGithubUserObj));
            }
          );
        }, idx * 200);
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const commitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER_COMMITS:
      // console.log(
      //   'fetched commits successfully in the commitsReducer: ',
      //   action.commits
      // );

      return {
        ...state,
        allCommits: [...state.allCommits, action.userCommits],
        fetchedCommits: true,
      };
    default:
      return state;
  }
};

export default commitsReducer;
