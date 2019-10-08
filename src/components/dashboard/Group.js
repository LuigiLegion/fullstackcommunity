import moment from 'moment';
import React from 'react';

const Group = ({ name, events, fetchedEvents }) => {
  console.log({ name });
  console.log({ events });
  console.log({ fetchedEvents });

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            <strong>{name}</strong>
          </span>
          {!fetchedEvents ? (
            <div className="logos-parent-container">
              <div className="logo-container">Loading Meetups...</div>
              <br />
              <br />
            </div>
          ) : !events.length ? (
            <div className="logos-parent-container">
              <div className="logo-container">
                No upcoming Meetups were found.
              </div>
              <br />
              <br />
            </div>
          ) : (
            <ul className="notifications">
              {events.map(curEvent => {
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
                      <div className="grey-text note-date events-time-and-rsvp-containee">
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
                              {curEvent.rsvp_limit} Attending)
                            </strong>
                          ) : (
                            <strong>
                              RSVP ({curEvent.yes_rsvp_count} Attending)
                            </strong>
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

export default Group;
