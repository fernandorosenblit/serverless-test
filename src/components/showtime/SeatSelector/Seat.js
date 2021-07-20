import React from 'react';
import { useDispatch } from 'react-redux';
import { number, shape, string } from 'prop-types';

import { selectShowtimeSeat, unselectShowtimeSeat } from 'state/actions/showtimeActions';
import { SEAT_STATUS } from 'constants/seatTypes';
import useShowtime from 'components/showtime/useShowtime';
import SeatIcon from './SeatIcon';

const Seat = ({
  seat,
  columnCount,
  top,
  height,
  parentWidth,
  parentLeft,
  rowName,
  areaIndex,
  rowIndex
}) => {
  const dispatch = useDispatch();
  const { seats, ticketsCount } = useShowtime();
  const { seatName, columnIndex } = seat;

  const left = `${parentLeft + (columnIndex * parentWidth) / columnCount}%`;
  const width = `${parentWidth / columnCount}%`;

  const isSelected = seats?.some(_seat => _seat.seatName === seatName && rowName === _seat.rowName);

  const enableSeatSelection = seats?.length < ticketsCount;

  const handleSeatClick = () => {
    const payload = {
      seatName,
      rowName,
      seatPosition: {
        areaIndex,
        columnIndex,
        rowIndex
      }
    };
    if (
      seat.status === SEAT_STATUS.sold ||
      seat.status === SEAT_STATUS.locked ||
      seat.status === SEAT_STATUS.socialDistance ||
      (!isSelected && !enableSeatSelection)
    )
      return;
    dispatch(isSelected ? unselectShowtimeSeat(payload) : selectShowtimeSeat(payload));
  };

  return (
    <div
      key={seat.seatName}
      className={`seat ${seat.seatType}`}
      onClick={handleSeatClick}
      style={{
        width,
        height,
        top,
        left
      }}
    >
      <SeatIcon
        type={seat.seatType}
        status={isSelected ? SEAT_STATUS.selected : seat.status ?? SEAT_STATUS.available}
      />
    </div>
  );
};

Seat.propTypes = {
  areaIndex: number.isRequired,
  rowIndex: number.isRequired,
  seat: shape({
    columnIndex: number,
    seatName: string,
    seatType: string,
    status: string || undefined
  }),
  columnCount: number,
  top: string,
  height: string,
  parentWidth: number,
  parentLeft: number,
  rowName: string
};

export default React.memo(Seat);
