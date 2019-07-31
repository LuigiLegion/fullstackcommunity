import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import moment from 'moment';

import { getEventsThunkCreator } from '../../store/reducers/eventsReducer';

class Events extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     events: [],
  //   };
  //   this.fetchEvents = this.fetchEvents.bind(this);
  // }

  componentDidMount() {
    // this.fetchEvents();
    this.props.getEventsThunk();
  }

  // async fetchEvents() {
  //   const { data } = await axios.get(
  //     'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=31377401&page=20'
  //   );
  //   console.log('Events data.results: ', data.results);
  //   this.setState({
  //     events: data.results,
  //   });
  // }

  render() {
    // console.log('events: ', this.props.events.events);
    // console.log('events.length: ', this.props.events.events.length);
    // console.log(
    //   'this.props.events.fetchedEvents: ',
    //   this.props.events.fetchedEvents
    // );
    // console.log('this.props.events.allEvents: ', this.props.events.allEvents);
    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <strong>Upcoming Meetups</strong>
            </span>
            {!this.props.events.fetchedEvents ? (
              <div className="logos-parent-container">
                <div className="logo-container">Loading Meetups...</div>
                <br />
              </div>
            ) : !this.props.events.allEvents.length ? (
              <div className="logos-parent-container">
                <div className="logo-container">
                  No upcoming Meetups were found.
                </div>
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
                        WeWork space at {curEvent.venue.address_1},{' '}
                        {curEvent.venue.city}{' '}
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
                            {curEvent.rsvp_limit
                              ? `RSVP (${curEvent.yes_rsvp_count}/${
                                  curEvent.rsvp_limit
                                }
                Attending)`
                              : `RSVP (${curEvent.yes_rsvp_count}
                Attending)`}
                          </span>
                        </a>
                      </div>
                      <br />
                    </li>
                  );
                })}
                <hr />
                <br />
                <li>
                  <span className="red-text-color">
                    <strong>Hacker Hours at Fullstack Academy of Code</strong>
                  </span>
                  <div>5 Hanover Square, New York</div>
                  <div className="events-time-and-rsvp-container">
                    <div className="grey-text note-date events-time-and-rsvp-containee">
                      Every second Monday of the Month
                    </div>
                    <a
                      className="events-time-and-rsvp-containee"
                      href="https://www.eventbrite.com/e/hacker-hours-at-fullstack-academy-tickets-63423857465?aff=eac2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="right">RSVP</span>
                    </a>
                  </div>
                </li>
              </ul>
            )}
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
