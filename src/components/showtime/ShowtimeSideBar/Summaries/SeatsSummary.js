import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

import { sortAlphaNum } from 'utils/helpers';

import SummarySection from '../SummarySection';

const SeatsDetails = ({ seats }) => {
  return (
    <SummarySection heading="sidebar_showtime.summary.seats" onClick={() => {}} lightCopy>
      <span className="body3">
        {sortAlphaNum(seats.map(seat => `${seat.seatName ?? ''}${seat.rowName ?? ''}`)).join(', ')}
      </span>
    </SummarySection>
  );
};

SeatsDetails.propTypes = {
  seats: arrayOf(shape({ rowName: string, areaName: string, seatName: string }))
};

export default SeatsDetails;
