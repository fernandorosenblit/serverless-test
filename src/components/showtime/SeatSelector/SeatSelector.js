import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { setShowtimeSubHeader } from 'state/actions/showtimeActions';

import useShowtime from 'components/showtime/useShowtime';
import SeatMap from './SeatMap';
import useSeatMap from './useSeatMap';

const labels = {
  selected_seats: { id: 'select_seats.selected_amount' }
};

const SeatSelector = () => {
  const dispatch = useDispatch();
  const { seats, ticketsCount } = useShowtime();
  const intl = useIntl();
  const zones = useSeatMap();

  useEffect(() => {
    const dispatchSetShowtimeSubHeader = subHeader => dispatch(setShowtimeSubHeader(subHeader));

    dispatchSetShowtimeSubHeader(
      intl.formatMessage(labels.selected_seats, {
        selected: seats.length,
        ticketsCount
      })
    );
    return () => dispatchSetShowtimeSubHeader(null);
  }, [dispatch, intl, seats, ticketsCount]);

  return <SeatMap zones={zones} />;
};

export default SeatSelector;
