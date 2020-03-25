// Imports
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOutThunkCreator } from '../../store/reducers/authReducer';
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
    <div>
      <Menu
        isOpen={menuOpen}
        onStateChange={state => handleStateChange(state)}
        right
        width="50%"
        styles={burgerStyles}
      >
        <div className="remove-outline">
          <div>
            <NavLink to="/" onClick={() => closeMenu()}>
              <span className="navbar-text-color">
                {`Hello${profile.firstName ? ', ' + profile.firstName : ''}.`}
              </span>
            </NavLink>
          </div>

          <div>
            <NavLink onClick={() => closeMenu()} to="/create">
              <span className="text-style-bold navbar-text-color">
                New Project
              </span>
            </NavLink>
          </div>

          <div>
            <NavLink onClick={() => closeMenu()} to="/map">
              <span className="text-style-bold navbar-text-color">Map</span>
            </NavLink>
          </div>

          <div>
            <NavLink onClick={() => closeMenu()} to="/meetups">
              <span className="text-style-bold navbar-text-color">
                Meetup Tracker
              </span>
            </NavLink>
          </div>

          <div>
            <a
              onClick={() => closeMenu()}
              href="https://gitness-tracker.web.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-style-bold navbar-text-color">
                Gitness Tracker
              </span>
            </a>
          </div>

          <div>
            <NavLink
              onClick={() => {
                closeMenu();
                signOutThunk();
              }}
              to="/"
            >
              <span className="text-style-bold navbar-text-color">
                Sign Out
              </span>
            </NavLink>
          </div>
        </div>
      </Menu>
    </div>
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
)(SignedInLinksBurger);

// Prop Types
SignedInLinksBurger.propTypes = {
  profile: PropTypes.object,
  signOutThunk: PropTypes.func,
};
