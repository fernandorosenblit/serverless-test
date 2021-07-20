import { string } from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

const ConciergeProfileIcon = ({ imageSrc, textIntl }) => {
  const intl = useIntl();

  return (
    <div className="concierge-profile-icon">
      <img
        src={imageSrc}
        aria-hidden
        alt={intl.formatMessage(
          { id: 'concierge.profileIconFor' },
          { profile: intl.formatMessage({ id: textIntl }) }
        )}
      />
      <span className="icon-text">{intl.formatMessage({ id: textIntl })}</span>
    </div>
  );
};

ConciergeProfileIcon.propTypes = {
  imageSrc: string.isRequired,
  textIntl: string.isRequired
};

export default ConciergeProfileIcon;
