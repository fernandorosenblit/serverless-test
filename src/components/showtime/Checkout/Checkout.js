import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { SERVICES } from 'constants/serviceAccessors';
import { LIFECYCLE_STATUS } from 'constants/order';

import {
  setOrderId,
  setOrderEventId,
  setOrderTickets,
  setOrderTimer
} from 'state/actions/showtimeActions';

import { usePostService } from 'hooks/api';
import useSubscribe from 'hooks/useSubscribe';

import useShowtime from 'components/showtime/useShowtime';
import CheckoutForm from './CheckoutForm';

import {
  orderPayload,
  orderEventPayload,
  createReservedSeatingPayload,
  createGeneralSeatingPayload
} from './utils';

const Checkout = () => {
  const dispatch = useDispatch();
  const {
    currentShowtime,
    currentOrder,
    currentOrderEvent,
    seats,
    tickets,
    currentOrderTickets,
    isTimerRunning
  } = useShowtime();
  const [successBlockingSeats, setSuccessBlockingSeats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isReservedSeating = currentShowtime?.isReservedSeating;

  // Post to create order
  const [order, orderMeta] = usePostService(SERVICES.order)({ data: orderPayload });

  // Store order id in reducer
  useEffect(() => {
    if (!currentOrder && order) {
      dispatch(setOrderId(order[0]?.id));
    }
  }, [dispatch, order, currentOrder]);

  // Subscribe to order
  useSubscribe(orderMeta?.links?.subscription);

  const eventLink = orderMeta?.['']?.data[0]?.relationships?.events?.links?.related;
  const paymentOptionsLink =
    orderMeta?.['']?.data[0]?.relationships?.paymentOptions?.links?.related;

  // Post to create order event
  const [orderEvent, orderEventMeta] = usePostService(SERVICES.orderEvent)({
    link: eventLink,
    data: orderEventPayload(currentShowtime.id),
    enableRequest: !!order?.[0]?.id
  });

  // Store order event id in reducer
  useEffect(() => {
    if (!currentOrderEvent && orderEvent) {
      dispatch(setOrderEventId(orderEvent?.[0]?.id));
    }
  }, [dispatch, orderEvent, currentOrderEvent]);

  const orderEventLink = orderEventMeta?.['']?.data[0]?.relationships?.tickets?.links?.related;
  const orderStatus = orderEvent?.[0]?.lifecycleStatus;

  // Post to block seats
  const [orderTickets] = usePostService(SERVICES.orderTicket)({
    link: orderEventLink,
    data: isReservedSeating
      ? createReservedSeatingPayload(tickets, seats)
      : createGeneralSeatingPayload(tickets),
    enableRequest: orderStatus === LIFECYCLE_STATUS.accepted
  });

  // Store tickets ids in reducer
  useEffect(() => {
    if (!currentOrderTickets && orderTickets) {
      dispatch(setOrderTickets(orderTickets.map(ticket => ticket.id)));
    }
  }, [dispatch, currentOrderTickets, orderTickets]);

  // Listen to seat status and define if all seats are blocked.
  useEffect(() => {
    const blockedSeats = currentOrderTickets?.every(
      ticket => ticket.lifecycleStatus === LIFECYCLE_STATUS.accepted
    );
    setSuccessBlockingSeats(blockedSeats);
  }, [currentOrderTickets]);

  // Start timer on reserved seating scenario
  useEffect(() => {
    if (successBlockingSeats && isReservedSeating && !isTimerRunning) {
      dispatch(setOrderTimer(true));
    }
  }, [dispatch, isTimerRunning, isReservedSeating, successBlockingSeats]);

  return (
    <div
      className={cn('showtime-content-wrapper__inner', {
        'showtime-content--loading': !successBlockingSeats || isLoading
      })}
    >
      <CheckoutForm
        paymentOptionsLink={paymentOptionsLink}
        setIsLoading={setIsLoading}
        orderTotal={currentOrder?.charge?.total}
      />
    </div>
  );
};

export default Checkout;
