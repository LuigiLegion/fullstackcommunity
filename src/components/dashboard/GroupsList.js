import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Group from './Group';

class GroupsList extends Component {
  render() {
    const { auth, events } = this.props;

    // console.log('events in the GroupsList component: ', events);

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="dashboard container">
          {!events.fetchedEvents ? (
            <div className="section center">
              <div className="card z-depth-0 center">
                <div className="card-content grey-text text-darken-3 center">
                  <div className="logos-parent-container">
                    <div className="logo-container">
                      Loading Meetup groups...
                    </div>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {!events.allEvents.length ? (
                <div className="section center">
                  <div className="card z-depth-0 center">
                    <div className="card-content grey-text text-darken-3 center">
                      <div className="logos-parent-container">
                        <div className="logo-container">
                          No Meetup groups were found.
                        </div>
                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                events.allEvents
                  .sort((groupOne, groupTwo) => {
                    if (groupOne.events.length > groupTwo.events.length) {
                      return -1;
                    } else if (
                      groupTwo.events.length < groupOne.events.length
                    ) {
                      return 1;
                    } else {
                      return 0;
                    }
                  })
                  .map((curGroup, idx) => {
                    return (
                      <div key={idx} className="col s12 m6 l4">
                        <Group
                          name={curGroup.name}
                          events={curGroup.events}
                          fetchedEvents={events.fetchedEvents}
                        />
                      </div>
                    );
                  })
              )}
            </div>
          )}
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

export default connect(mapStateToProps)(GroupsList);
