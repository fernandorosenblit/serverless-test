import React from 'react';
import { string, bool, func } from 'prop-types';
import { useIntl } from 'react-intl';
import cn from 'classnames';

import { SOLD_OUT_STATUS } from 'constants/event';

import FadeLabel from 'components/common/FadeLabel/FadeLabel';

const Showtime = ({
  time = '',
  format = '',
  availability = '',
  availabilityName = '',
  seatingState = '',
  id,
  onChange,
  isSelected = false
}) => {
  const intl = useIntl();
  const isDisabled = availabilityName === SOLD_OUT_STATUS.soldOut;

  return (
    <div
      tabIndex={isDisabled ? '-1' : '0'}
      role="button"
      onClick={() => onChange(id)}
      className={cn('showtime', {
        'showtime--selected': isSelected,
        'showtime--disabled': isDisabled
      })}
    >
      <div>
        <span className="showtime__time body2">{time}</span>
        <span className="showtime__format body2">{format}</span>
        <FadeLabel
          label={availability}
          labelClassName={cn('showtime__availability-label', {
            'showtime__availability-label--disabled': isDisabled
          })}
          containerClassName="showtime__availability-content"
        />
      </div>
      <span className="showtime__seating-state caption">
        {intl.formatMessage({ id: seatingState })}
      </span>
    </div>
  );
};

Showtime.propTypes = {
  time: string,
  format: string,
  availability: string,
  availabilityName: string,
  seatingState: string,
  id: string,
  isSelected: bool,
  onChange: func.isRequired
};

export default Showtime;
