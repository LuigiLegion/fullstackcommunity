import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOutThunkCreator } from '../../store/reducers/authReducer';

const SignedInLinks = props => {
  return (
    <ul className="right">
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
        <NavLink to="/meetups">
          <strong>Meetup Manager</strong>
        </NavLink>
      </li>
      <li>
        <NavLink to="/map">
          <strong>Map</strong>
        </NavLink>
      </li>
      <li>
        <NavLink to="/create">
          <strong>New Project</strong>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={props.signOutThunk}>
          <strong>Sign Out</strong>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating red lighten-1">
          <strong>{props.profile.initials}</strong>
        </NavLink>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
