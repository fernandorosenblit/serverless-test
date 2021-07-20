import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import { string } from 'prop-types';

const FadeLabel = ({ label, labelClassName, containerClassName }) => {
  const [currentLabel, setCurrentLabel] = useState('');
  const [upcomingLabel, setUpcomingLabel] = useState('');
  const [currentClassName, setCurrentClassName] = useState('');
  const [upcomingClassName, setUpcomingClassName] = useState('');
  const [animate, setAnimate] = useState(null);
  const [switchedClasses, setSwitchedClasses] = useState(false);

  const notAnimatedAndSwitched = !animate && switchedClasses;
  const animatedAndNotSwitched = animate && !switchedClasses;

  const handleAnimationEnd = useCallback(() => setSwitchedClasses(prevValue => !prevValue), []);

  useEffect(() => {
    if (typeof label === 'string') {
      animate ? setCurrentLabel(label) : setUpcomingLabel(label);
      setAnimate(prevAnimate => !prevAnimate);
    }
  }, [label]);

  useEffect(() => {
    if (typeof labelClassName === 'string') {
      switchedClasses ? setCurrentClassName(labelClassName) : setUpcomingClassName(labelClassName);
    }
  }, [labelClassName, label]);

  return (
    <div className={cn('fade-label', containerClassName)}>
      <span
        onAnimationEnd={handleAnimationEnd}
        className={cn(
          { 'fade-label__upcoming-value': switchedClasses },
          {
            'fade-out-label': animatedAndNotSwitched,
            'fade-in-label': notAnimatedAndSwitched
          },
          currentClassName
        )}
      >
        {currentLabel}
      </span>
      <span
        className={cn(
          { 'fade-label__upcoming-value': !switchedClasses },
          {
            'fade-in-label': animatedAndNotSwitched,
            'fade-out-label': notAnimatedAndSwitched
          },
          upcomingClassName
        )}
      >
        {upcomingLabel}
      </span>
    </div>
  );
};

FadeLabel.propTypes = {
  label: string,
  labelClassName: string,
  containerClassName: string
};

export default FadeLabel;
