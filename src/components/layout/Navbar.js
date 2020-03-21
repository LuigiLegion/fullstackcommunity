// Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignedInLinks from './SignedInLinks';
import SignedInLinksBurger from './SignedInLinksBurger';
import SignedOutLinks from './SignedOutLinks';
import SignedOutLinksBurger from './SignedOutLinksBurger';
import Preloader from './Preloader';

// Component
const Navbar = ({ auth, profile, isLoading }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const largeViewCheck = width > 1007;

  const updateNavbarDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateNavbarDimensions();
    window.addEventListener('resize', updateNavbarDimensions);

    return () => {
      window.removeEventListener('resize', updateNavbarDimensions);
      updateNavbarDimensions();
    };
  }, [width]);

  let curLinks;
  if (auth.uid) {
    if (largeViewCheck) {
      curLinks = <SignedInLinks profile={profile} />;
    } else {
      curLinks = <SignedInLinksBurger profile={profile} />;
    }
  } else if (largeViewCheck) {
    curLinks = <SignedOutLinks />;
  } else {
    curLinks = <SignedOutLinksBurger />;
  }

  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper grey darken-4">
        <div>
          <NavLink to="/" className="left brand-logo name-text-positioning">
            {largeViewCheck ? 'Fullstack Community' : 'FSCommunity'}
          </NavLink>

          {curLinks}

          <div>{isLoading ? <Preloader /> : null}</div>
        </div>
      </nav>
    </div>
  );
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  isLoading: state.layout.isLoading,
});

export default connect(mapStateToProps)(Navbar);

// Prop Types
Navbar.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  isLoading: PropTypes.bool,
};
