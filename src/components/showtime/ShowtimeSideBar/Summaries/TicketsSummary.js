import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { useIntl } from 'react-intl';

import { dollarTemplate } from 'utils/helpers';
import SummarySection from '../SummarySection';

const labels = {
  adult: 'tickets_count_adult',
  child: 'tickets_count_child',
  senior: 'tickets_count_senior'
};

const countTickets = (tickets, id) => {
  const results = tickets.filter(ticket => ticket.id === id);
  return { amount: results.length, subTotal: results.length * results[0].unitPrice };
};

const getTicketLabel = (tickets, id) => tickets.find(ticket => ticket.id === id).name;

const TicketsSummary = ({ tickets }) => {
  const intl = useIntl();

  const uniqueTicketsIds = [...new Set(tickets.map(ticket => ticket.id))];

  return (
    <SummarySection heading="sidebar_showtime.summary.tickets" onClick={() => {}} lightCopy>
      {uniqueTicketsIds.map(ticketId => {
        const data = countTickets(tickets, ticketId);
        return (
          <div key={`tickets-${ticketId}`} className="showtime-sidebar__tickets">
            <span className="body3">
              {intl.formatMessage(
                { id: labels[getTicketLabel(tickets, ticketId)] },
                {
                  ticketsCount: data.amount
                }
              )}
            </span>
            <span className="body3">{dollarTemplate(data.subTotal)}</span>
          </div>
        );
      })}
    </SummarySection>
  );
};

TicketsSummary.propTypes = {
  tickets: arrayOf(
    shape({
      id: string.isRequired,
      displayName: string.isRequired,
      displayRank: number,
      unitPrice: number,
      name: string.isRequired
    })
  )
};

export default TicketsSummary;
