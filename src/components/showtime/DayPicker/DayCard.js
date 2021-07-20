import React from 'react';
import dayjs from 'dayjs';
import { string, func, bool } from 'prop-types';
import cn from 'classnames';

import { DATE_FORMAT } from 'constants/constants';

const DayCard = ({ onClick, time, isSelected }) => {
  const date = dayjs(time);
  return (
    <div className={cn('day-card', { 'day-card--selected': isSelected })} onClick={onClick}>
      <span className="caption-two capitalize">{date.format(DATE_FORMAT.month)}</span>
      <span className="h2 bold">{date.date()}</span>
      <span className="caption-two capitalize">{date.format(DATE_FORMAT.day)}</span>
    </div>
  );
};

DayCard.propTypes = {
  onClick: func.isRequired,
  time: string.isRequired,
  isSelected: bool
};

export default DayCard;
