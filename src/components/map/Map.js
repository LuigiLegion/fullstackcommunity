/* eslint-disable complexity */

// Imports
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getMeetupsThunkCreator } from '../../store/reducers/meetupsReducer';
import mapboxAccessToken from '../../config/mbglConfig';
import { branches as libraries } from '../../data/public-library-locations.json';
import { branches as starbucks } from '../../data/starbucks-locations.json';
import { branches as wholefoodsMarkets } from '../../data/whole-foods-market-locations.json';

// Initializations
const regex = /\s+/g;

// Component
const Map = ({ auth, users, allMeetups, fetchedMeetups, getMeetupsThunk }) => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '91vh',
    latitude: 40.7531823,
    longitude: -73.9844421,
    zoom: 14,
  });
  const [userMarker, setUserMarker] = useState({
    firstRenderWithUsers: true,
    curUserLocationName: '',
  });
  const [selectedAlum, setSelectedAlum] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedAwsLoft, setSelectedAwsLoft] = useState(null);
  const [selectedFreelancersHub, setSelectedFreelancersHub] = useState(null);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [selectedStarbucks, setSelectedStarbucks] = useState(null);
  const [selectedWholeFoods, setSelectedWholeFoods] = useState(null);
  const [selectedPublicLibrary, setSelectedPublicLibrary] = useState(null);

  const clearSelected = () => {
    setSelectedAlum(null);
    setSelectedCampus(null);
    setSelectedAwsLoft(null);
    setSelectedFreelancersHub(null);
    setSelectedMeetup(null);
    setSelectedStarbucks(null);
    setSelectedWholeFoods(null);
    setSelectedPublicLibrary(null);
  };

  useEffect(() => {
    if (auth.uid && !fetchedMeetups) {
      getMeetupsThunk();
    }
  }, [auth.uid, fetchedMeetups, getMeetupsThunk]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
        <ReactMapGL
          onClick={() => clearSelected()}
          {...viewport}
          mapboxApiAccessToken={mapboxAccessToken}
          onViewportChange={newViewport => {
            setViewport({
              ...viewport,
              latitude: newViewport.latitude,
              longitude: newViewport.longitude,
              zoom: newViewport.zoom,
            });
          }}
        >
          {libraries.map(curPublicLibrary => (
            <Marker
              key={curPublicLibrary.id}
              latitude={curPublicLibrary.lat}
              longitude={curPublicLibrary.lon}
            >
              <button
                onClick={event => {
                  event.preventDefault();
                  clearSelected();
                  setSelectedPublicLibrary(curPublicLibrary);
                }}
                type="button"
                className="marker-btn"
              >
                <img
                  src="https://img.icons8.com/dusk/64/000000/book-shelf.png"
                  alt="Public Library Icon"
                />
              </button>
            </Marker>
          ))}

          {starbucks.map(curStarbucks => (
            <Marker
              key={curStarbucks.storeId}
              latitude={curStarbucks.latitude}
              longitude={curStarbucks.longitude}
            >
              <button
                onClick={event => {
                  event.preventDefault();
                  clearSelected();
                  setSelectedStarbucks(curStarbucks);
                }}
                type="button"
                className="marker-btn"
              >
                <img
                  src="https://img.icons8.com/color/48/000000/starbucks.png"
                  alt="Starbucks Icon"
                />
              </button>
            </Marker>
          ))}

          {wholefoodsMarkets.map(curWholeFoods => (
            <Marker
              key={curWholeFoods.location.address}
              latitude={curWholeFoods.location.lat}
              longitude={curWholeFoods.location.lng}
            >
              <button
                onClick={event => {
                  event.preventDefault();
                  clearSelected();
                  setSelectedWholeFoods(curWholeFoods);
                }}
                type="button"
                className="marker-btn"
              >
                <img
                  src="https://img.icons8.com/color/48/000000/amazon.png"
                  alt="Whole Foods Market Icon"
                />
              </button>
            </Marker>
          ))}

          {allMeetups
            ? allMeetups.map(curMeetup => {
                return curMeetup.venue ? (
                  <Marker
                    key={curMeetup.id}
                    latitude={curMeetup.venue.lat}
                    longitude={curMeetup.venue.lon}
                  >
                    <button
                      onClick={event => {
                        event.preventDefault();
                        clearSelected();
                        setSelectedMeetup(curMeetup);
                      }}
                      type="button"
                      className="marker-btn"
                    >
                      <img
                        src="https://img.icons8.com/ios-filled/50/000000/meetup.png"
                        alt="Meetup Icon"
                      />
                    </button>
                  </Marker>
                ) : null;
              })
            : null}

          {users
            ? users.map(curUser => {
                if (curUser.id === auth.uid) {
                  if (userMarker.firstRenderWithUsers) {
                    setViewport({
                      ...viewport,
                      latitude: curUser.locationGeocode.lat,
                      longitude: curUser.locationGeocode.lon,
                    });
                    setUserMarker({
                      curUserLocationName: curUser.locationName,
                      firstRenderWithUsers: false,
                    });
                  }
                  return (
                    <Marker
                      key={curUser.id}
                      latitude={curUser.locationGeocode.lat}
                      longitude={curUser.locationGeocode.lon}
                    >
                      <img
                        className="marker-me"
                        src="https://img.icons8.com/dusk/64/000000/student-center.png"
                        alt="My Location Icon"
                      />
                    </Marker>
                  );
                } else if (curUser.status === 'Unemployed') {
                  return (
                    <Marker
                      key={curUser.id}
                      latitude={curUser.locationGeocode.lat}
                      longitude={curUser.locationGeocode.lon}
                    >
                      <button
                        onClick={event => {
                          event.preventDefault();
                          clearSelected();
                          setSelectedAlum(curUser);
                        }}
                        type="button"
                        className="marker-btn"
                      >
                        <img
                          className="marker-others"
                          src="https://img.icons8.com/dusk/64/000000/find-matching-job.png"
                          alt="Seeking Opportunities Others Location Icon"
                        />
                      </button>
                    </Marker>
                  );
                } else if (curUser.status === 'Employed') {
                  return (
                    <Marker
                      key={curUser.id}
                      latitude={curUser.locationGeocode.lat}
                      longitude={curUser.locationGeocode.lon}
                    >
                      <button
                        onClick={event => {
                          event.preventDefault();
                          clearSelected();
                          setSelectedAlum(curUser);
                        }}
                        type="button"
                        className="marker-btn"
                      >
                        <img
                          className="marker-others"
                          src="https://img.icons8.com/dusk/64/000000/new-job.png"
                          alt="Employed Others Location Icon"
                        />
                      </button>
                    </Marker>
                  );
                } else {
                  return (
                    <Marker
                      key={curUser.id}
                      latitude={curUser.locationGeocode.lat}
                      longitude={curUser.locationGeocode.lon}
                    >
                      <button
                        onClick={event => {
                          event.preventDefault();
                          clearSelected();
                          setSelectedAlum(curUser);
                        }}
                        type="button"
                        className="marker-btn"
                      >
                        <img
                          className="marker-others"
                          src="https://img.icons8.com/dusk/64/000000/student-male.png"
                          alt="Others Location Icon"
                        />
                      </button>
                    </Marker>
                  );
                }
              })
            : null}

          <Marker latitude={40.7042358} longitude={-73.9892133}>
            <button
              onClick={event => {
                event.preventDefault();
                clearSelected();
                setSelectedFreelancersHub(true);
              }}
              type="button"
              className="marker-btn"
            >
              <img
                src="https://img.icons8.com/dusk/64/000000/under-computer.png"
                alt="Freelancers Hub Location Icon"
              />
            </button>
          </Marker>

          <Marker latitude={40.7245956} longitude={-73.9976034}>
            <button
              onClick={event => {
                event.preventDefault();
                clearSelected();
                setSelectedAwsLoft(true);
              }}
              type="button"
              className="marker-btn"
            >
              <img
                src="https://img.icons8.com/dusk/64/000000/under-computer.png"
                alt="AWS Loft Location Icon"
              />
            </button>
          </Marker>

          <Marker latitude={40.7050758} longitude={-74.0113491}>
            <button
              onClick={event => {
                event.preventDefault();
                clearSelected();
                setSelectedCampus(true);
              }}
              type="button"
              className="marker-btn"
            >
              <img
                className="marker-fullstack"
                src="https://yt3.ggpht.com/a/AGF-l78JV4ZDPmU85HhYboU07siMZjFL_dHgm6o6Zg=s288-mo-c-c0xffffffff-rj-k-no"
                alt="Fullstack Academy Location Icon"
              />
            </button>
          </Marker>

          {selectedPublicLibrary ? (
            <Popup
              onClose={() => setSelectedPublicLibrary(null)}
              latitude={selectedPublicLibrary.lat}
              longitude={selectedPublicLibrary.lon}
              closeOnClick={false}
            >
              <div className="text-style-bold location-description">
                {selectedPublicLibrary.oversightAgency} -{' '}
                {selectedPublicLibrary.address}
              </div>

              <hr />

              <div className="navigation-container">
                <div className="navigation-containee">
                  <span className="text-style-bold">Opening Hours</span>

                  <div>
                    <span className="text-style-bold">Monday: </span>
                    {selectedPublicLibrary.monOpen} -{' '}
                    {selectedPublicLibrary.monClose}
                    {selectedPublicLibrary.monReopen
                      ? `, ${selectedPublicLibrary.monReopen}-${selectedPublicLibrary.monReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="text-style-bold">Tuesday: </span>
                    {selectedPublicLibrary.tueOpen} -{' '}
                    {selectedPublicLibrary.tueClose}
                    {selectedPublicLibrary.tueReopen
                      ? `, ${selectedPublicLibrary.tueReopen}-${selectedPublicLibrary.tueReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="text-style-bold">Wednesday: </span>
                    {selectedPublicLibrary.wedOpen} -{' '}
                    {selectedPublicLibrary.wedClose}
                    {selectedPublicLibrary.wedReopen
                      ? `, ${selectedPublicLibrary.wedReopen}-${selectedPublicLibrary.wedReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="text-style-bold">Thursday: </span>
                    {selectedPublicLibrary.thuOpen} -{' '}
                    {selectedPublicLibrary.thuClose}
                    {selectedPublicLibrary.thuReopen
                      ? `, ${selectedPublicLibrary.thuReopen}-${selectedPublicLibrary.thuReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="text-style-bold">Friday: </span>
                    {selectedPublicLibrary.friOpen} -{' '}
                    {selectedPublicLibrary.friClose}
                    {selectedPublicLibrary.friReopen
                      ? `, ${selectedPublicLibrary.friReopen}-${selectedPublicLibrary.friReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="text-style-bold">Saturday: </span>
                    {selectedPublicLibrary.satOpen} -{' '}
                    {selectedPublicLibrary.satClose}
                    {selectedPublicLibrary.satReopen
                      ? `, ${selectedPublicLibrary.satReopen}-${selectedPublicLibrary.satReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="text-style-bold">Sunday: </span>
                    {selectedPublicLibrary.sunOpen === 'Closed' ? (
                      selectedPublicLibrary.sunOpen
                    ) : (
                      <div>
                        {selectedPublicLibrary.sunOpen} -{' '}
                        {selectedPublicLibrary.sunClose}
                        {selectedPublicLibrary.sunReopen
                          ? `, ${selectedPublicLibrary.sunReopen}-${selectedPublicLibrary.sunReclose}`
                          : null}
                      </div>
                    )}
                  </div>
                </div>

                <br />

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userMarker.curUserLocationName.replace(
                    regex,
                    '+'
                  )}+Subway+Station&destination=${selectedPublicLibrary.oversightAgency.replace(
                    regex,
                    '+'
                  )}+${selectedPublicLibrary.address.replace(
                    regex,
                    '+'
                  )}&travelmode=transit`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">Navigate</span>
                </a>
              </div>
            </Popup>
          ) : null}

          {selectedStarbucks ? (
            <Popup
              onClose={() => setSelectedStarbucks(null)}
              latitude={selectedStarbucks.latitude}
              longitude={selectedStarbucks.longitude}
              closeOnClick={false}
            >
              <div className="text-style-bold location-description">
                Starbucks - {selectedStarbucks.name}
              </div>

              <hr />

              <div className="navigation-container">
                {/* <div className="text-style-bold">Closes at: 10 PM</div> */}

                <br />

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userMarker.curUserLocationName.replace(
                    regex,
                    '+'
                  )}+Subway+Station&destination=Starbucks+${selectedStarbucks.name.replace(
                    regex,
                    '+'
                  )}&travelmode=transit`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">Navigate</span>
                </a>
              </div>
            </Popup>
          ) : null}

          {selectedWholeFoods ? (
            <Popup
              onClose={() => setSelectedWholeFoods(null)}
              latitude={selectedWholeFoods.location.lat}
              longitude={selectedWholeFoods.location.lng}
              closeOnClick={false}
            >
              <div className="text-style-bold location-description">
                Whole Foods Market - {selectedWholeFoods.location.address}
              </div>

              <hr />

              <div className="navigation-container">
                <div className="text-style-bold navigation-containee">
                  Opening Hours
                </div>

                <div className="navigation-containee">
                  Monday through Sunday, 8:00 AM - 10:00 PM
                </div>

                <br />

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userMarker.curUserLocationName.replace(
                    regex,
                    '+'
                  )}+Subway+Station&destination=Whole+Foods+Market+${selectedWholeFoods.location.address.replace(
                    regex,
                    '+'
                  )}&travelmode=transit`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">Navigate</span>
                </a>
              </div>
            </Popup>
          ) : null}

          {selectedMeetup ? (
            <Popup
              onClose={() => setSelectedMeetup(null)}
              latitude={selectedMeetup.venue.lat}
              longitude={selectedMeetup.venue.lon}
              closeOnClick={false}
            >
              <div className="text-style-bold location-description">
                {selectedMeetup.venue.address_1}
              </div>

              <hr />

              <div className="navigation-container">
                <div>
                  <span className="text-style-bold">Meetup Title: </span>
                  {selectedMeetup.name}
                </div>

                <div>
                  <span className="text-style-bold">Date: </span>
                  {moment(selectedMeetup.time).format('LLLL')}
                </div>

                <a
                  href={selectedMeetup.event_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">
                    {`RSVP (${selectedMeetup.yes_rsvp_count}${
                      selectedMeetup.rsvp_limit
                        ? '/' + selectedMeetup.rsvp_limit
                        : ''
                    })`}
                  </span>
                </a>

                <br />

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userMarker.curUserLocationName.replace(
                    regex,
                    '+'
                  )}+Subway+Station&destination=WeWork+${selectedMeetup.venue.address_1.replace(
                    regex,
                    '+'
                  )}&travelmode=transit`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">Navigate</span>
                </a>
              </div>
            </Popup>
          ) : null}

          {selectedAlum ? (
            <Popup
              onClose={() => setSelectedAlum(null)}
              latitude={selectedAlum.locationGeocode.lat}
              longitude={selectedAlum.locationGeocode.lon}
              closeOnClick={false}
            >
              <div className="text-style-bold location-description">
                {`${selectedAlum.firstName} ${selectedAlum.lastName}`}
              </div>

              <hr />

              <div className="location-description">
                <span className="text-style-bold">Gender: </span>
                {selectedAlum.gender}
              </div>

              <div className="location-description">
                <span className="text-style-bold">Cohort: </span>
                {`${selectedAlum.cohort}-${selectedAlum.program}`}
              </div>

              <div className="location-description">
                {selectedAlum.status === 'Employed' ? (
                  <span>
                    <span className="text-style-bold">Company: </span>
                    {selectedAlum.company}
                  </span>
                ) : (
                  <span>
                    <span className="text-style-bold">Status: </span>
                    {selectedAlum.status === 'Unemployed'
                      ? 'Seeking Opportunities'
                      : selectedAlum.status}
                  </span>
                )}
              </div>

              <div className="location-description">
                <span className="text-style-bold">Email: </span>

                <a
                  href={`mailto:${selectedAlum.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">{selectedAlum.email}</span>
                </a>
              </div>

              <div className="location-description">
                <span className="text-style-bold">Subway Station: </span>
                {selectedAlum.locationName}
              </div>
            </Popup>
          ) : null}

          {selectedFreelancersHub ? (
            <Popup
              onClose={() => setSelectedFreelancersHub(false)}
              latitude={40.7042358}
              longitude={-73.9892133}
              closeOnClick={false}
            >
              <div className="text-style-bold location-description">
                Freelancers Hub - 30 John Street, Brooklyn
              </div>

              <hr />

              <div className="navigation-container">
                <div className="text-style-bold navigation-containee">
                  Opening Hours
                </div>

                <div className="navigation-containee">
                  Monday through Friday, 9:00 AM - 5:00 PM
                </div>

                <a
                  href="https://freelancershub.nymediacenter.com/member/daypass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">RSVP</span>
                </a>

                <br />

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userMarker.curUserLocationName.replace(
                    regex,
                    '+'
                  )}+Subway+Station&destination=Freelancers+Hub&travelmode=transit`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">Navigate</span>
                </a>
              </div>
            </Popup>
          ) : null}

          {selectedAwsLoft ? (
            <Popup
              onClose={() => setSelectedAwsLoft(false)}
              latitude={40.7245956}
              longitude={-73.9976034}
              closeOnClick={false}
            >
              <div className="text-style-bold location-description">
                AWS Loft - 350 West Broadway, New York
              </div>

              <hr />

              <div className="navigation-container">
                <div className="text-style-bold navigation-containee">
                  Opening Hours
                </div>

                <div className="navigation-containee">
                  Monday through Friday, 9:30 AM - 5:30 PM
                </div>

                <a
                  href="https://aws.amazon.com/start-ups/loft/ny-loft"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">RSVP</span>
                </a>

                <br />

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userMarker.curUserLocationName.replace(
                    regex,
                    '+'
                  )}+Subway+Station&destination=AWS+Loft&travelmode=transit`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">Navigate</span>
                </a>
              </div>
            </Popup>
          ) : null}

          {selectedCampus ? (
            <Popup
              onClose={() => setSelectedCampus(false)}
              latitude={40.7050758}
              longitude={-74.0113491}
              closeOnClick={false}
            >
              <div className="text-style-bold location-description">
                Fullstack Academy of Code - 5 Hanover Square, New York
              </div>

              <hr />

              <div className="navigation-container">
                <div className="text-style-bold">
                  {'Next Hacker Hours Meetup: '}
                </div>

                <div>Every second Monday of the month, 6:30 PM - 9:30 PM</div>

                <a
                  href="https://www.eventbrite.com/e/hacker-hours-at-fullstack-academy-tickets-98250793769?aff=erelexpmlt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">RSVP</span>
                </a>

                <br />

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userMarker.curUserLocationName.replace(
                    regex,
                    '+'
                  )}+Subway+Station&destination=Fullstack+Academy&travelmode=transit`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-style-bold">Navigate</span>
                </a>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
  allMeetups: state.meetups.allMeetups,
  fetchedMeetups: state.meetups.fetchedMeetups,
});

const mapDispatchToProps = dispatch => ({
  getMeetupsThunk() {
    dispatch(getMeetupsThunkCreator());
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: 'users',
    },
  ])
)(Map);

// Prop Types
Map.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.array,
  allMeetups: PropTypes.array,
  fetchedMeetups: PropTypes.bool,
  getMeetupsThunk: PropTypes.func,
};
