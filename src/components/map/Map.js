// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import * as starbucksData from '../../data/starbucks-locations.json';
import * as wholeFoodsData from '../../data/whole-foods-market-locations.json';

const citiesOfInterest = [
  'New York',
  'Brooklyn',
  'Bronx',
  'Staten Island',
  'Astoria',
  'Jackson Heights',
  'Sunnyside',
  'Bayside',
  'Bellerose',
  'Flushing',
  'Fresh Meadows',
  'Whitestone',
  'Elmhurst',
  'Forest Hills',
  'Kew Gardens',
  'Rego Park',
  'Woodside',
  'Jamaica',
  'Howard Beach',
  'Richmond Hill',
  'Rockaway',
  // 'Chicago',
];

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

  const [selectedStarbucks, setSelectedStarbucks] = useState(null);

  const [selectedWholeFoods, setSelectedWholeFoods] = useState(null);

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
          <img
            className="marker-fullstack"
            src="https://yt3.ggpht.com/a/AGF-l78JV4ZDPmU85HhYboU07siMZjFL_dHgm6o6Zg=s288-mo-c-c0xffffffff-rj-k-no"
            alt="My Location"
          />
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
                      src="https://img.icons8.com/ultraviolet/40/000000/marker.png"
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
                          src="https://img.icons8.com/office/40/000000/marker.png"
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
                          src="https://img.icons8.com/color/48/000000/briefcase.png"
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
                          src="https://img.icons8.com/ios/50/000000/student-registration-filled.png"
                          alt="Employed Others Location"
                        />
                      </button>
                    </Marker>
                  );
                }
              }
            })
          : null}

        {starbucksData.branches.map(curStarbucks => {
          if (citiesOfInterest.includes(curStarbucks.city)) {
            return (
              <Marker
                key={curStarbucks.store_id}
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
                    src="https://img.icons8.com/color/48/000000/starbucks.png"
                    alt="Starbucks Icon"
                  />
                </button>
              </Marker>
            );
          } else {
            return null;
          }
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
                  {selectedAlum.status}
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

        {selectedStarbucks ? (
          <Popup
            onClose={() => {
              setSelectedStarbucks(null);
            }}
            latitude={selectedStarbucks.latitude}
            longitude={selectedStarbucks.longitude}
          >
            <div className="location-description">
              <strong>{selectedStarbucks.name}</strong>
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
              <strong>{selectedWholeFoods.location.address}</strong>
            </div>
            <hr />
            <div className="navigation-container">
              <div>
                <strong>Opening Hours: </strong>8AM-10PM, Monday through Sunday
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
