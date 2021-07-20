import { useState, useEffect, useCallback } from 'react';

const countDownUnitShape = unit => `${unit < 10 ? '0' : ''}${unit}`;

const formatCountdown = time => {
  const mins = Math.floor((time % 3600) / 60);
  const secs = Math.floor(time % 60);

  return `${countDownUnitShape(mins)}:${countDownUnitShape(secs)}`;
};

const TIMER_DURATION = 360;
const TIMER_RUN_OUT = 90;

export default ({ start = true, duration = TIMER_DURATION }) => {
  const [countdown, setCoundown] = useState(duration);

  const tick = useCallback(() => {
    if (countdown > 0) setCoundown(prev => prev - 1);
  }, [countdown]);

  useEffect(() => {
    let timerId;
    if (start) {
      timerId = setInterval(() => tick(), 1000);
    }
    return () => clearInterval(timerId);
  }, [start, tick]);

  return {
    countdown: formatCountdown(countdown),
    isRunOutOfTime: countdown < TIMER_RUN_OUT,
    isTimeUp: countdown === 0
  };
};
