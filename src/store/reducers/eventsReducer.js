import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getEventsThunkCreator } from '../../store/reducers/eventsReducer';

class Events extends Component {
  componentDidMount() {
    this.props.getEventsThunk();
  }

  render() {
    // console.log('this.props.events.allEvents: ', this.props.events.allEvents);

    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <strong>Upcoming Meetups & Events</strong>
            </span>
            {!this.props.events.fetchedEvents ? (
              <div className="logos-parent-container">
                <div className="logo-container">Loading Meetups...</div>
                <br />
                <br />
              </div>
            ) : !this.props.events.allEvents.length ? (
              <div className="logos-parent-container">
                <div className="logo-container">
                  No upcoming Meetups were found.
                </div>
                <br />
                <br />
              </div>
            ) : (
              <ul className="notifications">
                {this.props.events.allEvents.map(curEvent => {
                  return (
                    <li key={curEvent.id}>
                      <span className="red-text-color">
                        <strong>{curEvent.name} </strong>
                      </span>
                      <div>
                        WeWork space at {curEvent.venue ?
                        `${curEvent.venue.address_1}, ${curEvent.venue.city}`
                        :
                        'TBD'}
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
            <hr />
            <ul className="notifications">
              <li>
                <span className="red-text-color">
                  <strong>Hacker Hours at Fullstack Academy of Code</strong>
                </span>
                <div>5 Hanover Square, New York</div>
                <div className="events-time-and-rsvp-container">
                  <div className="grey-text note-date events-time-and-rsvp-containee">
                    Every second Monday of the month
                  </div>
                  <a
                    className="events-time-and-rsvp-containee"
                    href="https://www.eventbrite.com/e/hacker-hours-at-fullstack-academy-tickets-63423943723?aff=erelexpmlt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="right">
                      <strong>RSVP</strong>
                    </span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  getEventsThunk() {
    dispatch(getEventsThunkCreator());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
