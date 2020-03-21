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
            <NavLink
              onClick={() => closeMenu()}
              to="/"
              className="btn btn-floating grey darken-3"
            >
              <strong>{profile.initials}</strong>
            </NavLink>
          </div>

          <div>
            <NavLink onClick={() => closeMenu()} to="/map">
              <strong>Map</strong>
            </NavLink>
          </div>

          <div>
            <NavLink onClick={() => closeMenu()} to="/meetups">
              <strong>Meetup Manager</strong>
            </NavLink>
          </div>

          <div>
            <NavLink onClick={() => closeMenu()} to="/create">
              <strong>New Project</strong>
            </NavLink>
          </div>

          <div>
            <a
              onClick={() => closeMenu()}
              href="https://gitness-tracker.web.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Gitness Tracker</strong>
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
              <strong>Sign Out</strong>
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
