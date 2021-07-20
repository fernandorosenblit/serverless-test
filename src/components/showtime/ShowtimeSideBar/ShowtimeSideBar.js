import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import { SHOWTIME_STEPS } from 'constants/showtime';

import Button from 'components/common/Button/Button';
import useShowtime from 'components/showtime/useShowtime';

import { dollarTemplate } from 'utils/helpers';
import walletsContext from 'contexts/walletsContext';
import MovieSummary from './Summaries/MovieSummary';
import VenueSummary from './Summaries/VenueSummary';
import ShowtimeSummary from './Summaries/ShowtimeSummary';
import SeatsSummary from './Summaries/SeatsSummary';
import TicketsSummary from './Summaries/TicketsSummary';

const ShowtimeSideBar = () => {
  const intl = useIntl();
  const {
    currentStep,
    currentMovie,
    currentVenue,
    currentShowtime,
    currentOrder,
    seats,
    tickets,
    nextStep,
    isPayButtonEnabled
  } = useShowtime();
  const walletContext = useContext(walletsContext);

  const mustDisplayShowtimePreview = SHOWTIME_STEPS.dateShowtimeSelection === currentStep;
  const mustDiplayOrderTotal = !!currentOrder?.surchargeTotal && !!currentOrder?.total;
  const onCheckoutStep = currentStep === SHOWTIME_STEPS.checkout;

  const getHandleCtaClick = () => {
    if (walletContext?.onSubmitWalletPayment) return walletContext.onSubmitWalletPayment;
    if (onCheckoutStep) return () => {};

    return nextStep.onNextStep;
  };

  return (
    <div className="showtime-sidebar__content">
      <section>
        {currentMovie && <MovieSummary currentMovie={currentMovie} onClick={() => {}} />}
        {currentVenue && <VenueSummary currentVenue={currentVenue} />}
        {currentShowtime && (
          <ShowtimeSummary
            currentShowtime={currentShowtime}
            mustDisplayShowtimePreview={mustDisplayShowtimePreview}
          />
        )}
        {!!tickets.length && <TicketsSummary tickets={tickets} />}
        {!!seats.length && <SeatsSummary seats={seats} />}
        {mustDiplayOrderTotal && (
          <>
            <div className="showtime-sidebar__fees">
              <span className="body3 semibold">
                {intl.formatMessage({ id: 'common.taxesAndFees' })}
              </span>
              <span className="body3 semibold">{dollarTemplate(currentOrder.surchargeTotal)}</span>
            </div>
            <div className="showtime-sidebar__total">
              <span className="semibold">{intl.formatMessage({ id: 'common.total' })}</span>
              <span className="semibold">{dollarTemplate(currentOrder.total)}</span>
            </div>
          </>
        )}
      </section>
      <section className="showtime-sidebar__cta">
        <Button
          onClick={getHandleCtaClick()}
          disabled={!nextStep.enabled || (onCheckoutStep && !isPayButtonEnabled)}
          primary
          overrides={
            onCheckoutStep && !walletContext?.onSubmitWalletPayment
              ? { ButtonElem: { type: 'submit', form: 'stripe-checkout-form' } }
              : undefined
          }
        >
          {intl.formatMessage({ id: nextStep.label })}
        </Button>
      </section>
    </div>
  );
};

export default ShowtimeSideBar;
