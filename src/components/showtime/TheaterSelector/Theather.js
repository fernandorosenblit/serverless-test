import React, { useState, useRef } from 'react';
import { string, func, number, shape } from 'prop-types';
import cn from 'classnames';
import { useIntl } from 'react-intl';

import { primaryColor } from 'styles/common/_constants.scss';
import handleEnter from 'utils/handleEnter';

import { ReactComponent as InfoIcon } from 'assets/icons/info.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/concierge/date-night.svg';

const labels = {
  tag: { id: 'showtime.select_theater.tag_theater' }
};

const Theater = ({ name, onClick, id, currentId, distance, address, location }) => {
  const intl = useIntl();
  const [isTagged, setIsTagged] = useState();
  const ref = useRef();

  const onEnterDown = handleEnter(() => ref?.current.click());

  return (
    <div
      onClick={() => onClick(id, address, location)}
      className={cn('theater', { 'theater--selected': id === currentId })}
      tabIndex="0"
      role="button"
      ref={ref}
      onKeyDown={onEnterDown}
    >
      <button
        type="button"
        tabIndex="0"
        aria-label={intl.formatMessage(labels.tag)}
        onClick={e => {
          e.stopPropagation();
          setIsTagged(prev => !prev);
        }}
        className="theater__heart"
      >
        <HeartIcon
          width={43}
          height={40}
          viewBox="-6 -7 35 37"
          fill={isTagged ? primaryColor : 'none'}
        />
      </button>
      <div className="theater__data-section">
        <span className="theater__name body1 semibold">{name}</span>
        <span className="theater__distance caption">{distance}</span>
      </div>
      <InfoIcon className="theater__info" />
    </div>
  );
};

Theater.propTypes = {
  name: string.isRequired,
  onClick: func.isRequired,
  id: string.isRequired,
  currentId: string,
  distance: string.isRequired,
  address: shape({ locality: string, region: string }),
  location: shape({ latitude: number, longitude: number })
};

export default Theater;
