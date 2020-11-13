// Imports
import React from 'react';
import { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';

// Component
const MapMarker = ({
  location,
  latitude,
  longitude,
  setSelected,
  clearSelected,
  src,
  alt,
}) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <button
        className="marker-button"
        type="button"
        onClick={() => {
          clearSelected();
          setSelected(location);
        }}
      >
        <img src={src} alt={alt} />
      </button>
    </Marker>
  );
};

// Prop Types
MapMarker.propTypes = {
  location: PropTypes.object,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  setSelected: PropTypes.func,
  clearSelected: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
};

// Exports
export default MapMarker;
