// Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Links,
  LinksBurger,
  Logo,
  Preloader,
} from '..';

// Component
const Navbar = ({ isLoading }) => {
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

  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper navbar-background-color">
        <div>
          <Logo isLargeView={isLargeView} />

          {isLargeView ? <Links /> : <LinksBurger />}
        </div>

        <div>{isLoading && <Preloader />}</div>
      </nav>
    </div>
  );
};

// Container
const mapStateToProps = state => ({
  isLoading: state.layout.isLoading,
});

// Prop Types
Navbar.propTypes = {
  isLoading: PropTypes.bool,
};

// Exports
export default connect(mapStateToProps)(Navbar);
