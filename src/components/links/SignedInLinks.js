// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Hello } from '..';
import { signOutThunkCreator } from '../../store';

// Component
const SignedInLinks = ({ profile, signOutThunk }) => {
  return (
    <ul className="right">
      <li className="navbar-link">
        <NavLink to="/">
          <Hello firstName={profile.firstName} />
        </NavLink>
      </li>

      <li className="navbar-link">
        <NavLink to="/newproject">
          <span className="text-style-bold navbar-text-color">New Project</span>
        </NavLink>
      </li>

      <li className="navbar-link">
        <NavLink to="/map">
          <span className="text-style-bold navbar-text-color">Map</span>
        </NavLink>
      </li>

      <li className="navbar-link">
        <a
          href="https://meetup-tracker.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-style-bold navbar-text-color">
            Meetup Tracker
          </span>
        </a>
      </li>

      <li className="navbar-link">
        <a
          href="https://gitness-tracker.web.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-style-bold navbar-text-color">
            Gitness Tracker
          </span>
        </a>
      </li>

      <li className="navbar-link">
        <NavLink to="/" onClick={signOutThunk}>
          <span className="text-style-bold navbar-text-color">Sign Out</span>
        </NavLink>
      </li>
    </ul>
  );
};

// Container
const mapDispatchToProps = dispatch => ({
  signOutThunk: () => dispatch(signOutThunkCreator()),
});

// Prop Types
SignedInLinks.propTypes = {
  profile: PropTypes.object,
  signOutThunk: PropTypes.func,
};

// Exports
export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
