/* eslint-disable complexity */

// Imports
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ReactMapGL from 'react-map-gl';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import {
  MapMarker,
  MapPopup,
  MapPopupAlum,
  MapPopupLibrary,
  MapPopupMeetup,
} from '..';
import { getMeetupsThunkCreator } from '../../store';
import { locations as libraries } from '../../data/public-library-locations';
import { locations as starbucks } from '../../data/starbucks-locations';
import { locations as wholeFoods } from '../../data/whole-foods-market-locations';

// Component
const Map = ({ auth, users, meetups, fetchedMeetups, getMeetupsThunk }) => {
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
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  const clearSelected = () => {
    setSelectedAlum(null);
    setSelectedCampus(null);
    setSelectedAwsLoft(null);
    setSelectedFreelancersHub(null);
    setSelectedMeetup(null);
    setSelectedStarbucks(null);
    setSelectedWholeFoods(null);
    setSelectedLibrary(null);
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
      <ReactMapGL
        {...viewport}
        onViewportChange={newViewport => {
          setViewport({
            ...viewport,
            latitude: newViewport.latitude,
            longitude: newViewport.longitude,
            zoom: newViewport.zoom,
          });
        }}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClick={clearSelected}
      >
        {libraries.map(curLibrary => (
          <MapMarker
            key={curLibrary.id}
            location={curLibrary}
            latitude={curLibrary.lat}
            longitude={curLibrary.lon}
            setSelected={setSelectedLibrary}
            clearSelected={clearSelected}
            src="/icons/library.png"
            alt="Public Library Location Icon"
          />
        ))}

        {starbucks.map(curStarbucks => (
          <MapMarker
            key={curStarbucks.storeId}
            location={curStarbucks}
            latitude={curStarbucks.latitude}
            longitude={curStarbucks.longitude}
            setSelected={setSelectedStarbucks}
            clearSelected={clearSelected}
            src="/icons/starbucks.png"
            alt="Starbucks Location Icon"
          />
        ))}

        {wholeFoods.map(curWholeFoods => (
          <MapMarker
            key={curWholeFoods.location.address}
            location={curWholeFoods}
            latitude={curWholeFoods.location.lat}
            longitude={curWholeFoods.location.lng}
            setSelected={setSelectedWholeFoods}
            clearSelected={clearSelected}
            src="/icons/whole-foods.png"
            alt="Whole Foods Market Location Icon"
          />
        ))}

        {meetups
          ? meetups.map(curMeetup => {
              return curMeetup.venue ? (
                <MapMarker
                  key={curMeetup.id}
                  location={curMeetup}
                  latitude={curMeetup.venue.lat}
                  longitude={curMeetup.venue.lon}
                  setSelected={setSelectedMeetup}
                  clearSelected={clearSelected}
                  src="/icons/meetup.png"
                  alt="Meetup Location Icon"
                />
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
                  <MapMarker
                    key={curUser.id}
                    location={curUser}
                    latitude={curUser.locationGeocode.lat}
                    longitude={curUser.locationGeocode.lon}
                    setSelected={setSelectedAlum}
                    clearSelected={clearSelected}
                    src="/icons/home.png"
                    alt="My Location Icon"
                  />
                );
              } else {
                return (
                  <MapMarker
                    key={curUser.id}
                    location={curUser}
                    latitude={curUser.locationGeocode.lat}
                    longitude={curUser.locationGeocode.lon}
                    setSelected={setSelectedAlum}
                    clearSelected={clearSelected}
                    src={`/icons/${curUser.status.toLowerCase()}.png`}
                    alt={`${curUser.status} Alum Location Icon`}
                  />
                );
              }
            })
          : null}

        <MapMarker
          latitude={40.7042358}
          longitude={-73.9892133}
          setSelected={setSelectedFreelancersHub}
          clearSelected={clearSelected}
          src="/icons/work-space.png"
          alt="Freelancers Hub Work Space Location Icon"
        />

        <MapMarker
          latitude={40.7245956}
          longitude={-73.9976034}
          setSelected={setSelectedAwsLoft}
          clearSelected={clearSelected}
          src="/icons/work-space.png"
          alt="AWS Loft Work Space Location Icon"
        />

        <MapMarker
          latitude={40.7050758}
          longitude={-74.0113491}
          setSelected={setSelectedCampus}
          clearSelected={clearSelected}
          src="/icons/fullstack-academy.png"
          alt="Fullstack Academy Campus Location Icon"
        />

        {selectedLibrary ? (
          <MapPopupLibrary
            selectedLibrary={selectedLibrary}
            setSelectedLibrary={setSelectedLibrary}
            userLocation={userMarker.curUserLocationName}
          />
        ) : null}

        {selectedStarbucks ? (
          <MapPopup
            latitude={selectedStarbucks.latitude}
            longitude={selectedStarbucks.longitude}
            setSelected={setSelectedStarbucks}
            type="Starbucks"
            address={selectedStarbucks.name}
            openingHours="Closes at: 10 PM"
            rsvpUrl={null}
            userLocation={userMarker.curUserLocationName}
          />
        ) : null}

        {selectedWholeFoods ? (
          <MapPopup
            latitude={selectedWholeFoods.location.lat}
            longitude={selectedWholeFoods.location.lng}
            setSelected={setSelectedWholeFoods}
            type="Whole Foods Market"
            address={selectedWholeFoods.location.address}
            openingHours="Monday through Sunday, 8:00 AM - 10:00 PM"
            rsvpurl={null}
            userLocation={userMarker.curUserLocationName}
          />
        ) : null}

        {selectedMeetup ? (
          <MapPopupMeetup
            selectedMeetup={selectedMeetup}
            setSelectedMeetup={setSelectedMeetup}
            meetupLocation={selectedMeetup.venue.address_1}
            userLocation={userMarker.curUserLocationName}
          />
        ) : null}

        {selectedAlum ? (
          <MapPopupAlum
            selectedAlum={selectedAlum}
            setSelectedAlum={setSelectedAlum}
          />
        ) : null}

        {selectedFreelancersHub ? (
          <MapPopup
            latitude={40.7042358}
            longitude={-73.9892133}
            setSelected={setSelectedFreelancersHub}
            type="Freelancers Hub"
            address="30 John Street, Brooklyn"
            openingHours="Monday through Friday, 9:00 AM - 5:00 PM"
            rsvpUrl="https://freelancershub.nymediacenter.com/member/daypass"
            userLocation={userMarker.curUserLocationName}
          />
        ) : null}

        {selectedAwsLoft ? (
          <MapPopup
            latitude={40.7245956}
            longitude={-73.9976034}
            setSelected={setSelectedAwsLoft}
            type="AWS Loft"
            address="350 West Broadway, New York"
            openingHours="Monday through Friday, 9:30 AM - 5:30 PM"
            rsvpUrl="https://aws.amazon.com/start-ups/loft/ny-loft"
            userLocation={userMarker.curUserLocationName}
          />
        ) : null}

        {selectedCampus ? (
          <MapPopup
            latitude={40.7050758}
            longitude={-74.0113491}
            setSelected={setSelectedCampus}
            type="Fullstack Academy"
            address="5 Hanover Square, New York"
            openingHours="Every second Monday of the month, 6:30 PM - 9:30 PM"
            rsvpUrl="https://www.eventbrite.com/e/hacker-hours-at-fullstack-academy-tickets-98250793769?aff=erelexpmlt"
            userLocation={userMarker.curUserLocationName}
          />
        ) : null}
      </ReactMapGL>
    );
  }
};

// Container
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
  meetups: state.meetups.meetups,
  fetchedMeetups: state.meetups.fetchedMeetups,
});

const mapDispatchToProps = dispatch => ({
  getMeetupsThunk: () => dispatch(getMeetupsThunkCreator()),
});

// Prop Types
Map.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object),
  meetups: PropTypes.arrayOf(PropTypes.object),
  fetchedMeetups: PropTypes.bool,
  getMeetupsThunk: PropTypes.func,
};

// Exports
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
