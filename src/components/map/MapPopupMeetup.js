// Imports
import React from 'react';
import { Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
import moment from 'moment';

import { regexReplace } from '../../utils';

// Component
const MapPopupMeetup = ({
  selectedMeetup,
  setSelectedMeetup,
  meetupLocation,
  userLocation,
}) => {
  return (
    <Popup
      latitude={selectedMeetup.venue.lat}
      longitude={selectedMeetup.venue.lon}
      closeOnClick={false}
      onClose={() => setSelectedMeetup(null)}
    >
      <div className="text-style-bold location-description">
        {meetupLocation ? meetupLocation : 'Online'}
      </div>

      <hr />

      <div className="navigation-container">
        <div>
          <span className="text-style-bold">Title: </span>
          {selectedMeetup.name}
        </div>

        <div>
          <span className="text-style-bold">Date: </span>
          {moment(selectedMeetup.time).format('LLLL')}
        </div>

        <br />

        <a
          href={selectedMeetup.event_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-style-bold">
            {`RSVP (${selectedMeetup.yes_rsvp_count}${
              selectedMeetup.rsvp_limit ? '/' + selectedMeetup.rsvp_limit : ''
            })`}
          </span>
        </a>

        {meetupLocation ? (
          <>
            <br />

            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${regexReplace(
                userLocation
              )}+Subway+Station&destination=${regexReplace(
                meetupLocation
              )}&travelmode=transit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-style-bold">Navigate</span>
            </a>
          </>
        ) : null}
      </div>
    </Popup>
  );
};

// Prop Types
MapPopupMeetup.propTypes = {
  selectedMeetup: PropTypes.object,
  setSelectedMeetup: PropTypes.func,
  meetupLocation: PropTypes.string,
  userLocation: PropTypes.string,
};

// Exports
export default MapPopupMeetup;
