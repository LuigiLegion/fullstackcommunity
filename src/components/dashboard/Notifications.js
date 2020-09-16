// Imports
import React from 'react';
import PropTypes from 'prop-types';

import Notification from './Notification';

// Component
const Notifications = ({ notifications }) => {
  return (
    <div className="section">
      <div className="card grey lighten-5">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title text-style-bold">Notifications</span>

          <ul className="notifications">
            {notifications &&
              notifications.map(notification => (
                <Notification
                  key={notification.id}
                  user={notification.user}
                  content={notification.content}
                  time={notification.time}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Prop Types
Notifications.propTypes = {
  notifications: PropTypes.array,
};

// Exports
export default Notifications;
