// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
const Hello = ({ firstName }) => {
  return (
    <span className="navbar-text-color">
      {`Hello${firstName ? ', ' + firstName : ''}.`}
    </span>
  );
};

// Prop Types
Notification.propTypes = {
  firstName: PropTypes.string,
};

// Exports
export default Hello;
