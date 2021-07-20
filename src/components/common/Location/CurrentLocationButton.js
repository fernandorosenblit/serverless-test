import React from 'react';
import { func, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { ReactComponent as GpsIcon } from 'assets/icons/gps.svg';

const CurrentLocationButton = ({ onClick, messageId = '' }) => {
  const intl = useIntl();
  return (
    <button onClick={onClick} type="button" className="current-location-button">
      <GpsIcon />
      <span>{intl.formatMessage({ id: messageId })}</span>
    </button>
  );
};

CurrentLocationButton.propTypes = {
  onClick: func.isRequired,
  messageId: string
};

export default CurrentLocationButton;
