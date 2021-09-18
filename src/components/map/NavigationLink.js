// Imports
import React from 'react';
import PropTypes from 'prop-types';

import { regexReplace } from '../../utils';

// Component
const NavigationLink = ({ type, address, userLocation }) => {
  return (
    <a
      className="text-style-bold"
      href={`https://www.google.com/maps/dir/?api=1&origin=${regexReplace(
        userLocation
      )}+Subway+Station&destination=${regexReplace(type)}+${regexReplace(
        address
      )}&travelmode=transit`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Navigate
    </a>
  );
};

// Prop Types
NavigationLink.propTypes = {
  type: PropTypes.string,
  address: PropTypes.string,
  userLocation: PropTypes.string,
};

// Exports
export default NavigationLink;
