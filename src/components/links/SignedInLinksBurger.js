// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store';
import { burgerStyles } from '../../styles';

// Component
const SignedInLinksBurger = ({ profile, signOutThunk }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = state => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Menu
      styles={burgerStyles}
      isOpen={menuOpen}
      right
      width="50%"
      onStateChange={state => handleStateChange(state)}
    >
      <div className="outline-none">
        <div className="welcome-back-container">
          <NavLink
            className="navbar-text-color"
            to="/"
            onClick={closeMenu}
          >
            <div className="white-space-pre line-height-reset">
              {profile.firstName ? `Welcome back,\n${profile.firstName}.` : 'Hello, guest.'}
            </div>
          </NavLink>
        </div>

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
            href="https://taluigi.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>

        <div>
          <NavLink
            className="text-style-bold navbar-text-color"
            to="/"
            onClick={() => {
              closeMenu();
              signOutThunk();
            }}
          >
            Sign Out
          </NavLink>
        </div>
      </div>
    </Menu>
  );
};

// Container
const mapDispatchToProps = dispatch => ({
  signOutThunk: () => dispatch(signOutThunkCreator()),
});

// Prop Types
SignedInLinksBurger.propTypes = {
  profile: PropTypes.object,
  signOutThunk: PropTypes.func,
};

// Exports
export default connect(
  null,
  mapDispatchToProps
)(SignedInLinksBurger);
