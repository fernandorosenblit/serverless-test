/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import cn from 'classnames';

import inputStyle from './checkoutInputStyle';

const WithCheckoutInput = Component => ({
  mandatory = false,
  label,
  small,
  id,
  error,
  type,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const hasError = error[id];

  const handleFocus = () => setActive(true);
  const handleBlur = () => setActive(false);

  return (
    <div className="checkout-input">
      <label
        className={cn('checkout-input__label body3', {
          'checkout-input__label--mandatory': mandatory,
          'checkout-input__label--small': small
        })}
        htmlFor={id}
      >
        {label}
      </label>
      <div
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn('checkout-input__wrapper', {
          'checkout-input__wrapper--small': small,
          'checkout-input__wrapper--active': active && !hasError,
          'checkout-input__wrapper--error': hasError
        })}
      >
        <Component
          id={id}
          options={inputStyle}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={hasError}
        />
      </div>
    </div>
  );
};

export default WithCheckoutInput;
