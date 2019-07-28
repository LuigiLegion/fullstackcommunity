// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// import { getEventsThunkCreator } from '../../store/reducers/eventsReducer';
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

const Map = ({ auth, users, events }) => {
  const [viewport, setViewport] = useState({
    latitude: 40.7531823,
    longitude: -73.9844421,
    width: '100vw',
    height: '91vh',
    zoom: 14,
  });

  const [selectedAlum, setSelectedAlum] = useState(null);

  const [selectedCampus, setSelectedCampus] = useState(false);

  const [selectedStarbucks, setSelectedStarbucks] = useState(null);

  const [selectedWholeFoods, setSelectedWholeFoods] = useState(null);

  const [selectedPublicLibrary, setSelectedPublicLibrary] = useState(null);

  const [selectedMeetup, setSelectedMeetup] = useState(null);

  const forceUpdate = useForceUpdate();

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
              alt="Fullstack Academy Location"
            />
          </button>
        </Marker>

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
                      alt="My Location"
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
                          alt="Unemployed Others Location"
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
                          alt="Employed Others Location"
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
                          alt="Others Location"
                        />
                      </button>
                    </Marker>
                  );
                }
              }
            })
          : null}

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
                  src="https://img.icons8.com/color/48/000000/amazon.png"
                  alt="Whole Foods Icon"
                />
              </button>
            </Marker>
          );
        })}

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

        {events.allEvents
          ? events.allEvents.map(curMeetup => {
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
                      alt="Whole Foods Icon"
                    />
                  </button>
                </Marker>
              );
            })
          : null}

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
              {selectedAlum.email}
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
                RSVP
              </a>
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${curUserLocationName
                  .split(' ')
                  .join('+')}&destination=Fullstack+Academy&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Navigate
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
                  )}&destination=Starbucks+${selectedStarbucks.name
                  .split(' ')
                  .join('+')}&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Navigate
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
              <div>
                <strong>Opening Hours: </strong>8AM-10PM EDT, Monday through
                Sunday
              </div>
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${curUserLocationName
                  .split(' ')
                  .join(
                    '+'
                  )}&destination=Whole+Foods+Market+${selectedWholeFoods.location.address
                  .split(' ')
                  .join('+')}&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Navigate
              </a>
            </div>
          </Popup>
        ) : null}

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
              <div>
                <strong>Opening Hours:</strong>
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
                  )}&destination=${selectedPublicLibrary.oversightAgency
                  .split(' ')
                  .join('+')}+${selectedPublicLibrary.address
                  .split(' ')
                  .join('+')}&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Navigate
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
              {/* <div>
                <strong>Opening Hours: </strong>8AM-10PM EDT, Monday through
                Sunday
              </div> */}
              <div>
                <strong>{selectedMeetup.name}</strong>
              </div>
              <a
                href={selectedMeetup.event_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                RSVP
              </a>
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${curUserLocationName
                  .split(' ')
                  .join(
                    '+'
                  )}&destination=WeWork+${selectedMeetup.venue.address_1
                  .split(' ')
                  .join('+')}&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Navigate
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
  events: state.events,
});

// const mapDispatchToProps = dispatch => ({
//   getEventsThunk() {
//     dispatch(getEventsThunkCreator());
//   },
// });

export default compose(
  connect(
    mapStateToProps
    // mapDispatchToProps
  ),
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
