import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

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

    return (
      <div className="section center">
        <div className="card z-depth-0 center">
          <div className="card-content grey-text text-darken-3 center">
            {document.body.offsetWidth > 1007 ? (
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
                          Total Commits (Past Year)
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
