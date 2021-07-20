import React, { useState, useEffect, memo, useRef } from 'react';
import { bool, number } from 'prop-types';
import cn from 'classnames';

import { ReactComponent as SeatPlaceholderImage } from 'assets/images/seatMap/seat-placeholder.svg';

const SeatZonePreview = ({ availableSeats, withMargin = false }) => {
  const initialRenderRef = useRef();
  const [seats, setSeats] = useState(availableSeats);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!initialRenderRef.current) {
      setSeats(availableSeats);
      initialRenderRef.current = true;
    } else if (typeof availableSeats === 'number') {
      setSeats(availableSeats);
      setAnimate(prevValue => !prevValue);
    }
  }, [availableSeats]);

  return (
    <div className={cn('seat-zone-preview', { 'seat-zone-preview--with-margin': withMargin })}>
      <SeatPlaceholderImage className="seat-zone-preview__seat-placeholder" />
      <SeatPlaceholderImage className="seat-zone-preview__seat-placeholder" />
      <SeatPlaceholderImage />
      <SeatPlaceholderImage className="seat-zone-preview__seat-placeholder" />
      <SeatPlaceholderImage className="seat-zone-preview__seat-placeholder" />
      <SeatPlaceholderImage />
      <div
        className={cn('seat-zone-preview__available-seats', { animate })}
        onAnimationEnd={() => setAnimate(prevValue => !prevValue)}
      >
        {seats}
      </div>
    </div>
  );
};

SeatZonePreview.propTypes = {
  availableSeats: number.isRequired,
  withMargin: bool
};

export default memo(SeatZonePreview);
