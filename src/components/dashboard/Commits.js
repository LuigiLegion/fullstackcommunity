import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCommitsThunkCreator } from '../../store/reducers/commitsReducer';

class Commits extends Component {
  componentDidMount() {
    this.props.getCommitsThunk();
  }

  render() {
    // console.log('this.props.commits.allCommits: ', this.props.commits.allCommits);
    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <strong>Commits Leaderboard</strong>
            </span>
            {!this.props.events.fetchedEvents ? (
              <div className="logos-parent-container">
                <div className="logo-container">
                  Loading Commits Leaderboard...
                </div>
                <br />
                <br />
              </div>
            ) : !this.props.events.allEvents.length ? (
              <div className="logos-parent-container">
                <div className="logo-container">
                  No users with Commits were found.
                </div>
                <br />
                <br />
              </div>
            ) : (
              <ul className="notifications">
                {this.props.commits.allCommits.map(curUser => {
                  return (
                    <li key={curUser.id}>
                      <span className="red-text-color">
                        <strong>{curUser.githubHandle} </strong>
                      </span>
                      <span className="red-text-color">
                        <strong>{curUser.commitsCount} </strong>
                      </span>
                      <br />
                    </li>
                  );
                })}
              </ul>
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
  commits: state.commits,
});

const mapDispatchToProps = dispatch => ({
  getCommitsThunk() {
    dispatch(getCommitsThunkCreator());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Commits);
