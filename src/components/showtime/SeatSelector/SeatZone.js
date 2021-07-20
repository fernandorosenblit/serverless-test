import React from 'react';
import { number, array, shape } from 'prop-types';

import SeatArea from './SeatArea';

const SeatZone = ({ zone }) => {
  return zone?.areas?.map(area => <SeatArea key={`area-${area.areaName}`} area={area} />);
};

SeatZone.propTypes = {
  zone: shape({ areaCount: number, seatCount: number, zoneIndex: number, areas: array })
};

export default SeatZone;
