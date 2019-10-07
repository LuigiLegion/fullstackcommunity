import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getEventsThunkCreator } from '../../store/reducers/eventsReducer';
import Group from './Group';
import HackerHours from './HackerHours';

class GroupsList extends Component {
  componentDidMount() {
    this.props.getEventsThunk();
  }

  render() {
    const { auth, events } = this.props;

    console.log('events in the GroupsList component: ', events);

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m5 offset-m1">
              {events.map((curGroup, idx) => {
                return <Group key={idx} name={curGroup.name} events={curGroup.events} fetchedEvents={events.fetchedEvents} />
              })}
            </div>

            <div className="col s12 m5 offset-m1">
              <HackerHours />
            </div>
          </div>
        </div>
      );
    }
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
)(GroupsList);
