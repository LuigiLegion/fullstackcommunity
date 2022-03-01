// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store';

// Component
const SignedInLinks = ({ profile, signOutThunk }) => {
  return (
    <ul className="right">
      <li className="navbar-link">
        <NavLink
          className="navbar-text-color"
          to="/"
        >
          {profile.firstName ? `Welcome back, ${profile.firstName}.` : 'Hello, guest.'}
        </NavLink>
      </li>

      <li className="navbar-link">
        <NavLink
          className="text-style-bold navbar-text-color"
          to="/projects"
        >
          New Project
        </NavLink>
      </li>

      <li className="navbar-link">
        <NavLink
          className="text-style-bold navbar-text-color"
          to="/map"
        >
          Map
        </NavLink>
      </li>

      <li className="navbar-link">
        <a
          className="text-style-bold navbar-text-color"
          href="https://meetup-tracker.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meetup Tracker
        </a>
      </li>

      <li className="navbar-link">
        <a
          className="text-style-bold navbar-text-color"
          href="https://gitness-tracker.web.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gitness Tracker
        </a>
      </li>

      <li className="navbar-link">
        <a
          className="text-style-bold navbar-text-color"
          href="https://taluigi.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </li>

      <li className="navbar-link">
        <NavLink
          className="text-style-bold navbar-text-color padding-right"
          to="/"
          onClick={signOutThunk}
        >
          Sign Out
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
