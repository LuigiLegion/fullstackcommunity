// Imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const SingleMeetup = ({ name, meetups }) => {
  return (
    <div className="section">
      <div className="card">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <strong>{name}</strong>
          </span>

          {!meetups.length ? (
            <div className="logos-parent-container">
              <div className="logo-container">
                No upcoming Meetups were found.
              </div>

              <br />
              <br />
            </div>
          ) : (
            <ul className="notifications">
              {meetups.map(curEvent => {
                return (
                  <li key={curEvent.id}>
                    <span className="red-text-color">
                      <strong>{curEvent.name} </strong>
                    </span>

                    <div>
                      {curEvent.venue
                        ? `${curEvent.venue.address_1}, ${curEvent.venue.city}`
                        : 'TBD'}
                    </div>

                    <div className="events-time-and-rsvp-container">
                      <div
                        className="grey-text note-date events-time-and-rsvp-containee"
                        title={moment(curEvent.time).format('LLLL')}
                      >
                        {moment(curEvent.time).fromNow()}
                      </div>

                      <a
                        className="events-time-and-rsvp-containee"
                        href={curEvent.event_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="right">
                          {curEvent.rsvp_limit ? (
                            <strong>
                              RSVP ({curEvent.yes_rsvp_count}/
                              {curEvent.rsvp_limit})
                            </strong>
                          ) : (
                            <strong>RSVP ({curEvent.yes_rsvp_count})</strong>
                          )}
                        </span>
                      </a>
                    </div>

                    <br />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMeetup;

// Prop Types
SingleMeetup.propTypes = {
  name: PropTypes.string,
  meetups: PropTypes.array,
};
