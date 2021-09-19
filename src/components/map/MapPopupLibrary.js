/* eslint-disable complexity */

// Imports
import React from 'react';
import { Popup } from 'react-map-gl';
import PropTypes from 'prop-types';

import { NavigationLink } from '..';

// Component
const MapPopupLibrary = ({
  selectedLibrary,
  setSelectedLibrary,
  userLocation,
}) => {
  return (
    <Popup
      latitude={selectedLibrary.lat}
      longitude={selectedLibrary.lon}
      closeOnClick={false}
      onClose={() => setSelectedLibrary(null)}
    >
      <div className="text-style-bold location-description">
        {selectedLibrary.oversightAgency} - {selectedLibrary.address}
      </div>

      <hr />

      <div className="navigation-container">
        <div className="navigation-containee">
          <span className="text-style-bold">Opening Hours</span>

          <div>
            <span className="text-style-bold">Monday: </span>
            {selectedLibrary.monOpen} - {selectedLibrary.monClose}
            {selectedLibrary.monReopen
              ? `, ${selectedLibrary.monReopen}-${selectedLibrary.monReclose}`
              : null}
          </div>

          <div>
            <span className="text-style-bold">Tuesday: </span>
            {selectedLibrary.tueOpen} - {selectedLibrary.tueClose}
            {selectedLibrary.tueReopen
              ? `, ${selectedLibrary.tueReopen}-${selectedLibrary.tueReclose}`
              : null}
          </div>

          <div>
            <span className="text-style-bold">Wednesday: </span>
            {selectedLibrary.wedOpen} - {selectedLibrary.wedClose}
            {selectedLibrary.wedReopen
              ? `, ${selectedLibrary.wedReopen}-${selectedLibrary.wedReclose}`
              : null}
          </div>

          <div>
            <span className="text-style-bold">Thursday: </span>
            {selectedLibrary.thuOpen} - {selectedLibrary.thuClose}
            {selectedLibrary.thuReopen
              ? `, ${selectedLibrary.thuReopen}-${selectedLibrary.thuReclose}`
              : null}
          </div>

          <div>
            <span className="text-style-bold">Friday: </span>
            {selectedLibrary.friOpen} - {selectedLibrary.friClose}
            {selectedLibrary.friReopen
              ? `, ${selectedLibrary.friReopen}-${selectedLibrary.friReclose}`
              : null}
          </div>

          <div>
            <span className="text-style-bold">Saturday: </span>
            {selectedLibrary.satOpen} - {selectedLibrary.satClose}
            {selectedLibrary.satReopen
              ? `, ${selectedLibrary.satReopen}-${selectedLibrary.satReclose}`
              : null}
          </div>

          <div>
            <span className="text-style-bold">Sunday: </span>
            {selectedLibrary.sunOpen === 'Closed' ? (
              selectedLibrary.sunOpen
            ) : (
              <div>
                {selectedLibrary.sunOpen} - {selectedLibrary.sunClose}
                {selectedLibrary.sunReopen
                  ? `, ${selectedLibrary.sunReopen}-${selectedLibrary.sunReclose}`
                  : null}
              </div>
            )}
          </div>
        </div>

        <br />

        <NavigationLink
          type={selectedLibrary.oversightAgency}
          address={selectedLibrary.address}
          userLocation={userLocation}
        />
      </div>
    </Popup>
  );
};

// Prop Types
MapPopupLibrary.propTypes = {
  selectedLibrary: PropTypes.object,
  setSelectedLibrary: PropTypes.func,
  userLocation: PropTypes.string,
};

// Exports
export default MapPopupLibrary;
