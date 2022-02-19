import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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

Logo.propTypes = {
  isLargeView: PropTypes.bool,
};

export default Logo;
