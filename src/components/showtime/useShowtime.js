import { useSelector, useDispatch } from 'react-redux';
import build from 'redux-object';
import match from 'conditional-expression';

import { setShowtimeStep } from 'state/actions/showtimeActions';
import { SERVICES } from 'constants/serviceAccessors';
import { REDUX_BUILD_OPTIONS } from 'constants/constants';
import { SHOWTIME_SIDEBAR_CTA_LABELS, SHOWTIME_STEPS } from 'constants/showtime';
import { sortByDisplayRank } from 'utils/helpers';
import { SOLD_OUT_STATUS } from 'constants/event';

export default () => {
  const dispatch = useDispatch();
  const {
    subHeader,
    currentStep,
    currentMovie,
    currentVenue,
    currentShowtime,
    seats,
    tickets,
    ticketsCount,
    unavailableSeats,
    currentOrder,
    currentOrderEvent,
    currentOrderTickets,
    isTimerRunning,
    isPayButtonEnabled
  } = useSelector(
    ({
      api,
      showtime: {
        subHeader,
        currentStep,
        movieId,
        venueId,
        showtimeId,
        seats,
        tickets,
        ticketsCount,
        orderId,
        orderEventId,
        orderTickets,
        isTimerRunning,
        isPayButtonEnabled
      }
    }) => ({
      subHeader,
      currentStep,
      currentMovie: movieId && build(api, SERVICES.movie, movieId, REDUX_BUILD_OPTIONS),
      currentVenue: venueId && build(api, SERVICES.venue, venueId, REDUX_BUILD_OPTIONS),
      currentShowtime: showtimeId && build(api, SERVICES.event, showtimeId, REDUX_BUILD_OPTIONS),
      seats,
      unavailableSeats: build(api, SERVICES.eventUnavailableSeats, showtimeId, REDUX_BUILD_OPTIONS),
      tickets: sortByDisplayRank(tickets),
      ticketsCount,
      currentOrder: orderId && build(api, SERVICES.order, orderId, REDUX_BUILD_OPTIONS),
      currentOrderEvent:
        orderEventId && build(api, SERVICES.orderEvent, orderEventId, REDUX_BUILD_OPTIONS),
      currentOrderTickets:
        orderTickets && build(api, SERVICES.orderTicket, orderTickets, REDUX_BUILD_OPTIONS),
      isTimerRunning,
      isPayButtonEnabled
    })
  );

  const enableNextStep = match(currentStep)
    .equals(SHOWTIME_STEPS.theaterSelection)
    .then(!!currentVenue)
    .equals(SHOWTIME_STEPS.dateShowtimeSelection)
    .then(!!currentShowtime)
    .equals(SHOWTIME_STEPS.ticketSelection)
    .then(ticketsCount)
    .equals(SHOWTIME_STEPS.seatSelection)
    .then(seats?.length === ticketsCount)
    .equals(SHOWTIME_STEPS.checkout)
    .then(true)
    .else(false);

  const onNextStep = () => {
    const nextStep = match(currentStep)
      .equals(SHOWTIME_STEPS.theaterSelection)
      .then(SHOWTIME_STEPS.dateShowtimeSelection)
      .equals(SHOWTIME_STEPS.dateShowtimeSelection)
      .then(SHOWTIME_STEPS.ticketSelection)
      .equals(SHOWTIME_STEPS.ticketSelection)
      .then(SHOWTIME_STEPS.seatSelection)
      .equals(SHOWTIME_STEPS.seatSelection)
      .then(SHOWTIME_STEPS.checkout)
      .equals(SHOWTIME_STEPS.checkout)
      .then(true)
      .else(SHOWTIME_STEPS.theaterSelection);

    return dispatch(setShowtimeStep(nextStep));
  };

  const stepInfo = SHOWTIME_SIDEBAR_CTA_LABELS.find(({ step }) => step === currentStep);

  // Errors
  const isSoldOut = currentShowtime?.soldOutStatus?.name === SOLD_OUT_STATUS.soldOut;

  return {
    subHeader,
    currentStep,
    currentMovie,
    currentVenue,
    currentShowtime,
    seats,
    unavailableSeats,
    tickets,
    ticketsCount,
    nextStep: {
      label: stepInfo.label,
      enabled: enableNextStep,
      onNextStep
    },
    currentOrder,
    currentOrderEvent,
    currentOrderTickets,
    isTimerRunning,
    errors: {
      isSoldOut,
      selectedSeatUnavailable: !!currentOrderTickets?.some(ticket => ticket.needsAttention)
    },
    isPayButtonEnabled
  };
};
