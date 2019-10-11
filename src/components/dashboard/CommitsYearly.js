import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { getUserYearlyCommitsThunkCreator } from '../../store/reducers/commitsReducer';

class CommitsYearly extends Component {
  componentDidMount() {
    if (!this.props.fetchedYearlyCommits) {
      this.props.getUserYearlyCommitsThunk();
    }
  }

  render() {
    // console.log(
    //   'this.props.yearlyCommits: ',
    //   this.props.yearlyCommits
    // );

    const { auth } = this.props;
    const largeViewCheck = window.innerWidth > 1007;
    const tableWidth = largeViewCheck ? '80%' : '100%';

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="section center">
        <div className="card z-depth-0 center">
          <div className="card-content grey-text text-darken-3 center">
            {largeViewCheck ? (
              <div>
                <NavLink activeClassName="right" to="/leaderboard">
                  <strong>Current Month Leaderboard</strong>
                </NavLink>

                <br />
                <br />
              </div>
            ) : null}

            <span className="card-title">
              <strong>Past Year Leaderboard</strong>
            </span>

            {!this.props.fetchedYearlyCommits ? (
              <div className="logos-parent-container">
                <div className="logo-container">Loading commits...</div>

                <br />
                <br />
              </div>
            ) : !this.props.yearlyCommits.length ? (
              <div className="logos-parent-container">
                <div className="logo-container">No users were found.</div>

                <br />
                <br />
              </div>
            ) : (
              <div className="logos-parent-container">
                <div className="logo-container">
                  <table
                    className="striped centered"
                    style={{
                      width: tableWidth,
                      minWidth: tableWidth,
                      maxWidth: tableWidth,
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            width: '100px',
                            minWidth: '100px',
                            maxWidth: '100px',
                            wordBreak: 'break-all',
                          }}
                        >
                          Rank
                        </th>

                        <th
                          style={{
                            width: '100px',
                            minWidth: '100px',
                            maxWidth: '100px',
                            wordBreak: 'break-all',
                          }}
                        >
                          Github
                          <br />
                          Username
                        </th>

                        <th
                          style={{
                            width: '100px',
                            minWidth: '100px',
                            maxWidth: '100px',
                            wordBreak: 'break-all',
                          }}
                        >
                          Total
                          <br />
                          Commits
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.props.yearlyCommits
                        .sort((githubUserOne, githubUserTwo) => {
                          if (
                            githubUserOne.totalCommits >
                            githubUserTwo.totalCommits
                          ) {
                            return -1;
                          } else if (
                            githubUserOne.totalCommits <
                            githubUserTwo.totalCommits
                          ) {
                            return 1;
                          } else {
                            return 0;
                          }
                        })
                        .map((curGithubUser, idx) => {
                          return (
                            <tr key={idx}>
                              <td
                                style={{
                                  width: '100px',
                                  minWidth: '100px',
                                  maxWidth: '100px',
                                  wordBreak: 'break-all',
                                }}
                              >
                                <strong>{idx + 1}</strong>
                              </td>

                              <td
                                style={{
                                  width: '100px',
                                  minWidth: '100px',
                                  maxWidth: '100px',
                                  wordBreak: 'break-all',
                                }}
                              >
                                <a
                                  className="events-time-and-rsvp-containee"
                                  href={`https://github.com/${curGithubUser.githubUsername}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span>
                                    <strong>
                                      {curGithubUser.githubUsername}
                                    </strong>
                                  </span>
                                </a>
                              </td>

                              <td
                                style={{
                                  width: '100px',
                                  minWidth: '100px',
                                  maxWidth: '100px',
                                  wordBreak: 'break-all',
                                }}
                              >
                                <strong>{curGithubUser.totalCommits}</strong>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
  yearlyCommits: state.commits.yearlyCommits,
  fetchedYearlyCommits: state.commits.fetchedYearlyCommits,
});

const mapDispatchToProps = dispatch => ({
  getUserYearlyCommitsThunk() {
    dispatch(getUserYearlyCommitsThunkCreator());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitsYearly);
