import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { node, number } from 'prop-types';
import { useIntl } from 'react-intl';
import cn from 'classnames';

import { SHOWTIME_STEPS_LABELS, SHOWTIME_STEPS } from 'constants/showtime';

import { usePrimaryModal } from 'hooks';

import {
  cancelOrder,
  goPreviousStep,
  resetSeatSelection,
  resetShowtime
} from 'state/actions/showtimeActions';

import WalletsContext from 'contexts/walletsContext';
import { ReactComponent as GoBackArrow } from 'assets/icons/back-arrow.svg';

import FixedSideBar from 'components/common/FixedSideBar/FixedSideBar';

import Timer from 'components/showtime/Timer/Timer';
import useShowtime from 'components/showtime/useShowtime';
import ShowtimeSideBar from 'components/showtime/ShowtimeSideBar/ShowtimeSideBar';

const stepWithBackground = [SHOWTIME_STEPS.theaterSelection, SHOWTIME_STEPS.dateShowtimeSelection];

const labels = {
  soldOutModalLabels: {
    title: { id: 'showtime.modal.sold_out.title' },
    description: { id: 'showtime.modal.sold_out.description' },
    cta: { id: 'showtime.modal.sold_out.cta' }
  },
  selectedSeatUnavailable: {
    title: { id: 'showtime.modal.selected_seat_unavailable.title' },
    description: { id: 'showtime.modal.selected_seat_unavailable.description' },
    cta: { id: 'showtime.modal.selected_seat_unavailable.cta' }
  },
  leaveCheckout: {
    title: { id: 'showtime.modal.leave_checkout.title' },
    description: { id: 'showtime.modal.leave_checkout.description' },
    ctaLeft: { id: 'showtime.modal.leave_checkout.cta_left' },
    ctaRight: { id: 'showtime.modal.leave_checkout.cta_right' }
  }
};

const ShowtimeContent = ({ currentStep, children }) => {
  const [walletContext, setWalletContext] = useState(null);
  const dispatch = useDispatch();
  const intl = useIntl();

  const { Modal: LeaveCheckoutModal, setIsOpen: setIsOpenLeaveCheckoutModal } = usePrimaryModal();
  const { Modal: SoldOutModal, setIsOpen: setIsOpenSoldOutModal } = usePrimaryModal();
  const {
    Modal: SelectedSeatUnavailableModal,
    setIsOpen: setIsOpenSelectedSeatUnavailable
  } = usePrimaryModal();
  const {
    subHeader,
    isTimerRunning,
    errors: { isSoldOut, selectedSeatUnavailable }
  } = useShowtime();

  const stepInfo = SHOWTIME_STEPS_LABELS.find(({ step }) => step === currentStep);

  const handleGoBack = useCallback(() => {
    isTimerRunning && currentStep === SHOWTIME_STEPS.seatSelection
      ? setIsOpenLeaveCheckoutModal(true)
      : dispatch(goPreviousStep());
  }, [dispatch, setIsOpenLeaveCheckoutModal, isTimerRunning, currentStep]);

  const handleLeaveCheckout = useCallback(() => {
    dispatch(goPreviousStep());
    dispatch(cancelOrder());
    setIsOpenLeaveCheckoutModal(false);
  }, [dispatch, setIsOpenLeaveCheckoutModal]);

  // Sold Out status
  const handleSoldOutStatus = useCallback(() => {
    dispatch(resetShowtime());
    setIsOpenSoldOutModal(false);
  }, [dispatch, setIsOpenSoldOutModal]);

  useEffect(() => {
    setIsOpenSoldOutModal(isSoldOut);
  }, [setIsOpenSoldOutModal, isSoldOut]);

  // Unavailable seat status
  const handleSeletedSeatUnavailable = useCallback(() => {
    dispatch(resetSeatSelection());
    dispatch(goPreviousStep());
    setIsOpenSelectedSeatUnavailable(false);
  }, [dispatch, setIsOpenSelectedSeatUnavailable]);

  useEffect(() => {
    setIsOpenSelectedSeatUnavailable(selectedSeatUnavailable);
  }, [setIsOpenSelectedSeatUnavailable, selectedSeatUnavailable]);

  return (
    <WalletsContext.Provider value={{ onSubmitWalletPayment: walletContext, setWalletContext }}>
      <div className="showtime-content d-flex">
        <div className="showtime-content-container">
          <div className="showtime-content-container__header-wrapper">
            {currentStep > SHOWTIME_STEPS.theaterSelection && (
              <button
                className="showtime-content-container__back-button"
                type="button"
                onClick={handleGoBack}
                aria-label={intl.formatMessage({ id: 'common.goBack' })}
              >
                <GoBackArrow />
              </button>
            )}
            <h1 className="showtime-content-container__header">
              {intl.formatMessage({ id: stepInfo.header })}
            </h1>
            {isTimerRunning && <Timer />}
          </div>
          {subHeader && (
            <span className="showtime-content-container__sub-header body2">{subHeader}</span>
          )}
          <div
            className={cn('showtime-content-wrapper', {
              'showtime-content-wrapper--with-background': stepWithBackground.includes(currentStep)
            })}
          >
            {children}
          </div>
        </div>
        <FixedSideBar className="showtime-fixed-sidebar">
          <ShowtimeSideBar />
        </FixedSideBar>
        <SoldOutModal
          title={intl.formatMessage(labels.soldOutModalLabels.title)}
          description={intl.formatMessage(labels.soldOutModalLabels.description)}
          rightButtonLabel={intl.formatMessage(labels.soldOutModalLabels.cta)}
          onRightButtonClick={handleSoldOutStatus}
        />

        <SelectedSeatUnavailableModal
          title={intl.formatMessage(labels.selectedSeatUnavailable.title)}
          description={intl.formatMessage(labels.selectedSeatUnavailable.description)}
          rightButtonLabel={intl.formatMessage(labels.selectedSeatUnavailable.cta)}
          onRightButtonClick={handleSeletedSeatUnavailable}
        />

        <LeaveCheckoutModal
          title={intl.formatMessage(labels.leaveCheckout.title)}
          description={intl.formatMessage(labels.leaveCheckout.description)}
          leftButtonLabel={intl.formatMessage(labels.leaveCheckout.ctaLeft)}
          onLeftButtonClick={handleLeaveCheckout}
          rightButtonLabel={intl.formatMessage(labels.leaveCheckout.ctaRight)}
          onRightButtonClick={() => setIsOpenLeaveCheckoutModal(false)}
        />
      </div>
    </WalletsContext.Provider>
  );
};

ShowtimeContent.propTypes = {
  children: node.isRequired,
  currentStep: number.isRequired
};

export default ShowtimeContent;
