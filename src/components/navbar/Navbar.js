// Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  SignedInLinks,
  SignedInLinksBurger,
  SignedOutLinks,
  SignedOutLinksBurger,
  Logo,
  Preloader,
} from '..';

// Component
const Navbar = ({ auth, profile, isLoading }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const isLargeView = width > 1024;

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

  let links;

  if (auth.uid && isLargeView) {
    links = <SignedInLinks profile={profile} />;
  } else if (auth.uid) {
    links = <SignedInLinksBurger profile={profile} />;
  } else if (isLargeView) {
    links = <SignedOutLinks />;
  } else {
    links = <SignedOutLinksBurger />;
  }

  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper navbar-background-color">
        <div>
          <Logo isLargeView={isLargeView} />

          {links}
        </div>

        <div>{isLoading && <Preloader />}</div>
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

// Prop Types
Navbar.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  isLoading: PropTypes.bool,
};

// Exports
export default connect(mapStateToProps)(Navbar);
