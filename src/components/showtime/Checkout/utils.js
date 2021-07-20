import { SERVICES } from 'constants/serviceAccessors';
import { PAYMENT_METHOD } from 'constants/constants';

export const orderPayload = {
  data: {
    data: {
      type: SERVICES.order
    }
  }
};

// TO DO: Remove hardcoded api version
export const paymentPayload = {
  data: {
    jsonapi: {
      version: '1.0'
    },
    data: {
      type: SERVICES.payment
    }
  }
};

export const orderEventPayload = id => ({
  data: {
    data: {
      type: SERVICES.orderEvent,
      relationships: {
        source: {
          data: {
            type: SERVICES.event,
            id
          }
        }
      }
    }
  }
});

export const createReservedSeatingPayload = (tickets, seats) => {
  const data = tickets.map((ticket, index) => ({
    type: SERVICES.orderTicket,
    attributes: {
      seats: [
        {
          seatPosition: {
            ...seats[index].seatPosition
          }
        }
      ]
    },
    relationships: {
      source: {
        data: {
          type: SERVICES.eventTicket,
          id: ticket.id
        }
      }
    }
  }));

  return {
    data: { data }
  };
};

export const createGeneralSeatingPayload = tickets => {
  const data = tickets.map(ticket => ({
    type: SERVICES.orderTicket,
    relationships: {
      source: {
        data: {
          type: SERVICES.eventTicket,
          id: ticket.id
        }
      }
    }
  }));

  return {
    data: { data }
  };
};

export const matchStripeMethods = stripeMethods => {
  const methods = [];

  if (stripeMethods) {
    Object.entries(stripeMethods).forEach(([method, value]) => {
      if (value) {
        methods.push(PAYMENT_METHOD[method]);
      }
    });
  }

  return methods;
};

export const convertUnitToCent = value => value * 100;
