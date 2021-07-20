import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';

import useGetService from 'hooks/api/useGetService';
import useSubscribe from 'hooks/useSubscribe';

import queryBuilder from 'utils/queryBuilder';
import { SERVICES } from 'constants/serviceAccessors';
import { RELS } from 'constants/entityRels';

const {
  event: {
    timeOfDay,
    soldOutStatus,
    seatingPreview,
    seatMap,
    unavailableSeats,
    features,
    tickets,
    venue,
    format,
    seats
  },
  movie
} = RELS;

const buildDayObject = (time, data) => ({
  time,
  data
});

const groupShowtimesByDay = (showtimes = [], showtimesByDay = []) => {
  if (isEmpty(showtimes)) return;

  /* This logic will be eventually removed - it handles a edge case which won't exist in the future */
  let aNonTicketingShowtimeWasFound = false;

  for (let i = 0; i < showtimes.length; i += 1) {
    if (!showtimes[i].isTicketing) {
      aNonTicketingShowtimeWasFound = true;
    }
  }

  if (aNonTicketingShowtimeWasFound) return;
  /* ---- */

  const firstShowtime = showtimes.shift();
  showtimesByDay.push(buildDayObject(firstShowtime.startTimeLocal, [firstShowtime]));

  showtimes.map(showtime => {
    if (!showtime.isTicketing) return;
    const lastIndex = showtimesByDay.length - 1;
    const lastListedShowtime = dayjs(showtimesByDay[lastIndex].time);
    const currentShowtime = dayjs(showtime.startTimeLocal);

    if (lastListedShowtime.isSame(currentShowtime, 'day')) {
      showtimesByDay[lastIndex].data.push(showtime);
    } else {
      showtimesByDay.push(buildDayObject(showtime.startTimeLocal, [showtime]));
    }
  });
};

export default () => {
  const { venueId, movieId } = useSelector(({ showtime: { venueId, movieId } }) => ({
    venueId,
    movieId
  }));
  const showtimeByDay = [];
  const showtimeListQuery = queryBuilder({
    filter: {
      'movie.id': {
        eq: movieId
      },
      'venue.id': {
        eq: venueId
      }
    },
    include: [
      timeOfDay,
      { movie: [movie.formats] },
      format,
      soldOutStatus,
      seatingPreview,
      unavailableSeats,
      features,
      venue,
      tickets,
      seatMap,
      seats
    ],
    sort: ['startTimeLocal']
  });

  const [showtimeList, showtimeMeta] = useGetService(SERVICES.event)(showtimeListQuery, {
    enableRequest: movieId && venueId
  });

  useSubscribe(showtimeMeta?.links?.subscription);
  const wereShowtimeRetrieved = showtimeMeta && !showtimeMeta.loading;

  if (wereShowtimeRetrieved) {
    groupShowtimesByDay(showtimeList, showtimeByDay);
  }

  return [showtimeByDay, wereShowtimeRetrieved];
};
