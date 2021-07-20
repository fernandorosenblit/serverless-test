import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { truncateNumber, dollarTemplate, sortByDisplayRank } from 'utils/helpers';

import { setShowtimeSubHeader, setShowtimeTicketType } from 'state/actions/showtimeActions';

import useShowtime from 'components/showtime/useShowtime';
import TicketSection from './TicketSection';

const maxAmountOfTicketsPerPurchase = 10;

const labels = {
  fees: { id: 'select_ticket.fees' },
  total: { id: 'select_ticket.total' },
  maxAmount: { id: 'select_ticket.max_amount' }
};

const getTotals = (ticketOptions, selectedTickets) => {
  let totalFees = 0;
  let totalTaxes = 0;
  let totalPrice = 0;

  const sumFeesSurcharges = ({ amount }, selectedAmountOfTickets) => {
    totalFees += amount * selectedAmountOfTickets;
  };

  const sumTaxesSurcharges = ({ amount }, selectedAmountOfTickets) => {
    totalTaxes += amount * selectedAmountOfTickets;
  };

  ticketOptions.forEach(ticketOption => {
    const selectedAmountOfTickets = selectedTickets.filter(t => t.id === ticketOption.id).length;

    ticketOption?.fees?.forEach(fee => sumFeesSurcharges(fee, selectedAmountOfTickets));
    ticketOption?.taxes?.forEach(tax => sumTaxesSurcharges(tax, selectedAmountOfTickets));
    totalPrice += selectedAmountOfTickets * ticketOption.unitPrice;
  });

  return {
    totalFees: truncateNumber(totalFees),
    totalTaxes: truncateNumber(totalTaxes),
    totalSurcharges: truncateNumber(totalFees + totalTaxes),
    totalUnitPrice: truncateNumber(totalPrice),
    totalPrice: truncateNumber(totalPrice + totalFees + totalTaxes)
  };
};

const TicketSelector = () => {
  const { currentShowtime, tickets } = useShowtime();
  const dispatch = useDispatch();
  const intl = useIntl();
  const showtimeTicketsOptions = sortByDisplayRank(currentShowtime?.tickets);

  const maxAmountOfTicketsReached = !(tickets.length < maxAmountOfTicketsPerPurchase);

  const { totalSurcharges, totalPrice } = getTotals(showtimeTicketsOptions, tickets);

  const sumTicketsById = useCallback(id => tickets?.filter(ticket => ticket?.id === id)?.length, [
    tickets
  ]);

  useEffect(() => {
    const dispatchSetShowtimeSubHeader = subHeader => dispatch(setShowtimeSubHeader(subHeader));

    dispatchSetShowtimeSubHeader(
      intl.formatMessage(labels.maxAmount, { maxAmountOfTickets: maxAmountOfTicketsPerPurchase })
    );
    return () => dispatchSetShowtimeSubHeader(null);
  }, [dispatch, intl]);

  const onChange = useCallback(
    (id, isSubstracting) => {
      if (!isSubstracting && maxAmountOfTicketsReached) return;
      const { displayName, displayRank, unitPrice, name } = showtimeTicketsOptions.find(
        ticket => ticket.id === id
      );
      dispatch(
        setShowtimeTicketType({
          data: {
            id,
            displayName,
            displayRank,
            unitPrice,
            name
          },
          isSubstracting
        })
      );
    },
    [dispatch, maxAmountOfTicketsReached, showtimeTicketsOptions]
  );

  return (
    <div className="ticket-selector">
      {showtimeTicketsOptions.map(({ displayName, unitPrice, id }) => (
        <TicketSection
          key={`ticket-${id}`}
          id={id}
          displayName={displayName}
          unitPrice={unitPrice}
          counterOnChange={onChange}
          counterCurrentValue={sumTicketsById(id)}
          maxAmountOfTicketsReached={maxAmountOfTicketsReached}
        />
      ))}
      <div className="tickets-breakdown">
        <div className="tickets-breakdown__top-section body3">
          <span>{intl.formatMessage(labels.fees)}</span>
          <span>{dollarTemplate(totalSurcharges)}</span>
        </div>
        <div className="tickets-breakdown__bottom-section h3">
          <span>{intl.formatMessage(labels.total)}</span>
          <span>{dollarTemplate(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketSelector;
