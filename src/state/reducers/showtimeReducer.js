import { createReducer } from '@rootstrap/redux-tools'
import findIndex from 'lodash/findIndex'
import { SHOWTIME_STEPS } from 'constants/showtime'
import {
  initShowtime,
  setShowtimeStep,
  setShowtimeId,
  setVenueId,
  goPreviousStep,
  resetShowtime,
  setShowtimeSubHeader,
  setShowtimeTicketType,
  selectShowtimeSeat,
  unselectShowtimeSeat,
  resetShowtimeReducer,
  setOrderId,
  setOrderEventId,
  setOrderTickets,
  setOrderTimer,
  resetSeatSelection,
  cancelOrder,
  setPayButtonEnable,
} from 'state/actions/showtimeActions'

const obsoleteDataArrays = {
  venueId: [
    'showtimeId',
    'tickets',
    'ticketsCount',
    'seats',
    'orderId',
    'orderEventId',
    'orderTickets',
    'isTimerRunning',
  ],
  showtimeId: [
    'tickets',
    'ticketsCount',
    'seats',
    'orderId',
    'orderEventId',
    'orderTickets',
    'isTimerRunning',
  ],
  ticketType: ['seats', 'orderId', 'orderEventId', 'orderTickets', 'isTimerRunning'],
  seatSelection: ['seats', 'isTimerRunning'],
}

const initialState = {
  currentStep: SHOWTIME_STEPS.theaterSelection,
  movieId: null,
  venueId: null,
  showtimeId: null,
  subHeader: null,
  tickets: [],
  ticketsCount: 0,
  seats: [],
  orderId: null,
  orderEventId: null,
  orderTickets: null,
  isTimerRunning: false,
  isPayButtonEnabled: false,
}

const clearObsoleteData = (arraykey, state) => {
  arraykey.forEach(key => {
    state[key] = initialState[key]
  })
}

const actionHandlers = {
  [initShowtime]: (state, { payload: { movieId = null, venueId = null } }) => {
    state.movieId = movieId
    state.venueId = venueId
    state.currentStep = venueId
      ? SHOWTIME_STEPS.dateShowtimeSelection
      : SHOWTIME_STEPS.theaterSelection
  },
  [setShowtimeStep]: (state, { payload }) => {
    state.currentStep = payload
  },
  [goPreviousStep]: state => {
    if (state.currentStep > SHOWTIME_STEPS.theaterSelection) {
      state.currentStep -= 1
    }
  },
  [resetShowtime]: state => {
    state.currentStep = SHOWTIME_STEPS.dateShowtimeSelection
    clearObsoleteData(...obsoleteDataArrays.showtimeId, state)
  },
  [setShowtimeId]: (state, { payload }) => {
    state.showtimeId = payload
    clearObsoleteData(obsoleteDataArrays.showtimeId, state)
  },
  [setVenueId]: (state, { payload }) => {
    state.venueId = payload
    clearObsoleteData(obsoleteDataArrays.venueId, state)
  },
  [setShowtimeSubHeader]: (state, { payload }) => {
    state.subHeader = payload
  },
  [setShowtimeTicketType]: (state, { payload: { isSubstracting, data } }) => {
    if (isSubstracting) {
      const indexToDelete = state.tickets.findIndex(x => x.id === data.id)
      state.tickets.splice(indexToDelete, 1)
    } else {
      state.tickets = [...state.tickets, { ...data }]
    }

    state.ticketsCount = state.tickets.length
    clearObsoleteData(obsoleteDataArrays.ticketType, state)
  },
  [selectShowtimeSeat]: (state, { payload }) => {
    state.seats = [...state.seats, { ...payload }]
  },
  [unselectShowtimeSeat]: (state, { payload }) => {
    const seatIndex = findIndex(state.seats, payload)
    state.seats.splice(seatIndex, 1)
  },
  [setOrderId]: (state, { payload }) => {
    state.orderId = payload
  },
  [setOrderEventId]: (state, { payload }) => {
    state.orderEventId = payload
  },
  [setOrderTickets]: (state, { payload }) => {
    state.orderTickets = payload
  },
  [setOrderTimer]: (state, { payload }) => {
    state.isTimerRunning = payload
  },
  [resetSeatSelection]: state => {
    clearObsoleteData(obsoleteDataArrays.seatSelection, state)
  },
  [cancelOrder]: state => {
    clearObsoleteData(obsoleteDataArrays.ticketType, state)
  },
  [setPayButtonEnable]: (state, { payload }) => {
    state.isPayButtonEnabled = payload
  },
  [resetShowtimeReducer]: () => initialState,
}

export default createReducer(initialState, actionHandlers)
