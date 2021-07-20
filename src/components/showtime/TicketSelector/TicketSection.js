import React from 'react';
import isFinite from 'lodash/isFinite';
import { useIntl } from 'react-intl';
import { func, number, string, bool } from 'prop-types';

import { truncateNumber, dollarTemplate } from 'utils/helpers';

import TicketCounter from './TicketCounter';

const labels = {
  unitPrice: { id: 'select_ticket.unit_price_label' }
};

const TicketSection = ({
  displayName,
  id,
  unitPrice,
  counterCurrentValue,
  counterOnChange,
  maxAmountOfTicketsReached
}) => {
  const intl = useIntl();
  const totalPrice = Number(unitPrice) * Number(counterCurrentValue);
  return (
    <div className="ticket-section">
      <h2 className="ticket-section__header body1">{displayName}</h2>
      <div className="ticket-section__content">
        <div className="ticket-section__counter">
          <TicketCounter
            currentValue={counterCurrentValue}
            onChange={counterOnChange}
            id={id}
            maxAmountOfTicketsReached={maxAmountOfTicketsReached}
          />
        </div>
        <div className="ticket-section__labels-section body1">
          <span>{intl.formatMessage(labels.unitPrice, { unitPrice })}</span>
          {isFinite(totalPrice) && <span>{dollarTemplate(truncateNumber(totalPrice))}</span>}
        </div>
      </div>
    </div>
  );
};

TicketSection.propTypes = {
  id: string.isRequired,
  displayName: string.isRequired,
  unitPrice: number,
  counterOnChange: func.isRequired,
  counterCurrentValue: number,
  maxAmountOfTicketsReached: bool
};

export default TicketSection;
