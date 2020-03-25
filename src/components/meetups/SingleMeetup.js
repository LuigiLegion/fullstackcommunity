// Imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Component
const SingleMeetup = ({ name, meetups }) => {
  return (
    <div className="section">
      <div className="card grey lighten-5">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title text-style-bold">{name}</span>

          {!meetups.length ? (
            <div className="message-container">
              <div className="message-containee">
                No upcoming Meetups were found.
              </div>

              <br />
              <br />
            </div>
          ) : (
            <ul className="notifications">
              {meetups.map(curEvent => (
                <li key={curEvent.id}>
                  <span className="text-style-bold text-color-red">
                    {`${curEvent.name} `}
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
                      <span className="right text-style-bold">
                        {`RSVP (${curEvent.yes_rsvp_count}${
                          curEvent.rsvp_limit ? '/' + curEvent.rsvp_limit : ''
                        })`}
                      </span>
                    </a>
                  </div>

                  <br />
                </li>
              ))}
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
