// Imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const Notification = ({ user, content, time }) => {
  return (
    <li>
      <span className="text-style-bold text-color-red">{user}</span>

      <span>{content}</span>

      <div className="grey-text">{moment(time.toDate()).fromNow()}</div>
    </li>
  );
};

// Prop Types
Notification.propTypes = {
  user: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.object,
};

// Exports
export default Notification;
