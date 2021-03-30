// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Hello } from '..';
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
        <div>
          <NavLink to="/" onClick={closeMenu}>
            <Hello firstName={profile.firstName} />
          </NavLink>
        </div>

        <div>
          <NavLink to="/newproject" onClick={closeMenu}>
            <span className="text-style-bold navbar-text-color">
              New Project
            </span>
          </NavLink>
        </div>

        <div>
          <NavLink to="/map" onClick={closeMenu}>
            <span className="text-style-bold navbar-text-color">Map</span>
          </NavLink>
        </div>

        <div>
          <a
            href="https://meetup-tracker.herokuapp.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <span className="text-style-bold navbar-text-color">
              Meetup Tracker
            </span>
          </a>
        </div>

        <div>
          <a
            href="https://gitness-tracker.web.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <span className="text-style-bold navbar-text-color">
              Gitness Tracker
            </span>
          </a>
        </div>

        <div>
          <NavLink
            to="/"
            onClick={() => {
              closeMenu();
              signOutThunk();
            }}
          >
            <span className="text-style-bold navbar-text-color">Sign Out</span>
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
