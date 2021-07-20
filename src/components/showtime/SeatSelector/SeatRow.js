import React from 'react';
import { number, array, shape, string } from 'prop-types';

import Seat from './Seat';

const SeatRow = ({
  row,
  columnCount,
  rowCount,
  parentTop,
  parentLeft,
  parentWidth,
  parentHeight,
  areaIndex
}) => {
  const top = `${parentTop + (row.rowIndex * parentHeight) / rowCount}%`;
  const height = `${parentHeight / rowCount}%`;

  return row?.rowSeats?.map(seat => (
    <Seat
      key={seat.seatName}
      seat={seat}
      columnCount={columnCount}
      top={top}
      height={height}
      parentLeft={parentLeft}
      parentWidth={parentWidth}
      rowName={row.rowName}
      areaIndex={areaIndex}
      rowIndex={row.rowIndex}
    />
  ));
};

SeatRow.propTypes = {
  areaIndex: number.isRequired,
  row: shape({ rowIndex: number, rowName: string, rowSeats: array }),
  columnCount: number,
  rowCount: number,
  parentTop: number,
  parentLeft: number,
  parentWidth: number,
  parentHeight: number
};

export default SeatRow;
