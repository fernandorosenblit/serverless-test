import React from 'react';
import { bool, string, object, shape } from 'prop-types';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useIntl } from 'react-intl';

import { DATE_FORMAT } from 'constants/constants';

import SeatMapPreview from 'components/showtime/SeatMapPreview/SeatMapPreview';
import SummarySection from '../SummarySection';

const ShowtimeDetails = ({ currentShowtime, mustDisplayShowtimePreview }) => {
  const intl = useIntl();
  const { isReservedSeating, startTimeLocal, format, id, seatingPreview } = currentShowtime;
  const sections = seatingPreview?.sections;

  return (
    <SummarySection heading="sidebar_showtime.summary.date_showtime" onClick={() => {}} lightCopy>
      <article>
        <span className="body3">
          {`${dayjs(startTimeLocal).format(DATE_FORMAT.monthWithDay)} | ${dayjs(
            startTimeLocal
          ).format(DATE_FORMAT.showtime)} | ${format?.displayName}`}
        </span>
        {isReservedSeating && (
          <span className="body3">
            {intl.formatMessage({ id: 'showtime.seats.reserved_seating' })}
          </span>
        )}
      </article>
      {!isEmpty(sections) && mustDisplayShowtimePreview && (
        <SeatMapPreview key={id} sections={sections} />
      )}
    </SummarySection>
  );
};

ShowtimeDetails.propTypes = {
  currentShowtime: shape({
    isReservedSeating: bool,
    startTimeLocal: string,
    movie: object
  }).isRequired,
  mustDisplayShowtimePreview: bool.isRequired
};

export default ShowtimeDetails;
