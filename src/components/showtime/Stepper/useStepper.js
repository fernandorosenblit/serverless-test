import { useSelector } from 'react-redux';
import build from 'redux-object';
import isEmpty from 'lodash/isEmpty';

import { SHOWTIME_STEPS } from 'constants/showtime';
import { SERVICES } from 'constants/serviceAccessors';
import { REDUX_BUILD_OPTIONS } from 'constants/constants';

export default stepper => {
  let onlyReservedSeatings = true;
  let selectedShowtimeHasReservedSeatings = false;

  const { showtimes: SavedShowtimes, showtimeId, venueId, movieId } = useSelector(
    ({ api, showtime }) => ({
      showtimes: build(api, SERVICES.event, null, REDUX_BUILD_OPTIONS),
      showtimeId: showtime.showtimeId,
      venueId: showtime.venueId,
      movieId: showtime.movieId
    })
  );

  if (!SavedShowtimes) return stepper;

  const showtimes = SavedShowtimes.filter(
    ({ venue, movie }) => venue.id === venueId && movie.id === movieId
  );

  if (isEmpty(showtimes)) return stepper;

  for (let i = 0; i < showtimes.length; i += 1) {
    const currentShowtime = showtimes[i];
    if (currentShowtime.id === showtimeId && currentShowtime.isReservedSeating) {
      selectedShowtimeHasReservedSeatings = true;
    }
    if (!currentShowtime.isReservedSeating) {
      onlyReservedSeatings = false;
    }
  }

  if (onlyReservedSeatings || selectedShowtimeHasReservedSeatings) {
    const stepIndex = stepper.findIndex(({ step }) => step === SHOWTIME_STEPS.seatSelection);
    stepper[stepIndex].hidden = false;
  }

  return stepper;
};
