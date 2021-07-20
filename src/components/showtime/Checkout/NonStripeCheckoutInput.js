import React from 'react';
import cn from 'classnames';

const NonStripeCheckoutInput = ({ error, ...props }) => (
  <input
    className={cn('non-stripe-checkout-input', { 'non-stripe-checkout-input--error': error })}
    {...props}
  />
);

export default NonStripeCheckoutInput;
