import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useIntl } from 'react-intl';
import { string, func, number } from 'prop-types';

import { FORM_IDS, STRIPE_INPUT_IDS, PAYMENT_METHOD } from 'constants/constants';
import { setPayButtonEnable } from 'state/actions/showtimeActions';

import { useStripePayments, useValidation, usePrimaryModal } from 'hooks';
import usePayments from 'hooks/payments/usePayments';
import { stripeForm as stripeFormValidations } from 'utils/constraints';

import walletsContext from 'contexts/walletsContext';
import Checkbox from 'components/common/Checkbox/Checkbox';
import WithStripe from 'components/hoc/stripe/WithStripe';
import WithCheckoutInput from 'components/hoc/stripe/WithCheckoutInput';
import NonStripeCheckoutInput from './NonStripeCheckoutInput';
import PaymentMethodSelector from './PaymentMethodSelector';

const labels = {
  cardName: { id: 'checkout.input.card_name' },
  cardNumber: { id: 'checkout.input.card_number' },
  cardExpiration: { id: 'checkout.input.expiration' },
  cardCvv: { id: 'checkout.input.cvv' },
  receipt: { id: 'checkout.input.receipt' },
  receiptPlaceholder: { id: 'common.email.enter' },
  mktEmails: { id: 'checkout.mkt_emails' },
  saveCard: { id: 'checkout.save_card' },
  paymentError: { id: 'payment.status.error.title' },
  paymentSucceededTitle: { id: 'payment.status.succeeded.title' },
  paymentSucceeded: { id: 'payment.status.succeeded.description' },
  newMethodRequired: { id: 'payment.error.new_method' }
};

const CardNameInput = WithCheckoutInput(NonStripeCheckoutInput);
const CardNumberInput = WithCheckoutInput(CardNumberElement);
const CardExpiryInput = WithCheckoutInput(CardExpiryElement);
const CardCvcInput = WithCheckoutInput(CardCvcElement);
const ReceiptInput = WithCheckoutInput(NonStripeCheckoutInput);

// TO DO: remove when integration is completed
/* eslint-disable no-unused-vars */

const CheckoutForm = ({ paymentOptionsLink, setIsLoading, orderTotal }) => {
  const walletContext = useContext(walletsContext);
  const {
    paymentMethod,
    setPaymentMethod,
    availablePaymentMethods,
    handleAvailablePaymentMethods,
    stripeClientSecret,
    initPayment
  } = usePayments(paymentOptionsLink);
  const { paymentRequest, submitStripePayment, succeeded, error: stripeError } = useStripePayments(
    handleAvailablePaymentMethods,
    stripeClientSecret,
    orderTotal
  );
  const { Modal: ErrorModal, setIsOpen: setIsOpenErrorModal } = usePrimaryModal();
  const { Modal: SucceededModal, setIsOpen: setIsOpenSucceededModal } = usePrimaryModal();

  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [
    {
      [STRIPE_INPUT_IDS.cardNumber]: isCardNumberCompleted,
      [STRIPE_INPUT_IDS.cardExpDate]: isCardExpDateCompleted,
      [STRIPE_INPUT_IDS.cardCvc]: isCardCvcCompleted,
      [STRIPE_INPUT_IDS.cardName]: isCardNameCompleted,
      [STRIPE_INPUT_IDS.cardReceiptEmail]: isReceiptEmailCompleted
    },
    setAreMandatoryInputsCompleted
  ] = useState({
    [STRIPE_INPUT_IDS.cardNumber]: false,
    [STRIPE_INPUT_IDS.cardExpDate]: false,
    [STRIPE_INPUT_IDS.cardCvc]: false,
    [STRIPE_INPUT_IDS.cardName]: false,
    [STRIPE_INPUT_IDS.cardReceiptEmail]: false
  });
  const validator = useValidation(stripeFormValidations);
  const [saveCard, setSaveCard] = useState(false);
  const [mktPromo, setMktPromo] = useState(false);
  const intl = useIntl();

  const validateCreditCardForm = id => {
    if (id !== PAYMENT_METHOD.creditCard) return;

    if (
      isCardNumberCompleted &&
      isCardExpDateCompleted &&
      isCardCvcCompleted &&
      isCardNameCompleted &&
      isReceiptEmailCompleted
    ) {
      dispatch(setPayButtonEnable(true));
    } else {
      dispatch(setPayButtonEnable(false));
    }
  };

  const handleStripeChange = async ({ elementType, empty, error, complete }) => {
    setAreMandatoryInputsCompleted(completedInputs => ({
      ...completedInputs,
      [elementType]: complete
    }));

    setFormErrors(errors => {
      const newErrors = { ...errors };
      if (error || empty) {
        newErrors[elementType] = true;
      } else {
        delete newErrors[elementType];
      }
      return newErrors;
    });
  };

  const handleNonStripeChange = ({ target: { id, value } }) => {
    const newValue = { [id]: value };
    const error = validator(newValue);

    if (id === STRIPE_INPUT_IDS.cardName || id === STRIPE_INPUT_IDS.cardReceiptEmail) {
      setAreMandatoryInputsCompleted(completedInputs => ({
        ...completedInputs,
        [id]: !error?.[id]
      }));
    }

    setFormErrors(errors => {
      const newErrors = { ...errors };
      if (error?.[id]) {
        newErrors[id] = true;
      } else {
        delete newErrors[id];
      }
      return newErrors;
    });

    setValues(prev => ({ ...prev, ...newValue }));
  };

  const handleWalletPay = () => {
    initPayment();
    setIsLoading(true);
    dispatch(setPayButtonEnable(false));
  };

  const handlePaymentMethodChange = id => {
    const setWalletContext = walletContext?.setWalletContext;
    setPaymentMethod(availablePaymentMethods?.find(method => method.paymentType === id));

    if (setWalletContext) {
      if (PAYMENT_METHOD.creditCard === id) {
        setWalletContext(null);
        validateCreditCardForm(id);
      } else {
        setWalletContext(() => handleWalletPay);
        dispatch(setPayButtonEnable(true));
      }
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    initPayment();
    dispatch(setPayButtonEnable(false));
  };

  useEffect(() => {
    validateCreditCardForm(paymentMethod?.paymentType);
  }, [
    isCardNumberCompleted,
    isCardExpDateCompleted,
    isCardCvcCompleted,
    isCardNameCompleted,
    isReceiptEmailCompleted,
    paymentMethod?.paymentType
  ]);

  useEffect(() => {
    paymentMethod && setIsLoading(false);
  }, [paymentMethod, setIsLoading]);

  useEffect(() => {
    if (stripeClientSecret && paymentMethod?.paymentType === PAYMENT_METHOD.creditCard) {
      submitStripePayment();
    } else if (stripeClientSecret) {
      paymentRequest?.show();
    }
  }, [stripeClientSecret]);

  useEffect(() => {
    if (succeeded) {
      setIsLoading(false);
      setIsOpenSucceededModal(true);
    } else if (stripeError) {
      setIsOpenErrorModal(true);
      setIsLoading(false);
      dispatch(setPayButtonEnable(true));
    }
  }, [succeeded, stripeError, setIsLoading, setIsOpenSucceededModal, setIsOpenErrorModal]);

  return (
    <>
      {paymentMethod && (
        <>
          <ErrorModal title={intl.formatMessage(labels.paymentError)} description={stripeError} />
          <SucceededModal
            title={intl.formatMessage(labels.paymentSucceededTitle)}
            description={intl.formatMessage(labels.paymentSucceeded)}
          />
          <PaymentMethodSelector
            availablePaymentMethods={availablePaymentMethods}
            selectedMethod={paymentMethod}
            onChange={handlePaymentMethodChange}
          />
          <form className="checkout-form" onSubmit={handleFormSubmit} id={FORM_IDS.stripeCheckout}>
            <CardNameInput
              onChange={handleNonStripeChange}
              label={intl.formatMessage(labels.cardName)}
              mandatory
              id={STRIPE_INPUT_IDS.cardName}
              error={formErrors}
            />
            <fieldset>
              <CardNumberInput
                onChange={handleStripeChange}
                label={intl.formatMessage(labels.cardNumber)}
                mandatory
                id={STRIPE_INPUT_IDS.cardNumber}
                error={formErrors}
              />
              <div className="checkout-form__exp-and-cvv-wrapper d-flex">
                <CardExpiryInput
                  onChange={handleStripeChange}
                  label={intl.formatMessage(labels.cardExpiration)}
                  mandatory
                  small
                  id={STRIPE_INPUT_IDS.cardExpDate}
                  error={formErrors}
                />
                <CardCvcInput
                  onChange={handleStripeChange}
                  label={intl.formatMessage(labels.cardCvv)}
                  mandatory
                  small
                  id={STRIPE_INPUT_IDS.cardCvc}
                  error={formErrors}
                />
              </div>
            </fieldset>
            <Checkbox
              label={intl.formatMessage(labels.saveCard)}
              labelClassName="checkout-form__checkbox-label"
              selected={saveCard}
              onSelect={() => setSaveCard(prev => !prev)}
            />
            <ReceiptInput
              label={intl.formatMessage(labels.receipt)}
              placeholder={intl.formatMessage(labels.receiptPlaceholder)}
              onChange={handleNonStripeChange}
              id={STRIPE_INPUT_IDS.cardReceiptEmail}
              mandatory
              error={formErrors}
            />
            <Checkbox
              label={intl.formatMessage(labels.mktEmails)}
              labelClassName="checkout-form__checkbox-label"
              selected={mktPromo}
              onSelect={() => setMktPromo(prev => !prev)}
              error={formErrors}
            />
          </form>
        </>
      )}
    </>
  );
};

CheckoutForm.propTypes = {
  paymentOptionsLink: string,
  setIsLoading: func.isRequired,
  orderTotal: number
};

export default WithStripe(CheckoutForm);
