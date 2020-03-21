// Imports
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import ProjectList from '../projects/ProjectList';
import Notifications from './Notifications';
import Spaces from './Spaces';
import { getMeetupsThunkCreator } from '../../store/reducers/meetupsReducer';

// Component
const Dashboard = ({
  auth,
  projects,
  notifications,
  fetchedMeetups,
  getMeetupsThunk,
}) => {
  useEffect(() => {
    if (!fetchedMeetups) {
      getMeetupsThunk();
    }
  }, [fetchedMeetups, getMeetupsThunk]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>

          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />

            <Spaces />
          </div>
        </div>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  notifications: state.firestore.ordered.notifications,
  projects: state.firestore.ordered.projects,
  fetchedMeetups: state.meetups.fetchedMeetups,
});

const mapDispatchToProps = dispatch => ({
  getMeetupsThunk() {
    dispatch(getMeetupsThunkCreator());
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: 'projects',
      orderBy: ['createdAt', 'desc'],
    },
    {
      collection: 'notifications',
      limit: 3,
      orderBy: ['time', 'desc'],
    },
  ])
)(Dashboard);

// Prop Types
Dashboard.propTypes = {
  auth: PropTypes.object,
  notifications: PropTypes.array,
  projects: PropTypes.array,
  fetchedMeetups: PropTypes.bool,
  getMeetupsThunk: PropTypes.func,
};
