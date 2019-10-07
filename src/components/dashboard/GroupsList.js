import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Group from './Group';
import { getEventsThunkCreator } from '../../store/reducers/eventsReducer';

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
              {/* {events.map((curEvent, idx) => {
                return <Group key={idx}  />
              })} */}
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
