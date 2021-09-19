// Imports
import React from 'react';
import { Popup } from 'react-map-gl';
import PropTypes from 'prop-types';

import { NavigationLink } from '..';

// Component
const MapPopup = ({
  latitude,
  longitude,
  setSelected,
  type,
  address,
  openingHours,
  rsvpUrl,
  userLocation,
}) => {
  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeOnClick={false}
      onClose={() => setSelected(null)}
    >
      <div className="text-style-bold location-description">
        {type} - {address}
      </div>

      <hr />

      <div className="navigation-container">
        <div className="text-style-bold navigation-containee">
          Opening Hours
        </div>

        <div className="navigation-containee">{openingHours}</div>

        {rsvpUrl ? (
          <a href={rsvpUrl} target="_blank" rel="noopener noreferrer">
            <span className="text-style-bold">RSVP</span>
          </a>
        ) : null}

        <br />

        <NavigationLink
          type={type}
          address={address}
          userLocation={userLocation}
        />
      </div>
    </Popup>
  );
};

// Prop Types
MapPopup.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  setSelected: PropTypes.func,
  type: PropTypes.string,
  address: PropTypes.string,
  openingHours: PropTypes.string,
  rsvpUrl: PropTypes.string,
  userLocation: PropTypes.string,
};

// Exports
export default MapPopup;
