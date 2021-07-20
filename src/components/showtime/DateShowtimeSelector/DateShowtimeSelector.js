import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import DayPicker from 'components/showtime/DayPicker/DayPicker';
import ToggleMenu from 'components/common/ToggleMenu/ToggleMenu';
import ShowtimeMenuPanel from 'components/showtime/DateShowtimeSelector/ShowtimeMenuPanel';

import useShowtimeByDate from 'components/showtime/DateShowtimeSelector/useShowtimeByDate';
import useShowtimeMenuPanel from 'components/showtime/DateShowtimeSelector/useShowtimeMenuPanel';

import { setShowtimeId } from 'state/actions/showtimeActions';

const toggleMenuOptions = [
  { title: 'date_and_showtime.toggle_title.day', id: 1, filter: 'timeOfDay' },
  { title: 'date_and_showtime.toggle_title.format', id: 2, filter: 'format' },
  { title: 'date_and_showtime.toggle_title.availability', id: 3, filter: 'soldOutStatus' }
];

const DateShowtimeSelector = () => {
  const showtimeId = useSelector(({ showtime: { showtimeId } }) => showtimeId);
  const dispatch = useDispatch();
  const [showtimesByDate, wereShowtimeRetrieved] = useShowtimeByDate();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedShowtime, setSelectedShowtime] = useState();
  const [selectedFilter, setSelectedFilter] = useState(toggleMenuOptions[0]);
  const menuPanelOptions = useShowtimeMenuPanel(
    showtimesByDate,
    selectedDay,
    selectedFilter.filter
  );

  const handleSelectShowtime = useCallback(
    id => {
      setSelectedShowtime(id);
      dispatch(setShowtimeId(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (wereShowtimeRetrieved) {
      const firstDayWithShowtimes = showtimesByDate[0];
      setSelectedDay(firstDayWithShowtimes?.time);
    }
  }, [dispatch, wereShowtimeRetrieved]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    !selectedShowtime && setSelectedShowtime(showtimeId);
  }, [showtimeId]);

  return (
    <div
      className={cn('date-and-showtime showtime-content-wrapper__inner', {
        'showtime-content--loading': !wereShowtimeRetrieved
      })}
    >
      {selectedDay && (
        <>
          <DayPicker
            options={showtimesByDate}
            selectedDay={selectedDay}
            handleClick={setSelectedDay}
            className="showtime-day-picker"
          />
          <ToggleMenu
            MenuOption={toggleMenuOptions}
            currentId={selectedFilter.id}
            onChange={setSelectedFilter}
            className="showtime-toggle-menu"
          />
          <ShowtimeMenuPanel
            options={menuPanelOptions}
            selectedShowtime={selectedShowtime}
            onChange={handleSelectShowtime}
          />
        </>
      )}
    </div>
  );
};

export default DateShowtimeSelector;
