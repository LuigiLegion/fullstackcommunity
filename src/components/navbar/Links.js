// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store';

// Component
const Links = ({
  firstName,
  signOutThunk
}) => {
  return (
    <ul className="right">
      <li>
        <NavLink
          className="navbar-text-color"
          to="/"
        >
          {firstName ? `Welcome back, ${firstName}.` : 'Hello, guest.'}
        </NavLink>
      </li>

      {!firstName &&
        <>
          <li>
            <NavLink
              className="text-style-bold navbar-text-color"
              to="/signin"
            >
              Sign In
            </NavLink>
          </li>

          <li>
            <NavLink
              className="text-style-bold navbar-text-color"
              to="/signup"
            >
              Sign Up
            </NavLink>
          </li>
        </>
      }

      {firstName &&
        <>
          <li>
            <NavLink
              className="text-style-bold navbar-text-color"
              to="/projects"
            >
              New Project
            </NavLink>
          </li>

          <li>
            <NavLink
              className="text-style-bold navbar-text-color"
              to="/map"
            >
              Map
            </NavLink>
          </li>
        </>
      }

      <li>
        <a
          className="text-style-bold navbar-text-color"
          href="https://meetup-tracker.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meetup Tracker
        </a>
      </li>

      <li>
        <a
          className="text-style-bold navbar-text-color"
          href="https://gitness-tracker.web.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gitness Tracker
        </a>
      </li>

      <li>
        <a
          className="text-style-bold navbar-text-color"
          href="https://github.com/LuigiLegion/fullstackcommunity"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </li>

      <li>
        <a
          className="text-style-bold navbar-text-color"
          href="https://github.com/LuigiLegion/starbucks/blob/main/locations.json"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data
        </a>
      </li>

      <li>
        <a
          className={`text-style-bold navbar-text-color${!firstName ? ' padding-right' : ''}`}
          href="https://taluigi.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </li>

      {firstName &&
        <li>
          <NavLink
            className="text-style-bold navbar-text-color padding-right"
            to="/"
            onClick={signOutThunk}
          >
            Sign Out
          </NavLink>
        </li>
      }
    </ul>
  );
};

// Container
const mapStateToProps = state => ({
  firstName: state.firebase.profile.firstName,
});

const mapDispatchToProps = dispatch => ({
  signOutThunk: () => dispatch(signOutThunkCreator()),
});

// Prop Types
Links.propTypes = {
  firstName: PropTypes.string,
  signOutThunk: PropTypes.func,
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);
