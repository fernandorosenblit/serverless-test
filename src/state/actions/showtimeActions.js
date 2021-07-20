import { createAction } from '@rootstrap/redux-tools';

export const initShowtime = createAction('INIT_SHOWTIME');
export const resetShowtime = createAction('RESET_SHOWTIME');
export const setShowtimeStep = createAction('SET_SHOWTIME_STEP');
export const goPreviousStep = createAction('GO_PREVIOUS_STEP');
export const setShowtimeId = createAction('SET_SHOWTIME_ID');
export const setVenueId = createAction('SET_VENUE_ID');
export const setShowtimeSubHeader = createAction('SET_SHOWTIME_SUB_HEADER');
export const setShowtimeTicketType = createAction('SET_SHOWTIME_TICKET_TYPE');
export const selectShowtimeSeat = createAction('SELECT_SHOWTIME_SEAT');
export const unselectShowtimeSeat = createAction('UNSELECT_SHOWTIME_SEAT');
export const setOrderId = createAction('SET_ORDER_ID');
export const setOrderEventId = createAction('SET_ORDER_EVENT_ID');
export const setOrderTickets = createAction('SET_ORDER_TICKETS');
export const setOrderTimer = createAction('SET_ORDER_TIMER');
export const cancelOrder = createAction('CANCEL_ORDER');
export const setPayButtonEnable = createAction('SET_PAY_BUTTON_ENABLE');

export const resetShowtimeReducer = createAction('RESET_SHOWTIME_REDUCER');
export const resetSeatSelection = createAction('RESET_SEAT_SELECTION');
