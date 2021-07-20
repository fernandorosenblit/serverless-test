import { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'

import { SERVICES } from 'constants/serviceAccessors'
import { PAYMENT_METHOD } from 'constants/constants'
import { paymentPayload } from 'components/showtime/Checkout/utils'

import { useGetService, usePostService } from 'hooks'

export default paymentOptionsLink => {
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState([])
  const [wereStripeMethodsRetrieved, setWereStripeMethodsRetrieved] = useState(false)
  const [payOrder, setPayOrder] = useState(false)
  const [stripeClientSecret, setStripeClientSecret] = useState(null)

  // Get payment options
  const [paymentsOptions, paymentsOptionsMeta] = useGetService(SERVICES.orderPaymentOption)(null, {
    link: paymentOptionsLink,
    enableRequest: !!paymentOptionsLink,
  })

  const paymentLink = paymentMethod?.links?.payment

  // Create payment Intent
  const [paymentData] = usePostService(SERVICES.payment)({
    data: paymentPayload,
    link: paymentLink,
    enableRequest: !!(paymentLink && payOrder),
  })

  const clientSecret = paymentData?.[0]?.hostedMetadata?.clientSecret

  // Initialize a new payment
  const initPayment = () => {
    setStripeClientSecret(null)
    setPayOrder(true)
  }

  // Handling all the possible cases in which stripe methods and HW methods could be retrieved to avoid race conditions
  const handleAvailablePaymentMethods = useCallback((methods, isStripe) => {
    const emptyMethods = isEmpty(availablePaymentMethods)

    if (isStripe) {
      const emptyStripeMethods = isEmpty(methods)
      if (emptyStripeMethods && emptyMethods) {
        setWereStripeMethodsRetrieved(true)
        return
      }
      if (emptyStripeMethods) {
        setWereStripeMethodsRetrieved(true)
        setAvailablePaymentMethods(currentMethods =>
          currentMethods.filter(
            currentMethod => currentMethod.paymentType === PAYMENT_METHOD.creditCard,
          ),
        )
        return
      }

      if (emptyMethods) setAvailablePaymentMethods(methods)
      else {
        setAvailablePaymentMethods(currentMethods =>
          currentMethods.filter(
            currentMethod =>
              methods.includes(currentMethod.paymentType) ||
              currentMethod.paymentType === PAYMENT_METHOD.creditCard,
          ),
        )
      }
      setWereStripeMethodsRetrieved(true)
    } else if (wereStripeMethodsRetrieved) {
      setAvailablePaymentMethods(currentMethods =>
        methods.filter(
          method =>
            currentMethods.includes(method.paymentType) ||
            method.paymentType === PAYMENT_METHOD.creditCard,
        ),
      )
    } else {
      setAvailablePaymentMethods(methods)
    }
  })

  useEffect(() => {
    clientSecret && setStripeClientSecret(clientSecret)
  }, [clientSecret])

  useEffect(() => {
    payOrder && setPayOrder(false)
  }, [payOrder])

  useEffect(() => {
    paymentsOptions && handleAvailablePaymentMethods(paymentsOptions)
  }, [handleAvailablePaymentMethods, paymentsOptions])

  useEffect(() => {
    const wereMethodsRetrieved = paymentsOptionsMeta?.success && wereStripeMethodsRetrieved
    const emptyMethods = isEmpty(availablePaymentMethods)

    if (wereMethodsRetrieved && !paymentMethod && !emptyMethods) {
      setPaymentMethod(
        availablePaymentMethods?.find(method => method.paymentType === PAYMENT_METHOD.creditCard),
      )
    }
  }, [
    wereStripeMethodsRetrieved,
    availablePaymentMethods.length,
    paymentsOptionsMeta,
    availablePaymentMethods,
    paymentMethod,
  ])

  return {
    handleAvailablePaymentMethods,
    paymentMethod,
    setPaymentMethod,
    availablePaymentMethods:
      (paymentsOptionsMeta && wereStripeMethodsRetrieved && availablePaymentMethods) || [],
    stripeClientSecret,
    initPayment,
  }
}
