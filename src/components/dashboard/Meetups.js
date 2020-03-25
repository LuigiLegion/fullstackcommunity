// Imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import SingleMeetup from './SingleMeetup';
import { getMeetupsThunkCreator } from '../../store/reducers/meetupsReducer';

// Component
const Meetups = ({ auth, groupMeetups, fetchedMeetups, getMeetupsThunk }) => {
  useEffect(() => {
    if (auth.uid && !fetchedMeetups) {
      getMeetupsThunk();
    }
  }, [auth.uid, fetchedMeetups, getMeetupsThunk]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        {!groupMeetups.length && !fetchedMeetups ? (
          <div className="section center">
            <div className="card grey lighten-5 center">
              <div className="card-content grey-text text-darken-3 center">
                <div className="message-container">
                  <div className="message-containee">
                    Loading Meetup Groups...
                  </div>

                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {!groupMeetups.length ? (
              <div className="section center">
                <div className="card grey lighten-5 center">
                  <div className="card-content grey-text text-darken-3 center">
                    <div className="message-container">
                      <div className="message-containee">
                        No Meetup groups were found.
                      </div>

                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              groupMeetups
                .sort((groupOne, groupTwo) => {
                  if (groupOne.meetups.length > groupTwo.meetups.length) {
                    return -1;
                  } else if (
                    groupTwo.meetups.length < groupOne.meetups.length
                  ) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .map(curGroup => (
                  <div key={curGroup.name} className="col s12 m6 l4">
                    <SingleMeetup
                      name={curGroup.name}
                      meetups={curGroup.meetups}
                    />
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  groupMeetups: state.meetups.groupMeetups,
  fetchedMeetups: state.meetups.fetchedMeetups,
});

const mapDispatchToProps = dispatch => ({
  getMeetupsThunk() {
    dispatch(getMeetupsThunkCreator());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meetups);

// Prop Types
Meetups.propTypes = {
  auth: PropTypes.object,
  groupMeetups: PropTypes.array,
  fetchedMeetups: PropTypes.bool,
  getMeetupsThunk: PropTypes.func,
};
