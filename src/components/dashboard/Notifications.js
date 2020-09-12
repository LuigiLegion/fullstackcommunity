// Imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const Notifications = ({ notifications }) => {
  return (
    <div className="section">
      <div className="card grey lighten-5">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title text-style-bold">Notifications</span>

          <ul className="notifications">
            {notifications &&
              notifications.map(curNotification => (
                <li key={curNotification.id}>
                  <span className="text-style-bold text-color-red">
                    {curNotification.user}
                  </span>

                  <span>{curNotification.content}</span>

                  <div className="grey-text">
                    {moment(curNotification.time.toDate()).fromNow()}
                  </div>
                </li>
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
