import $ from 'jquery';

// Data Set:
const githubUsers = [
  'marvinody',
  'sofibee',
  'TristanWatanabe',
  'msicil',
  'dwyfrequency',
  'SidharthNambiar',
  'Eutheran',
  'xMNG',
  'driver620',
  'republicofkang',
  'PeopleMakeCulture',
  'findkevin',
  'JorgeAcostaDLP',
  'jscheinhorn',
  'TalRodin',
  'wilsonleung32',
  'EricBot89',
  'malyavka',
  'SunnyChangMei',
  'LuigiLegion',
  'mercedesgm',
  'xavierolivares',
  'willgolden5',
  'tjhelsel',
  'wassermandh',
  'tluo9713',
  'amneet954',
  'fjiang91',
  'stanley-c-so',
  'hdoshi2',
  'dbtracy',
  'nschefer',
  'girkonv',
  'ricardopineda93',
  'dcnycoder',
  'sam-peach',
  'mimi-san',
  'sriv97',
  'daphne178',
  'MistuhMok',
  'ArnaldWong',
  'cho-jason',
  'rickylaufitness',
  'jkichler',
  'cmart11',
  'vivtong',
  'AlexanderMann2015',
  'RobertSAdams32',
  'FakeBarenziah',
];

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
      githubUsers.forEach((curGithubUser, idx) => {
        setTimeout(() => {
          $.get(
            `https://cors-anywhere.herokuapp.com/https://github.com/${curGithubUser}`,
            function(res) {
              // console.log('res: ', res);
              // console.log({res})

              const filtResArr = $(res)
                .find('h2')
                .text()
                .match(/\d+/g);

              const curGithubUserTotalCommits =
                filtResArr.length === 1 ? filtResArr[0] : filtResArr.join('');

              // console.log('commitsCount: ', curGithubUserTotalCommits);

              const curGithubUserObj = {
                githubUsername: curGithubUser,
                totalCommits: Number(curGithubUserTotalCommits),
              };

              // console.log('curGithubUserObj: ', curGithubUserObj);

              dispatch(gotUserCommitsActionCreator(curGithubUserObj));
            }
          );
        }, idx * 250);
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
