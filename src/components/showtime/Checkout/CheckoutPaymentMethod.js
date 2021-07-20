import React from 'react';
import cn from 'classnames';
import { bool, func } from 'prop-types';

const CheckoutPaymentMethod = ({ selected, onClick, ...props }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn('checkout-payment-method', { 'checkout-payment-method--selected': selected })}
    {...props}
  />
);

CheckoutPaymentMethod.propTypes = {
  selected: bool,
  onClick: func
};

export default CheckoutPaymentMethod;
