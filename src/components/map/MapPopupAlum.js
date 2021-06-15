// Imports
import React from 'react';
import { Popup } from 'react-map-gl';
import PropTypes from 'prop-types';

// Component
const MapPopupAlum = ({ selectedAlum, setSelectedAlum }) => {
  return (
    <Popup
      latitude={selectedAlum.locationGeocode.lat}
      longitude={selectedAlum.locationGeocode.lon}
      closeOnClick={false}
      onClose={() => setSelectedAlum(null)}
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
  );
};

// Prop Types
MapPopupAlum.propTypes = {
  selectedAlum: PropTypes.object,
  setSelectedAlum: PropTypes.func,
};

// Exports
export default MapPopupAlum;
