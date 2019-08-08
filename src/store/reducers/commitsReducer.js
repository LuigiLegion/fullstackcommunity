// import axios from 'axios';
import $ from 'jquery';

// // Data Set:
// const githubUsers = [
//   // 'marvinody',
//   // 'mshalam',
//   // 'sofibee',
//   // 'TristanWatanabe',
//   // 'msicil',
//   // 'dwyfrequency',
//   // 'SidharthNambiar',
//   // 'Eutheran',
//   // 'xMNG',
//   // 'driver620',
//   // 'republicofkang',
//   // 'PeopleMakeCulture',
//   // 'findkevin',
//   // 'JorgeAcostaDLP',
//   // 'jscheinhorn',
//   // 'Farhuts',
//   // 'TalRodin',
//   // 'wilsonleung32',
//   // 'EricBot89',
//   // 'malyavka',
//   // 'constancek',
//   // 'SunnyChangMei',
//   'LuigiLegion',
//   // 'mercedesgm',
//   // 'xavierolivares',
//   // 'willgolden5',
//   // 'tjhelsel',
//   // 'wassermandh',
//   // 'alvinjtang',
//   // 'tluo9713',
//   // 'amneet954',
//   // 'fjiang91',
//   // 'stanley-c-so',
//   // 'hdoshi2',
//   // 'dbtracy',
//   // 'nschefer',
//   // 'girkonv',
//   // 'ricardopineda93',
//   // 'dcnycoder',
//   // 'sam-peach',
//   // 'mimi-san',
//   // 'sriv97',
//   // 'daphne178',
//   // 'MistuhMok',
//   // 'ArnaldWong',
//   // 'cho-jason',
//   // 'rickylaufitness',
//   // 'jkichler',
//   // 'cmart11',
//   // 'vivtong',
//   // 'AlexanderMann2015',
//   // 'RobertSAdams32',
//   // 'FakeBarenziah',
// ];

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
      $.get(
        `https://cors-anywhere.herokuapp.com/https://github.com/LuigiLegion`,
        function(response) {
          // console.log(response);

          const commitsCount = $(response)
            .find('h2')
            .text()
            .split(' ')[22];

          console.log(commitsCount);

          // const commits = $(response).filter(
          //   document.querySelector('f4 text-normal mb-2')
          // );

          // console.log(commits);

          // const commits = $(response).find('f4 text-normal mb-2');
          // console.log(commits);

          // const commits = response.match(
          //   /<h2 class="f4 text-normal mb-2">([\d]*) contributions in the last year <\/h2>/
          // );

          // console.log(commits);

          // const pattern = `<h2 class="f4 text-normal          mb-2">
          //       622 contributions
          //         in the last year
          //     <\/h2>
          // `;

          // const pattern = `<h4 class="text-gray-light text-normal text-mono f5 mb-2 border-lg-top pt-lg-3">Connect with others<\/h4>`;

          // const commits = response.match(new RegExp(pattern));

          // console.log(commits);

          // const commits = response.match(
          //   /<h4 class="text-gray-light text-normal text-mono f5 mb-2 border-lg-top pt-lg-3">Connect with others<\/h4>/
          // );

          // console.log(commits);
        }
      );

      // const { data } = await axios.get(
      //   `https://cors-anywhere.herokuapp.com/https://github.com/LuigiLegion`
      // );

      // console.log(data.querySelector('.f4 text-normal mb-2'));

      // const allCommitsData = [];

      // githubUsers.map(async curGithubUsername => {
      //   const curGithubUsernameProfileData = await axios.get(
      //     `https://crossorigin.me/https://github.com/${curGithubUsername}`
      //   );

      //   console.log(curGithubUsernameProfileData.data);
      // });

      // githubUsers.map(async curGithubUsername => {
      //   const curGithubUsernameReposData = await axios.get(
      //     `https://api.github.com/users/${curGithubUsername}/repos`
      //   );

      //   console.log(
      //     'curGithubUsernameRepos: ',
      //     curGithubUsernameReposData.data
      //   );

      //   let curGithubUsernameTotalCommits = 0;

      //   curGithubUsernameReposData.data.map(async curRepo => {
      //     const curAxiosUrl = `https://api.github.com/repos/${curGithubUsername}/${
      //       curRepo.name
      //     }/contributors`;

      //     console.log('curAxiosUrl: ', curAxiosUrl);

      //     const curRepoContributorsData = await axios.get(curAxiosUrl);

      //     console.log('curRepoContributorsData: ', curRepoContributorsData);

      //     curRepoContributorsData.data.map(curContributor => {
      //       if (curContributor.login === curGithubUsername) {
      //         curGithubUsernameTotalCommits += curContributor.contributions;
      //       }
      //       return curGithubUsernameTotalCommits;
      //     });

      //     console.log(
      //       'curGithubUsernameTotalCommits: ',
      //       curGithubUsernameTotalCommits
      //     );
      //   });

      //   setTimeout(function() {
      //     allCommitsData.push({
      //       githubUsername: curGithubUsername,
      //       totalCommits: curGithubUsernameTotalCommits,
      //     });

      //     console.log('allCommitsData: ', allCommitsData);
      //   }, 2000);
      // });

      // setTimeout(function() {
      //   dispatch(gotCommitsActionCreator(allCommitsData));

      //   console.log('commitsReducer localStorage pre-set: ', localStorage);
      //   // localStorage.clear();
      //   localStorage.setItem('commits', JSON.stringify(allCommitsData));
      //   console.log('commitsReducer localStorage post-set: ', localStorage);
      // }, 10000);
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
