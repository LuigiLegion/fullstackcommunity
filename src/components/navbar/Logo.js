// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component
const Logo = ({ isLargeView }) => {
  return (
    <NavLink
      className="left navbar-logo text-style-bold navbar-text-color"
      to="/"
    >
      {isLargeView ? 'Fullstack Community' : 'FSCommunity'}
    </NavLink>
  )
};

// Prop Types
Logo.propTypes = {
  isLargeView: PropTypes.bool,
};

// Exports
export default Logo;
