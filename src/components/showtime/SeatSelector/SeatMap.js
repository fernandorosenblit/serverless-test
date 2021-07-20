import React, { useRef } from 'react';
import { arrayOf, number, array, shape } from 'prop-types';
import PrismaZoom from 'react-prismazoom';
import { useIntl } from 'react-intl';

import { ReactComponent as ScreenImage } from 'assets/images/seatMap/screen.svg';
import { ReactComponent as MinusIcon } from 'assets/icons/minus.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { SEAT_STATUS, SEAT_TYPES } from 'constants/seatTypes';
import SeatZone from './SeatZone';
import SeatIcon from './SeatIcon';

const seatLabels = {
  available: 'seat_legend.available',
  unavailable: 'seat_legend.unavailable',
  selected: 'seat_legend.selected',
  wheelchairAndCompanion: 'seat_legend.wheelchair_companion',
  socialDistance: 'seat_legend.social_distance'
};

const SeatWithLegend = (types, status, label) => {
  const intl = useIntl();

  return (
    <div className="seat-map__seating-legend">
      {types.map(type => (
        <SeatIcon key={`icon-${type}-${status}`} type={type} status={status} />
      ))}
      <span className="caption caption__secondary">{intl.formatMessage({ id: label })}</span>
    </div>
  );
};
const SeatMap = ({ zones }) => {
  const prismaZoomRef = useRef(null);

  const handleZoomIn = () => prismaZoomRef?.current?.zoomIn(1);
  const handleZoomOut = () => prismaZoomRef?.current?.zoomOut(1);

  return (
    <div className="seat-map">
      <div className="seat-map__inner">
        <div className="seat-map__zoom-outer">
          <PrismaZoom maxZoom={8} ref={prismaZoomRef} className="seat-map__zoom-container">
            <div className="seat-map__interactive">
              <ScreenImage className="seat-map__screen" />
              <div className="seat-map__seats">
                {zones?.map(zone => <SeatZone key={`zone-${zone.areaIndex}`} zone={zone} />)}
              </div>
            </div>
          </PrismaZoom>
        </div>
        <div className="seat-map__seating-legends">
          {SeatWithLegend([SEAT_TYPES.standard], SEAT_STATUS.available, seatLabels.available)}
          {SeatWithLegend([SEAT_TYPES.standard], SEAT_STATUS.selected, seatLabels.selected)}
          {SeatWithLegend([SEAT_TYPES.standard], SEAT_STATUS.sold, seatLabels.unavailable)}
          {SeatWithLegend(
            [SEAT_TYPES.standard],
            SEAT_STATUS.socialDistance,
            seatLabels.socialDistance
          )}
          {SeatWithLegend(
            [SEAT_TYPES.wheelchair, SEAT_TYPES.wheelchairCompanion],
            SEAT_STATUS.available,
            seatLabels.wheelchairAndCompanion
          )}
        </div>
      </div>
      <div className="seat-map__controlls">
        <button type="button" onClick={handleZoomIn}>
          <PlusIcon height={14} width={14} />
        </button>
        <button type="button" onClick={handleZoomOut}>
          <MinusIcon height={14} width={14} />
        </button>
      </div>
    </div>
  );
};

SeatMap.propTypes = {
  zones: arrayOf(shape({ areaCount: number, seatCount: number, zoneIndex: number, areas: array }))
};

export default SeatMap;
