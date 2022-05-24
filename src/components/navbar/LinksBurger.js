// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store';
import burgerStyles from '../../styles';

// Component
const LinksBurger = ({
  firstName,
  signOutThunk
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = state => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    closeMenu();
    signOutThunk();
  }

  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={state => handleStateChange(state)}
      right
      width="50%"
      styles={burgerStyles}
    >
      <div className="outline-none">
        <div className="welcome-back-container">
          <NavLink
            className="navbar-text-color"
            to="/"
            onClick={closeMenu}
          >
            <div className="white-space-pre line-height-reset">
              {firstName ? `Welcome back,\n${firstName}.` : 'Hello, guest.'}
            </div>
          </NavLink>
        </div>

        {!firstName &&
          <>
            <div>
              <NavLink
                className="text-style-bold navbar-text-color"
                to="/signin"
                onClick={closeMenu}
              >
                Sign In
              </NavLink>
            </div>

            <div>
              <NavLink
                className="text-style-bold navbar-text-color"
                to="/signup"
                onClick={closeMenu}
              >
                Sign Up
              </NavLink>
            </div>
          </>
        }

        {firstName &&
          <>
            <div>
              <NavLink
                className="text-style-bold navbar-text-color"
                to="/projects"
                onClick={closeMenu}
              >
                New Project
              </NavLink>
            </div>

            <div>
              <NavLink
                className="text-style-bold navbar-text-color"
                to="/map"
                onClick={closeMenu}
              >
                Map
              </NavLink>
            </div>
          </>
        }

        <div>
          <a
            className="text-style-bold navbar-text-color"
            href="https://meetup-tracker.herokuapp.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Meetup Tracker
          </a>
        </div>

        <div>
          <a
            className="text-style-bold navbar-text-color"
            href="https://gitness-tracker.web.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Gitness Tracker
          </a>
        </div>

        <div>
          <a
            className="text-style-bold navbar-text-color"
            href="https://github.com/LuigiLegion/fullstackcommunity"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Source
          </a>
        </div>

        <div>
          <a
            className="text-style-bold navbar-text-color"
            href="https://github.com/LuigiLegion/starbucks/blob/main/locations.json"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Data
          </a>
        </div>

        <div>
          <a
            className="text-style-bold navbar-text-color"
            href="https://taluigi.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>

        {firstName &&
          <div>
            <NavLink
              className="text-style-bold navbar-text-color"
              to="/"
              onClick={handleSignOut}
            >
              Sign Out
            </NavLink>
          </div>
        }
      </div>
    </Menu>
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
LinksBurger.propTypes = {
  firstName: PropTypes.string,
  signOutThunk: PropTypes.func,
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinksBurger);
