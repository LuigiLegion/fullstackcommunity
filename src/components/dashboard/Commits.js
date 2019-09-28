import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { getUserCommitsThunkCreator } from '../../store/reducers/commitsReducer';

class Commits extends Component {
  componentDidMount() {
    if (!this.props.fetchedCommits) {
      this.props.getUserCommitsThunk();
    }
  }

  render() {
    // console.log(
    //   'this.props.allCommits: ',
    //   this.props.allCommits
    // );

    const { auth } = this.props;
    const largeViewCheck = window.innerWidth > 1007;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="section center">
        <div className="card z-depth-0 center">
          <div className="card-content grey-text text-darken-3 center">
            {largeViewCheck ? (
              <div>
                <NavLink activeClassName="right" to="/yearlyleaderboard">
                  <strong>Past Year Leaderboard</strong>
                </NavLink>

                <br />
                <br />
              </div>
            ) : null}

            <span className="card-title">
              <strong>
                {moment(new Date()).format('MMMM YYYY')} Season Leaderboard
              </strong>
            </span>

            {!this.props.fetchedCommits ? (
              <div className="logos-parent-container">
                <div className="logo-container">Loading commits...</div>

                <br />
                <br />
              </div>
            ) : !this.props.allCommits.length ? (
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
                      width: '80%',
                      minWidth: '80%',
                      maxWidth: '80%',
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
                          Github Username
                        </th>

                        <th
                          style={{
                            width: '100px',
                            minWidth: '100px',
                            maxWidth: '100px',
                            wordBreak: 'break-all',
                          }}
                        >
                          Total Commits
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.props.allCommits
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
                                <strong>{curGithubUser.githubUsername}</strong>
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
  allCommits: state.commits.allCommits,
  fetchedCommits: state.commits.fetchedCommits,
});

const mapDispatchToProps = dispatch => ({
  getUserCommitsThunk() {
    dispatch(getUserCommitsThunkCreator());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Commits);
