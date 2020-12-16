import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Row, Button } from 'reactstrap';

import { Colxx } from '../../../../components/common/CustomBootstrap';

export const StripeComponent = forwardRef(
  ({ paymentMethodRef, cardRef }, ref) => {
    const CARD_OPTIONS = {
      iconStyle: 'solid',
      style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#fff',
          fontWeight: '500',
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '32px',
          fontSmoothing: 'antialiased',
          ':-webkit-autofill': {
            color: '#ffaa45',
          },
          '::placeholder': {
            color: '#ffaa45',
          },
        },
        invalid: {
          iconColor: '#ffc7ee',
          color: '#ffc7ee',
        },
      },
    };

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billingDetails, setBillingDetails] = useState({});

    const CardField = ({ onChange }) => <CardElement options={CARD_OPTIONS} />;
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      if (error) {
        elements.getElement('card').focus();
        return;
      }

      if (cardComplete) {
        setProcessing(true);
      }
      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      });

      setProcessing(false);

      if (payload.error) {
        setError(payload.error);
      } else {
        setPaymentMethod(payload.paymentMethod);
      }
    };

    useImperativeHandle(ref, () => {
      const validateCard = async () => {
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          throw new Error('Stripe not loaded yet');
        }

        // if (error) {
        //   elements.getElement('card')?.focus();
        //   return;
        // }

        // if (cardComplete) {
        //   setProcessing(true);
        // }
        let cardElement = elements.getElement(CardElement);
        if (!cardElement) throw new Error('');

        const payload = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (payload.error || !payload.paymentMethod) {
          throw new Error('Api call went wrong');
        }
        return { type: 'CARD', data: { pm_string: payload.paymentMethod.id } };
      };
    });

    return paymentMethod ? (
      <div>
        <div>Payment successful</div>
        <div>
          Thanks for trying Stripe Elements. No money was charged, but we
          generated a PaymentMethod: {paymentMethod.id}
        </div>
      </div>
    ) : (
      <form className="Form" onSubmit={handleSubmit}>
        <Row>
          <Colxx sm={12}>
            <h3 className="text-center">{error ? error.message : ''}</h3>
          </Colxx>
        </Row>
        <Row>
          <Colxx xl={3} />
          <Colxx xl={6}>
            <fieldset className="FormGroup">
              <CardField
                onChange={(e) => {
                  setError(e.error);
                  setCardComplete(e.complete);
                }}
              />
            </fieldset>
          </Colxx>
          <Colxx xl={3} />
        </Row>
      </form>
    );
  }
);

export default StripeComponent;
