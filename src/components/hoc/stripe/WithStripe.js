import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe(process.env.STRIPE_PK);

const options = {
  fonts: [{ cssSrc: process.env.FONT_FAMILY_URL }]
};

const withStripe = Component => props => (
  <Elements stripe={promise} options={options}>
    <Component {...props} />
  </Elements>
);

export default withStripe;
