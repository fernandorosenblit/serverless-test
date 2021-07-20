import { useState, useEffect } from 'react'
import { useStripe, useElements, CardNumberElement } from '@stripe/react-stripe-js'
import { useIntl } from 'react-intl'

import { matchStripeMethods, convertUnitToCent } from 'components/showtime/Checkout/utils'
import { COUNTRY, CURRENCY } from 'constants/constants'

const labels = {
  paymentError: { id: 'payment.status.error.description' },
  newMethodRequired: { id: 'payment.error.new_method' },
  defaultError: { id: 'common.error' },
}

export default (setAvailablePaymentMethods, clientSecret, orderTotal) => {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentRequest, setPaymentRequest] = useState(null)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const intl = useIntl()

  const paymentSucceeded = () => {
    setError(null)
    setSucceeded(true)
  }

  const submitStripePayment = async () => {
    setError(null)
    setSucceeded(false)

    // Create Payment
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    })

    if (payload.error) {
      setError(intl.formatMessage(labels.paymentError, { error: payload.error.message }))
    } else {
      setError(null)
      setSucceeded(true)
    }
  }

  useEffect(() => {
    if (stripe && orderTotal) {
      const startWalletPayment = async () => {
        try {
          const pr = stripe.paymentRequest({
            country: COUNTRY,
            currency: CURRENCY,
            total: {
              label: 'Hollywood',
              amount: convertUnitToCent(orderTotal),
            },
            requestPayerName: true,
            requestPayerEmail: true,
          })

          const paymentMethods = await pr.canMakePayment()
          setAvailablePaymentMethods(matchStripeMethods(paymentMethods), true)
          if (paymentMethods) {
            setPaymentRequest(pr)
          }
        } catch {
          setError(intl.formatMessage(labels.defaultError))
        }
      }

      startWalletPayment()
    }
  }, [stripe, orderTotal, setAvailablePaymentMethods, intl])

  useEffect(() => {
    if (paymentRequest && clientSecret) {
      paymentRequest.on('paymentmethod', async ev => {
        // Confirm the PaymentIntent without handling potential next actions (yet).
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false },
        )

        if (confirmError) {
          setError(intl.formatMessage(labels.paymentError, { error: confirmError?.error?.message }))
          ev.complete('fail')
        } else {
          ev.complete('success')

          // Check if the PaymentIntent requires any actions and if so let Stripe.js
          // handle the flow.
          if (paymentIntent.status === 'requires_action') {
            // Stripe.js handles the rest of the payment flow.
            const { error } = await stripe.confirmCardPayment(clientSecret)
            if (error) {
              setError(intl.formatMessage(labels.newMethodRequired))
            } else {
              paymentSucceeded()
            }
          } else {
            paymentSucceeded()
          }
        }
      })

      paymentRequest.on('cancel', async () => {
        setError(intl.formatMessage(labels.newMethodRequired))
      })
    }
  }, [paymentRequest, clientSecret, stripe, intl])

  return { submitStripePayment, paymentRequest, succeeded, error }
}
