import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { string, shape, func, arrayOf, object } from 'prop-types';

import { ReactComponent as CreditCardIcon } from 'assets/icons/checkout/credit-card.svg';
import { ReactComponent as GoogleIcon } from 'assets/images/checkout/google-pay.svg';
import { ReactComponent as AppleIcon } from 'assets/images/checkout/apple-pay.svg';

import { PAYMENT_METHOD } from 'constants/constants';

import CheckoutPaymentMethod from './CheckoutPaymentMethod';

const creditCardLabel = { id: 'checkout.credit_card' };

const PaymentMethodSelector = ({ selectedMethod, onChange, availablePaymentMethods }) => {
  const intl = useIntl();

  const { isCardSelected, isGoogleSelected, isApplePaySelected } = useMemo(
    () => ({
      isCardSelected: selectedMethod?.paymentType === PAYMENT_METHOD.creditCard,
      isGoogleSelected: selectedMethod?.paymentType === PAYMENT_METHOD.googlePay,
      isApplePaySelected: selectedMethod?.paymentType === PAYMENT_METHOD.applePay
    }),
    [selectedMethod]
  );

  const { isCardAvailable, isGoogleAvailable, isAppleAvailable } = useMemo(() => {
    const getAvailability = method =>
      availablePaymentMethods.some(availableMethod => availableMethod.paymentType === method);

    return {
      isCardAvailable: getAvailability(PAYMENT_METHOD.creditCard),
      isGoogleAvailable: getAvailability(PAYMENT_METHOD.googlePay),
      isAppleAvailable: getAvailability(PAYMENT_METHOD.applePay)
    };
  }, [availablePaymentMethods]);

  return (
    <div className="d-flex">
      {isCardAvailable && (
        <CheckoutPaymentMethod
          selected={isCardSelected}
          onClick={() => onChange(PAYMENT_METHOD.creditCard)}
        >
          <div className="d-flex flex-column">
            <CreditCardIcon />
            <span className="caption-two semibold">{intl.formatMessage(creditCardLabel)}</span>
          </div>
        </CheckoutPaymentMethod>
      )}
      {isGoogleAvailable && (
        <CheckoutPaymentMethod
          selected={isGoogleSelected}
          onClick={() => onChange(PAYMENT_METHOD.googlePay)}
        >
          <GoogleIcon />
        </CheckoutPaymentMethod>
      )}
      {isAppleAvailable && (
        <CheckoutPaymentMethod
          selected={isApplePaySelected}
          onClick={() => onChange(PAYMENT_METHOD.applePay)}
        >
          <AppleIcon />
        </CheckoutPaymentMethod>
      )}
    </div>
  );
};

PaymentMethodSelector.propTypes = {
  selectedMethod: shape({ paymentType: string }),
  onChange: func,
  availablePaymentMethods: arrayOf(object)
};

export default PaymentMethodSelector;
