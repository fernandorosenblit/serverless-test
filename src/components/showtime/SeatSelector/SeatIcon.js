import React from 'react';
import { useIntl } from 'react-intl';
import { string } from 'prop-types';

import { SEAT_TYPES, SEAT_STATUS } from 'constants/seatTypes';

import multiPersonLeftAvailable from 'assets/icons/seatMap/multiPersonLeft/multiPersonLeft.available.svg';
import multiPersonLeftSelected from 'assets/icons/seatMap/multiPersonLeft/multiPersonLeft.selected.svg';

import multiPersonMiddleAvailable from 'assets/icons/seatMap/multiPersonMiddle/multiPersonMiddle.available.svg';
import multiPersonMiddleSelected from 'assets/icons/seatMap/multiPersonMiddle/multiPersonMiddle.selected.svg';

import multiPersonRightAvailable from 'assets/icons/seatMap/multiPersonRight/multiPersonRight.available.svg';
import multiPersonRightSelected from 'assets/icons/seatMap/multiPersonRight/multiPersonRight.selected.svg';

import standardAvailable from 'assets/icons/seatMap/standard/standard.available.svg';
import standardSelected from 'assets/icons/seatMap/standard/standard.selected.svg';
import standardSocialDistance from 'assets/icons/seatMap/standard/standard.socialDistance.svg';

import wheelchairAvailable from 'assets/icons/seatMap/wheelchair/wheelchair.available.svg';
import wheelchairSelected from 'assets/icons/seatMap/wheelchair/wheelchair.selected.svg';

import wheelchairCompanionAvailable from 'assets/icons/seatMap/wheelchairCompanion/wheelchairCompanion.available.svg';
import wheelchairCompanionSelected from 'assets/icons/seatMap/wheelchairCompanion/wheelchairCompanion.selected.svg';

import sold from 'assets/icons/seatMap/sold.svg';

const getAssetForSeat = (type, status) => {
  switch (true) {
    case status === SEAT_STATUS.sold:
      return sold;
    case status === SEAT_STATUS.locked:
      return sold;
    case type === SEAT_TYPES.multiPersonLeft && status === SEAT_STATUS.available:
      return multiPersonLeftAvailable;
    case type === SEAT_TYPES.multiPersonLeft && status === SEAT_STATUS.selected:
      return multiPersonLeftSelected;
    case type === SEAT_TYPES.multiPersonMiddle && status === SEAT_STATUS.available:
      return multiPersonMiddleAvailable;
    case type === SEAT_TYPES.multiPersonMiddle && status === SEAT_STATUS.selected:
      return multiPersonMiddleSelected;
    case type === SEAT_TYPES.multiPersonRight && status === SEAT_STATUS.available:
      return multiPersonRightAvailable;
    case type === SEAT_TYPES.multiPersonRight && status === SEAT_STATUS.selected:
      return multiPersonRightSelected;
    case type === SEAT_TYPES.standard && status === SEAT_STATUS.available:
      return standardAvailable;
    case type === SEAT_TYPES.standard && status === SEAT_STATUS.selected:
      return standardSelected;
    case type === SEAT_TYPES.standard && status === SEAT_STATUS.socialDistance:
      return standardSocialDistance;
    case type === SEAT_TYPES.wheelchair && status === SEAT_STATUS.available:
      return wheelchairAvailable;
    case type === SEAT_TYPES.wheelchair && status === SEAT_STATUS.selected:
      return wheelchairSelected;
    case type === SEAT_TYPES.wheelchairCompanion && status === SEAT_STATUS.available:
      return wheelchairCompanionAvailable;
    case type === SEAT_TYPES.wheelchairCompanion && status === SEAT_STATUS.selected:
      return wheelchairCompanionSelected;
    default:
      return null;
  }
};

const SeatIcon = ({ type, status }) => {
  const intl = useIntl();

  return type === SEAT_TYPES.empty ? (
    <div className="seat-icon" />
  ) : (
    <img
      className="seat-icon"
      alt={intl.formatMessage({ id: 'alt.seat' }, { seatType: type })}
      key={`${type}-${status}`}
      src={getAssetForSeat(type, status)}
    />
  );
};

SeatIcon.propTypes = {
  type: string.isRequired,
  status: string.isRequired
};

export default SeatIcon;
