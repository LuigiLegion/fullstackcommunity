// Imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const Notifications = ({ notifications }) => {
  return (
    <div className="section">
      <div className="card">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <strong>Notifications</strong>
          </span>

          <ul className="notifications">
            {notifications &&
              notifications.map(curNotification => {
                return (
                  <li key={curNotification.id}>
                    <span className="text-color-red">
                      <strong>{curNotification.user}</strong>
                    </span>

                    <span>{curNotification.content}</span>

                    <div className="grey-text note-date">
                      {moment(curNotification.time.toDate()).fromNow()}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

// Prop Types
Notifications.propTypes = {
  notifications: PropTypes.array,
};
