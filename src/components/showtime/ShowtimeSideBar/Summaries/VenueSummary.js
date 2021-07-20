import React from 'react';
import { object } from 'prop-types';
import SummarySection from '../SummarySection';

const VenueDetails = ({ currentVenue }) => {
  return (
    <SummarySection heading="sidebar_showtime.summary.theatre" onClick={() => {}} lightCopy>
      <span className="body3">{currentVenue?.displayName}</span>
    </SummarySection>
  );
};

VenueDetails.propTypes = {
  currentVenue: object
};

export default VenueDetails;
