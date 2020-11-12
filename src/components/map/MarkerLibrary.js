// Imports
import React from 'react';
import { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';

// Component
const MarkerLibrary = ({ library, clearSelected, setSelectedLibrary }) => {
  return (
    <Marker latitude={library.lat} longitude={library.lon}>
      <button
        className="marker-button"
        type="button"
        onClick={() => {
          clearSelected();
          setSelectedLibrary(library);
        }}
      >
        <img
          src="https://img.icons8.com/dusk/64/000000/book-shelf.png"
          alt="Public Library Icon"
        />
      </button>
    </Marker>
  );
};

// Prop Types
MarkerLibrary.propTypes = {
  library: PropTypes.object,
  clearSelected: PropTypes.func,
  setSelectedLibrary: PropTypes.func,
};

// Exports
export default MarkerLibrary;
