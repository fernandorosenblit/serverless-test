import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { bool, number } from 'prop-types';
import { useIntl } from 'react-intl';

import { usePrimaryModal } from 'hooks';
import { ReactComponent as DotIcon } from 'assets/icons/beating-dot.svg';
import { ReactComponent as TimerIcon } from 'assets/icons/timer.svg';

import { setOrderTimer, setShowtimeStep } from 'state/actions/showtimeActions';
import { SHOWTIME_STEPS } from 'constants/showtime';
import useTimer from './useTimer';

const labels = {
  modalTitle: { id: 'showtime.timer.modal.title' },
  modalDescription: { id: 'showtime.timer.modal.description' },
  modalCta: { id: 'showtime.timer.modal.cta' }
};

const Timer = ({ start, duration }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { Modal, setIsOpen } = usePrimaryModal();
  const { countdown, isTimeUp, isRunOutOfTime } = useTimer({
    start,
    duration
  });

  useEffect(() => {
    if (isTimeUp) {
      setIsOpen(true);
    }
  }, [setIsOpen, isTimeUp]);

  const handleRightButtonClick = () => {
    dispatch(setShowtimeStep(SHOWTIME_STEPS.seatSelection));
    dispatch(setOrderTimer(false));
    setIsOpen(false);
  };

  return (
    <>
      <span className="timer body1 semibold">
        <DotIcon
          className={cn('timer__dot', {
            'timer__dot--red': isRunOutOfTime
          })}
        />
        <span className={isRunOutOfTime ? 'timer--red' : 'timer--green'}>{countdown}</span>
      </span>
      <Modal
        title={intl.formatMessage(labels.modalTitle)}
        description={intl.formatMessage(labels.modalDescription)}
        icon={TimerIcon}
        rightButtonLabel={intl.formatMessage(labels.modalCta)}
        onRightButtonClick={handleRightButtonClick}
      />
    </>
  );
};

export default Timer;

Timer.propTypes = {
  start: bool,
  duration: number
};
