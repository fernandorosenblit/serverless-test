import React from 'react';
import { number, array, shape, string } from 'prop-types';

import SeatRow from './SeatRow';

const SeatArea = ({ area }) => {
  const { top, left, width, height, columnCount, rowCount, rows, areaIndex } = area;
  return rows?.map((row, index) => (
    <SeatRow
      key={`row-${index}`}
      row={row}
      columnCount={columnCount}
      rowCount={rowCount}
      parentTop={top}
      parentLeft={left}
      parentWidth={width}
      parentHeight={height}
      areaIndex={areaIndex}
    />
  ));
};

SeatArea.propTypes = {
  area: shape({
    areaIndex: number,
    areaName: string,
    columnCount: number,
    height: number,
    left: number,
    rowCount: number,
    rows: array,
    top: number,
    width: number
  })
};
export default SeatArea;
