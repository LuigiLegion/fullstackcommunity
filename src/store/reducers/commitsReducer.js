import $ from 'jquery';

// Data Set:
const githubUsers = [
  'marvinody',
  'mshalam',
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
  'Farhuts',
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
  'alvinjtang',
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
  'taliacodes',
];

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
      const allCommitsData = [];

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

              allCommitsData.push(curGithubUserObj);
            }
          );
        }, idx * 250);
      });

      setTimeout(() => {
        // console.log('allCommitsData: ', allCommitsData);

        dispatch(gotCommitsActionCreator(allCommitsData));

        // console.log('commitsReducer localStorage pre-set: ', localStorage);

        localStorage.setItem('commits', JSON.stringify(allCommitsData));

        // console.log('commitsReducer localStorage post-set: ', localStorage);
      }, 15000);
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const commitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_COMMITS:
      // console.log(
      //   'fetched commits successfully in the commitsReducer: ',
      //   action.commits
      // );
      return { ...state, allCommits: action.commits, fetchedCommits: true };
    default:
      return state;
  }
};

export default commitsReducer;
