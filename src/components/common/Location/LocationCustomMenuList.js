import React from 'react';
import { useIntl } from 'react-intl';
import { node, func } from 'prop-types';

import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_LOCATION } from 'constants/constants';
import CurrentLocationButton from './CurrentLocationButton';

const labels = {
  location: { id: 'location' }
};

const dummyCurrentLocationOption = {
  value: {
    location: { latitude: DEFAULT_LAT, longitude: DEFAULT_LNG },
    displayName: DEFAULT_LOCATION
  },
  label: DEFAULT_LOCATION
};

const LocationCustomMenuList = ({ children, innerRef, onCurrentLocationClick, selectOption }) => {
  const intl = useIntl();

  const handleCurrentLocationClick = () => {
    onCurrentLocationClick();
    selectOption(dummyCurrentLocationOption);
  };

  return (
    <div ref={innerRef} className="location-dropdown-menu-list">
      <span className="location-dropdown-menu-list__header">
        {intl.formatMessage(labels.location)}
      </span>
      {children}
      <div className="location-dropdown-menu-list__separator" />
      <div className="location-dropdown-menu-list__btn-wrapper">
        <CurrentLocationButton
          onClick={handleCurrentLocationClick}
          messageId="location.current.use"
        />
      </div>
    </div>
  );
};

LocationCustomMenuList.propTypes = {
  children: node,
  innerRef: func,
  onCurrentLocationClick: func.isRequired,
  selectOption: func.isRequired
};

export default LocationCustomMenuList;
