import React, { useEffect, useCallback } from 'react';
import { Row, Form, FormGroup, CustomInput, Label } from 'reactstrap';

import { injectIntl } from 'react-intl';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { PaymentMethod } from './PaymentMethod';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Field, Formik } from 'formik';
import {
  validateAccountNumber,
  validateRegNumber,
} from '../../../../helpers/Validators';
import { NotificationManager } from '../../../../components/common/react-notifications';

interface Props {
  locale;
  user;
  intl;
  setPaymentMethod: (pm: PaymentMethod) => void;
  paymentMethod: PaymentMethod;
  paymentMethodRef;
  cardSubmit;
  setLoading;
  uploadPlan;
}

const PaymentMethodsEntry = (props: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const validateCard = useCallback(async (): Promise<PaymentMethod> => {
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
  },[elements,stripe]);

  useEffect(() => {
    // do submit stuff
    if (props.cardSubmit !== 0) {
      props.setLoading(true);
      validateCard()
        .then((value) => {
          props.uploadPlan(value);
        })
        .catch((error) => {
          NotificationManager.warning(
            'Kunne ikke uploade betalingsoplysninger. Dobbelt-tjek dine information og prøv igen, eller kontakt support.',
            'Fejl',
            3000,
            null,
            null,
            ''
          );
          props.setLoading(false);
        });
    }
  }, [props.cardSubmit,props,validateCard]);
  return (
    <>
      <div className="container">
      <CustomInput
        type="radio"
        name="pmradio"
        id="chooseDebit"
        label={'Betalingsservice/Leverandørservice'}
        onChange={() =>
          props.setPaymentMethod({
            type: 'DEBIT',
            data: { reg: '', account: '' },
          })
        }
        checked={props.paymentMethod.type === 'DEBIT'}
      />
      <CustomInput
        type="radio"
        name="pmradio"
        id="chooseCard"
        label={'Betalingskort'}
        onChange={() =>
          props.setPaymentMethod({ type: 'CARD', data: { pm_string: '' } })
        }
        checked={props.paymentMethod.type === 'CARD'}
      />
      {props.paymentMethod.type === 'DEBIT' ? (
        <>
          <Formik
            initialValues={{ reg: '', account: '' }}
            innerRef={(instance) => {
              props.paymentMethodRef[0] = instance;
            }}
            onSubmit={() => {}}
          >
            {({ errors, touched }) => (
            <Form className="av-tooltip tooltip-label-bottom mt-5">
              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages
                    defaultMessage="Registrerings-nummer"
                    id="user.debit_reg_number"
                  />
                </Label>
                <Field
                  className="form-control"
                  name="reg"
                  validate={validateRegNumber}
                />
                {errors.reg && touched.reg && (
                  <div className="invalid-feedback d-block">{errors.reg}</div>
                )}
              </FormGroup>
              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages
                    defaultMessage="Konto-nummer"
                    id="user.debit_reg_number"
                  />
                </Label>
                <Field
                  className="form-control"
                  name="account"
                  validate={validateAccountNumber}
                />
                {errors.account && touched.account && (
                  <div className="invalid-feedback d-block">
                    {errors.account}
                  </div>
                )}
              </FormGroup>
            </Form>
            )}
          </Formik>
        </>
      ) : (
        <form className="Form" onSubmit={() => {}}>
          <Row>
            <Colxx sm={12}>
              {/* <h3 className="text-center">{error ? error.message : ''}</h3> */}
            </Colxx>
          </Row>
          <Row>
            <Colxx xl={3} />
            <Colxx xl={12}>
              <fieldset className="FormGroup mt-2 mb-4">
                <div className="credit-card-box">
                  <CardElement options={CARD_OPTIONS} />
                </div>
                
              </fieldset>
            </Colxx>
            <Colxx xl={3} />
          </Row>
        </form>
      )}
      </div>
    </>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user, loading, error } = reducers.authUser;
  const { locale } = reducers.settings;
  return { user, loading, error, locale };
};

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#ffaa45',
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

export default injectIntl(connect(mapStateToProps, {})(PaymentMethodsEntry));
