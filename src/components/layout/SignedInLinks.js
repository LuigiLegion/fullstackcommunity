// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store/reducers/authReducer';

// Component
const SignedInLinks = ({ profile, signOutThunk }) => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">
          <span>
            {`Hello${profile.firstName ? ', ' + profile.firstName : ''}.`}
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/create">
          <strong>New Project</strong>
        </NavLink>
      </li>

      <li>
        <NavLink to="/map">
          <strong>Map</strong>
        </NavLink>
      </li>

      <li>
        <NavLink to="/meetups">
          <strong>Meetup Tracker</strong>
        </NavLink>
      </li>

      <li>
        <a
          href="https://gitness-tracker.web.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Gitness Tracker</strong>
        </a>
      </li>

      <li>
        <NavLink to="/" onClick={signOutThunk}>
          <strong>Sign Out</strong>
        </NavLink>
      </li>
    </ul>
  );
};

// Container
const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);

// Prop Types
SignedInLinks.propTypes = {
  profile: PropTypes.object,
  signOutThunk: PropTypes.func,
};
