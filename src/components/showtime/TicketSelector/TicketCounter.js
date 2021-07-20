import React from 'react';
import { useIntl } from 'react-intl';
import { string, number, func, bool } from 'prop-types';

import { ReactComponent as MinusIcon } from 'assets/icons/minus.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';

import { gray, primaryColor } from 'styles/common/_constants.scss';

const labels = {
  removeTicket: { id: 'aria_label.remove_ticket' },
  addTicket: { id: 'aria_label.add_ticket' }
};

const getFillColor = isDisabled => (isDisabled ? gray : primaryColor);

const TicketCounter = ({ currentValue, onChange, id, maxAmountOfTicketsReached }) => {
  const intl = useIntl();
  const isMinusDisabled = currentValue === 0;

  return (
    <div className="ticket-counter">
      <button
        type="button"
        aria-label={intl.formatMessage(labels.removeTicket)}
        disabled={isMinusDisabled}
        onClick={() => onChange(id, true)}
        className="ticket-counter__minus-button"
      >
        <MinusIcon fill={getFillColor(isMinusDisabled)} />
      </button>
      <span className="ticket-counter__label">{currentValue}</span>
      <button
        type="button"
        aria-label={intl.formatMessage(labels.addTicket)}
        disabled={maxAmountOfTicketsReached}
        onClick={() => onChange(id, false)}
        className="ticket-counter__plus-button"
      >
        <PlusIcon fill={getFillColor(maxAmountOfTicketsReached)} />
      </button>
    </div>
  );
};

TicketCounter.propTypes = {
  currentValue: number,
  onChange: func.isRequired,
  id: string.isRequired,
  maxAmountOfTicketsReached: bool
};

export default TicketCounter;
