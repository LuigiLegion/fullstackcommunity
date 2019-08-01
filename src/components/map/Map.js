// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import * as starbucksData from '../../data/starbucks-locations.json';
import * as wholeFoodsData from '../../data/whole-foods-market-locations.json';
import * as publicLibrariesData from '../../data/public-library-locations.json';

// const citiesOfInterest = [
//   'New York',
//   'Brooklyn',
//   'Bronx',
//   'Staten Island',
//   'Astoria',
//   'Jackson Heights',
//   'Sunnyside',
//   'Bayside',
//   'Bellerose',
//   'Flushing',
//   'Fresh Meadows',
//   'Whitestone',
//   'Elmhurst',
//   'Forest Hills',
//   'Kew Gardens',
//   'Rego Park',
//   'Woodside',
//   'Jamaica',
//   'Howard Beach',
//   'Richmond Hill',
//   'Rockaway',
//   // 'Chicago',
// ];

let firstRenderWithUsers = true;
let curUserLocationName = '';

function useForceUpdate() {
  const [value, set] = useState(true);
  return () => set(!value);
}

const Map = ({ auth, users }) => {
  const [viewport, setViewport] = useState({
    latitude: 40.7531823,
    longitude: -73.9844421,
    width: '100vw',
    height: '91vh',
    zoom: 14,
  });

  const [selectedAlum, setSelectedAlum] = useState(null);

  const [selectedCampus, setSelectedCampus] = useState(false);

  const [selectedFreelancersHub, setSelectedFreelancersHub] = useState(false);

  const [selectedMeetup, setSelectedMeetup] = useState(null);

  const [selectedStarbucks, setSelectedStarbucks] = useState(null);

  const [selectedWholeFoods, setSelectedWholeFoods] = useState(null);

  const [selectedPublicLibrary, setSelectedPublicLibrary] = useState(null);

  const forceUpdate = useForceUpdate();

  const allMeetups = JSON.parse(localStorage.meetups);

  // console.log('auth: ', auth, 'users: ', users);

  // useEffect(() => {
  //   console.log('IN THE USEFFECT');
  //   const listener = event => {
  //     console.log('IN THE USEFFECT IF');
  //     if (event.key === 'Escape') {
  //       console.log('KEY IS ESCAPE');
  //       setSelectedStarbucks(null);
  //     }
  //   };
  //   console.log('window before add: ', window);
  //   window.addEventListener('keydown', listener);
  //   console.log('window after add: ', window);
  //   return () => {
  //     window.removeEventListener('keydown', listener);
  //     console.log('window after remove: ', window);
  //   };
  // }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibHVpZ2lsZWdpb24iLCJhIjoiY2p4N2luaGI3MGF4YjQwbnBqeDJyenh1aiJ9.sXpWHhDhquAAaheRvujObA"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {publicLibrariesData.branches.map(curPublicLibrary => {
          return (
            <Marker
              key={curPublicLibrary.id}
              latitude={curPublicLibrary.lat}
              longitude={curPublicLibrary.lon}
            >
              <button
                onClick={event => {
                  event.preventDefault();
                  setSelectedPublicLibrary(curPublicLibrary);
                }}
                className="marker-btn"
              >
                <img
                  // src="https://img.icons8.com/dusk/64/000000/book.png"
                  src="https://img.icons8.com/dusk/64/000000/book-shelf.png"
                  alt="Public Library Icon"
                />
              </button>
            </Marker>
          );
        })}

        {starbucksData.branches.map(curStarbucks => {
          // if (citiesOfInterest.includes(curStarbucks.city)) {
          //   return (
          //     <Marker
          //       key={curStarbucks.store_id}
          //       latitude={curStarbucks.latitude}
          //       longitude={curStarbucks.longitude}
          //     >
          //       <button
          //         onClick={event => {
          //           event.preventDefault();
          //           setSelectedStarbucks(curStarbucks);
          //         }}
          //         className="marker-btn"
          //       >
          //         <img
          //           src="https://img.icons8.com/color/48/000000/starbucks.png"
          //           alt="Starbucks Icon"
          //         />
          //       </button>
          //     </Marker>
          //   );
          // } else {
          //   return null;
          // }

          return (
            <Marker
              key={curStarbucks.storeId}
              latitude={curStarbucks.latitude}
              longitude={curStarbucks.longitude}
            >
              <button
                onClick={event => {
                  event.preventDefault();
                  setSelectedStarbucks(curStarbucks);
                }}
                className="marker-btn"
              >
                <img
                  // src="https://img.icons8.com/nolan/64/000000/starbucks.png"
                  src="https://img.icons8.com/color/48/000000/starbucks.png"
                  alt="Starbucks Icon"
                />
              </button>
            </Marker>
          );
        })}

        {wholeFoodsData.branches.map(curWholeFoods => {
          return (
            <Marker
              key={curWholeFoods.location.address}
              latitude={curWholeFoods.location.lat}
              longitude={curWholeFoods.location.lng}
            >
              <button
                onClick={event => {
                  event.preventDefault();
                  setSelectedWholeFoods(curWholeFoods);
                }}
                className="marker-btn"
              >
                <img
                  // src="https://img.icons8.com/dusk/64/000000/amazon.png"
                  src="https://img.icons8.com/color/48/000000/amazon.png"
                  alt="Whole Foods Market Icon"
                />
              </button>
            </Marker>
          );
        })}

        {allMeetups
          ? allMeetups.map(curMeetup => {
              return (
                <Marker
                  key={curMeetup.id}
                  latitude={curMeetup.venue.lat}
                  longitude={curMeetup.venue.lon}
                >
                  <button
                    onClick={event => {
                      event.preventDefault();
                      setSelectedMeetup(curMeetup);
                    }}
                    className="marker-btn"
                  >
                    <img
                      // src="https://img.icons8.com/ios/50/000000/meetup.png"
                      src="https://img.icons8.com/ios-filled/50/000000/meetup.png"
                      alt="Meetup Icon"
                    />
                  </button>
                </Marker>
              );
            })
          : null}

        {users
          ? users.map(curUser => {
              // console.log(curUser);
              if (curUser.id === auth.uid) {
                if (firstRenderWithUsers) {
                  viewport.latitude = curUser.locationGeocode.lat;
                  viewport.longitude = curUser.locationGeocode.lon;
                  firstRenderWithUsers = !firstRenderWithUsers;
                  curUserLocationName = curUser.locationName;
                  forceUpdate();
                }
                return (
                  <Marker
                    key={curUser.id}
                    latitude={curUser.locationGeocode.lat}
                    longitude={curUser.locationGeocode.lon}
                  >
                    <img
                      className="marker-me"
                      // src="https://img.icons8.com/ultraviolet/40/000000/marker.png"
                      src="https://img.icons8.com/dusk/64/000000/student-center.png"
                      alt="My Location Icon"
                    />
                  </Marker>
                );
              } else {
                if (curUser.status === 'Unemployed') {
                  return (
                    <Marker
                      key={curUser.id}
                      latitude={curUser.locationGeocode.lat}
                      longitude={curUser.locationGeocode.lon}
                    >
                      <button
                        onClick={event => {
                          event.preventDefault();
                          setSelectedAlum(curUser);
                        }}
                        className="marker-btn"
                      >
                        <img
                          className="marker-others"
                          // src="https://img.icons8.com/office/40/000000/marker.png"
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
                          setSelectedAlum(curUser);
                        }}
                        className="marker-btn"
                      >
                        <img
                          className="marker-others"
                          // src="https://img.icons8.com/color/48/000000/briefcase.png"
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
                          setSelectedAlum(curUser);
                        }}
                        className="marker-btn"
                      >
                        <img
                          className="marker-others"
                          // src="https://img.icons8.com/ios/50/000000/student-registration-filled.png"
                          src="https://img.icons8.com/dusk/64/000000/student-male.png"
                          alt="Others Location Icon"
                        />
                      </button>
                    </Marker>
                  );
                }
              }
            })
          : null}

        <Marker latitude={40.7042358} longitude={-73.9892133}>
          <button
            onClick={event => {
              event.preventDefault();
              setSelectedFreelancersHub(true);
            }}
            className="marker-btn"
          >
            <img
              // src="https://img.icons8.com/wired/64/000000/under-computer.png"
              src="https://img.icons8.com/dusk/64/000000/under-computer.png"
              alt="Freelancers Hub Location Icon"
            />
          </button>
        </Marker>

        <Marker latitude={40.7050758} longitude={-74.0113491}>
          <button
            onClick={event => {
              event.preventDefault();
              setSelectedCampus(true);
            }}
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
            onClose={() => {
              setSelectedPublicLibrary(null);
            }}
            latitude={selectedPublicLibrary.lat}
            longitude={selectedPublicLibrary.lon}
          >
            <div className="location-description">
              <strong>
                {selectedPublicLibrary.oversightAgency} -{' '}
                {selectedPublicLibrary.address}
              </strong>
            </div>
            <hr />
            <div className="navigation-container">
              <div className="navigation-containee">
                <strong>Opening Hours</strong>
                <div>
                  <strong>Monday: </strong>
                  {selectedPublicLibrary.monOpen} -{' '}
                  {selectedPublicLibrary.monClose}
                  {selectedPublicLibrary.monReopen
                    ? `, ${selectedPublicLibrary.monReopen}-${
                        selectedPublicLibrary.monReclose
                      }`
                    : null}
                </div>
                <div>
                  <strong>Tuesday: </strong>
                  {selectedPublicLibrary.tueOpen} -{' '}
                  {selectedPublicLibrary.tueClose}
                  {selectedPublicLibrary.tueReopen
                    ? `, ${selectedPublicLibrary.tueReopen}-${
                        selectedPublicLibrary.tueReclose
                      }`
                    : null}
                </div>
                <div>
                  <strong>Wednesday: </strong>
                  {selectedPublicLibrary.wedOpen} -{' '}
                  {selectedPublicLibrary.wedClose}
                  {selectedPublicLibrary.wedReopen
                    ? `, ${selectedPublicLibrary.wedReopen}-${
                        selectedPublicLibrary.wedReclose
                      }`
                    : null}
                </div>
                <div>
                  <strong>Thursday: </strong>
                  {selectedPublicLibrary.thuOpen} -{' '}
                  {selectedPublicLibrary.thuClose}
                  {selectedPublicLibrary.thuReopen
                    ? `, ${selectedPublicLibrary.thuReopen}-${
                        selectedPublicLibrary.thuReclose
                      }`
                    : null}
                </div>
                <div>
                  <strong>Friday: </strong>
                  {selectedPublicLibrary.friOpen} -{' '}
                  {selectedPublicLibrary.friClose}
                  {selectedPublicLibrary.friReopen
                    ? `, ${selectedPublicLibrary.friReopen}-${
                        selectedPublicLibrary.friReclose
                      }`
                    : null}
                </div>
                <div>
                  <strong>Saturday: </strong>
                  {selectedPublicLibrary.satOpen} -{' '}
                  {selectedPublicLibrary.satClose}
                  {selectedPublicLibrary.satReopen
                    ? `, ${selectedPublicLibrary.satReopen}-${
                        selectedPublicLibrary.satReclose
                      }`
                    : null}
                </div>
                <div>
                  <strong>Sunday: </strong>
                  {selectedPublicLibrary.sunOpen === 'Closed' ? (
                    selectedPublicLibrary.sunOpen
                  ) : (
                    <div>
                      {selectedPublicLibrary.sunOpen} -{' '}
                      {selectedPublicLibrary.sunClose}
                      {selectedPublicLibrary.sunReopen
                        ? `, ${selectedPublicLibrary.sunReopen}-${
                            selectedPublicLibrary.sunReclose
                          }`
                        : null}
                    </div>
                  )}
                </div>
              </div>
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${curUserLocationName
                  .split(' ')
                  .join(
                    '+'
                  )}+Station&destination=${selectedPublicLibrary.oversightAgency
                  .split(' ')
                  .join('+')}+${selectedPublicLibrary.address
                  .split(' ')
                  .join('+')}&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Navigate</strong>
              </a>
            </div>
          </Popup>
        ) : null}

        {selectedStarbucks ? (
          <Popup
            onClose={() => {
              setSelectedStarbucks(null);
            }}
            latitude={selectedStarbucks.latitude}
            longitude={selectedStarbucks.longitude}
          >
            <div className="location-description">
              <strong>Starbucks - {selectedStarbucks.name}</strong>
            </div>
            <hr />
            <div className="navigation-container">
              {/* <div>
                <strong>Closes at: 10PM</strong>
              </div> */}
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${curUserLocationName
                  .split(' ')
                  .join(
                    '+'
                  )}+Station&destination=Starbucks+${selectedStarbucks.name
                  .split(' ')
                  .join('+')}&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Navigate</strong>
              </a>
            </div>
          </Popup>
        ) : null}

        {selectedWholeFoods ? (
          <Popup
            onClose={() => {
              setSelectedWholeFoods(null);
            }}
            latitude={selectedWholeFoods.location.lat}
            longitude={selectedWholeFoods.location.lng}
          >
            <div className="location-description">
              <strong>
                Whole Foods Market - {selectedWholeFoods.location.address}
              </strong>
            </div>
            <hr />
            <div className="navigation-container">
              <div className="navigation-containee">
                <strong>Opening Hours</strong>
              </div>
              <div className="navigation-containee">
                8AM - 10PM, Monday through Sunday
              </div>
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${curUserLocationName
                  .split(' ')
                  .join(
                    '+'
                  )}+Station&destination=Whole+Foods+Market+${selectedWholeFoods.location.address
                  .split(' ')
                  .join('+')}&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Navigate</strong>
              </a>
            </div>
          </Popup>
        ) : null}

        {selectedMeetup ? (
          <Popup
            onClose={() => {
              setSelectedMeetup(null);
            }}
            latitude={selectedMeetup.venue.lat}
            longitude={selectedMeetup.venue.lon}
          >
            <div className="location-description">
              <strong>WeWork - {selectedMeetup.venue.address_1}</strong>
            </div>
            <hr />
            <div className="navigation-container">
              <div>
                <strong>Meetup Title: </strong>
                {selectedMeetup.name}
              </div>
              <div>
                <strong>Date: </strong>
                {new Date(selectedMeetup.time).toString().slice(0, 15)}
              </div>
              <a
                href={selectedMeetup.event_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedMeetup.rsvp_limit ? (
                  <span>
                    <strong>
                      RSVP ({selectedMeetup.yes_rsvp_count}/
                      {selectedMeetup.rsvp_limit} Attending)
                    </strong>
                  </span>
                ) : (
                  <span>
                    <strong>
                      RSVP ({selectedMeetup.yes_rsvp_count} Attending)
                    </strong>
                  </span>
                )}
              </a>
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${curUserLocationName
                  .split(' ')
                  .join(
                    '+'
                  )}+Station&destination=WeWork+${selectedMeetup.venue.address_1
                  .split(' ')
                  .join('+')}&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Navigate</strong>
              </a>
            </div>
          </Popup>
        ) : null}

        {selectedAlum ? (
          <Popup
            onClose={() => {
              setSelectedAlum(null);
            }}
            latitude={selectedAlum.locationGeocode.lat}
            longitude={selectedAlum.locationGeocode.lon}
          >
            <div className="location-description">
              <strong>{`${selectedAlum.firstName} ${
                selectedAlum.lastName
              }`}</strong>
            </div>
            <hr />
            <div className="location-description">
              <strong>Gender: </strong>
              {selectedAlum.gender}
            </div>
            <div className="location-description">
              <strong>Cohort: </strong>
              {`${selectedAlum.cohort}-${selectedAlum.program}`}
            </div>
            <div className="location-description">
              {selectedAlum.status === 'Employed' ? (
                <span>
                  <strong>Works at: </strong>
                  {selectedAlum.company}
                </span>
              ) : (
                <span>
                  <strong>Status: </strong>
                  {selectedAlum.status === 'Unemployed'
                    ? 'Seeking Opportunities'
                    : selectedAlum.status}
                </span>
              )}
            </div>
            <div className="location-description">
              <strong>Contact Information: </strong>
              <a
                href={`mailto:${selectedAlum.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{selectedAlum.email}</strong>
              </a>
            </div>
            <div className="location-description">
              <strong>Subway Station: </strong>
              {selectedAlum.locationName}
            </div>
          </Popup>
        ) : null}

        {selectedCampus ? (
          <Popup
            onClose={() => {
              setSelectedCampus(false);
            }}
            latitude={40.7050758}
            longitude={-74.0113491}
          >
            <div className="location-description">
              <strong>Fullstack Academy of Code</strong>
            </div>
            <hr />
            <div className="navigation-container">
              <div>
                <strong>Next Hacker Hours Meetup: </strong>Monday, August 12th,
                6:30PM-9:30PM EDT
              </div>
              <a
                href={
                  'https://www.eventbrite.com/e/hacker-hours-at-fullstack-academy-tickets-63423857465?aff=eac2'
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>RSVP</strong>
              </a>
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${curUserLocationName
                  .split(' ')
                  .join(
                    '+'
                  )}+Station&destination=Fullstack+Academy&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Navigate</strong>
              </a>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'users',
    },
  ])
)(Map);

Map.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.array,
};
