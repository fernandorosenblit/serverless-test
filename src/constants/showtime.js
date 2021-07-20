export const SHOWTIME_STEPS = {
  theaterSelection: 1,
  dateShowtimeSelection: 2,
  ticketSelection: 3,
  seatSelection: 4,
  checkout: 5
};

export const SHOWTIME_STEPS_LABELS = [
  {
    label: 'showtime.stepper.theater',
    header: 'showtime.header.theater',
    step: SHOWTIME_STEPS.theaterSelection
  },
  {
    label: 'showtime.stepper.date',
    header: 'showtime.header.date',
    step: SHOWTIME_STEPS.dateShowtimeSelection
  },
  {
    label: 'showtime.stepper.ticket',
    header: 'showtime.header.ticket',
    step: SHOWTIME_STEPS.ticketSelection
  },
  {
    label: 'showtime.stepper.seats',
    header: 'showtime.header.seats',
    step: SHOWTIME_STEPS.seatSelection,
    hidden: true
  },
  {
    label: 'showtime.stepper.checkout',
    header: 'showtime.header.checkout',
    step: SHOWTIME_STEPS.checkout
  }
];

export const SHOWTIME_SIDEBAR_CTA_LABELS = [
  {
    label: 'sidebar_showtime.cta.step1',
    step: SHOWTIME_STEPS.theaterSelection
  },
  {
    label: 'sidebar_showtime.cta.step2',
    step: SHOWTIME_STEPS.dateShowtimeSelection
  },
  {
    label: 'sidebar_showtime.cta.step3',
    step: SHOWTIME_STEPS.ticketSelection
  },
  {
    label: 'sidebar_showtime.cta.step4',
    step: SHOWTIME_STEPS.seatSelection
  },
  {
    label: 'sidebar_showtime.cta.step5',
    step: SHOWTIME_STEPS.checkout
  }
];
