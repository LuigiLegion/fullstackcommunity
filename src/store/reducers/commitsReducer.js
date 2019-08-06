import axios from 'axios';

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
  'constancek',
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

      githubUsers.map(async curGithubUsername => {
        const curGithubUsernameReposData = await axios.get(
          `https://api.github.com/users/${curGithubUsername}/repos`
        );

        console.log(
          'curGithubUsernameRepos: ',
          curGithubUsernameReposData.data
        );

        let curGithubUsernameTotalCommits = 0;

        curGithubUsernameReposData.data.map(async curRepo => {
          const curRepoContributorsData = await axios.get(
            `https://api.github.com/repos/${curGithubUsername}/${
              curRepo.name
            }/contributors`
          );

          console.log(
            'curRepoContributors: ',
            curRepoContributorsData.data.contributions
          );

          curGithubUsernameTotalCommits +=
            curRepoContributorsData.data.contributions;

          console.log(
            'curGithubUsernameTotalCommits: ',
            curGithubUsernameTotalCommits
          );
        });

        allCommitsData.push({
          githubUsername: curGithubUsername,
          totalCommits: curGithubUsernameTotalCommits,
        });
      });

      dispatch(gotCommitsActionCreator(allCommitsData));

      console.log('commitsReducer localStorage pre-set: ', localStorage);
      // localStorage.clear();
      localStorage.setItem('commits', JSON.stringify(allCommitsData));
      console.log('commitsReducer localStorage post-set: ', localStorage);
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const commitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_COMMITS:
      // console.log('Fetched commits successfully in the reducer');
      return { ...state, allCommits: action.commits, fetchedCommits: true };
    default:
      return state;
  }
};

export default commitsReducer;
