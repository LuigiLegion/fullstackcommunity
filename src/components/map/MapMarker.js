// Imports
import React from 'react';
import { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';

// Component
const MapMarker = ({
  location = true,
  latitude,
  longitude,
  setSelected,
  clearSelected,
  markerClass = 'marker-button',
  src,
  alt,
}) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <button
        className={markerClass}
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
  location: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  setSelected: PropTypes.func,
  clearSelected: PropTypes.func,
  markerClass: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

// Exports
export default MapMarker;
