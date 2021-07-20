import dayjs from 'dayjs';
import sortBy from 'lodash/sortBy';

import { DATE_FORMAT } from 'constants/constants';

const nonHeaderProp = 'low-sold-out';
export default (showtimesByDay = [], selectedDay = '', filter) => {
  const panelArray = [];
  const dataToSort = showtimesByDay.find(({ time }) => time === selectedDay);
  const sortedArray = sortBy(dataToSort?.data, `${filter}.displayRank`);
  sortedArray.map(showtime => {
    const { startTimeLocal, isReservedSeating, soldOutStatus, format, id } = showtime;
    const propBeingFiltered = showtime[filter];

    const lastIndex = panelArray.length - 1;
    const buildShowtimeEntry = () => ({
      id,
      time: dayjs(startTimeLocal).format(DATE_FORMAT.showtime),
      format: format?.displayName,
      availability: soldOutStatus?.displayName,
      availabilityName: soldOutStatus?.name,
      seatingState: isReservedSeating ? 'showtime.seats.reserved' : 'showtime.seats.general'
    });

    if (panelArray[lastIndex]?.name === propBeingFiltered.name) {
      panelArray[lastIndex].options.push(buildShowtimeEntry());
    } else {
      panelArray.push({
        header:
          propBeingFiltered.name === nonHeaderProp
            ? 'date_and_showtime.header.available'
            : propBeingFiltered.displayName,
        name: propBeingFiltered.name,
        options: [buildShowtimeEntry()]
      });
    }
  });

  return panelArray;
};
