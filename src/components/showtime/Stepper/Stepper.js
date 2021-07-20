import React from 'react';
import cn from 'classnames';
import { number } from 'prop-types';
import { useIntl } from 'react-intl';

import { SHOWTIME_STEPS_LABELS } from 'constants/showtime';
import useStepper from './useStepper';

const Stepper = ({ currentStep }) => {
  const intl = useIntl();
  const steps = useStepper(SHOWTIME_STEPS_LABELS.map(step => ({ ...step })));

  return (
    <div className="stepper">
      {steps.map(({ label, step, hidden }, index) => (
        <div
          className={cn(
            'stepper__option',
            { 'stepper__option--hidden': hidden },
            { 'stepper__option--step-done': step < currentStep },
            { 'stepper__option--current-step': step === currentStep }
          )}
          key={index}
        >
          <span className="stepper__option-label">{intl.formatMessage({ id: label })}</span>
        </div>
      ))}
    </div>
  );
};

Stepper.propTypes = {
  currentStep: number.isRequired
};

export default Stepper;
