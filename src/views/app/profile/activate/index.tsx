import React, { useState, createRef, useEffect, useCallback, useRef } from 'react';
import {
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Spinner,
  CardBody,
  Row,
} from 'reactstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Wizard, Steps, Step } from 'react-albus';
import { Formik, Field } from 'formik';
import plans from './plans';

import { injectIntl } from 'react-intl';
import {
  validateEmail,
  validateNotEmpty,
} from '../../../../helpers/Validators';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import Api from '../../../../helpers/Api';
import { NotificationManager } from '../../../../components/common/react-notifications';
import TopNavigation from '../../../../components/wizard/TopNavigation';
import ShowPlanCards from './ShowPlanCards';
import PaymentMethodsEntry from './PaymentMethodsEntry';
import { PaymentMethod } from './PaymentMethod';
import BottomNavigationLoading from '../../../../components/wizard/BottomNavigationLoading';
import '../../../../assets/css/sass/custom/merchant_activate.scss';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const Activate = ({ locale, user, intl }) => {
  const profile = user.user_object;
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe(
    'pk_live_9ceoyJ9BiVDppdLKHcdFc71L00WVIWCjKw'
  );

  const forms = [createRef<any>(), createRef<any>(), createRef<any>()];
  const profileRef = [createRef<any>()];
  const wizardRef = useRef<any>();
  const paymentMethodRef = [createRef<any>()];
  const [cardSubmit, doCardSubmit] = useState<number>(0);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'DEBIT',
    data: { reg: '', account: '' },
  });
  const [fields, setFields] = useState([
    {
      valid: false,
      name: 'name',
      value: '',
    },
    {
      valid: false,
      name: 'email',
      value: '',
    },
    {
      valid: false,
      name: 'password',
      value: '',
    },
  ]);

  const [selPlan, setSelPlan] = useState(plans[locale][0]);

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    if (step.id === 'step1') {
      const form = profileRef[0] as any;
      form.submitForm().then(() => {
        if (Object.keys(form.errors).length === 0) {
          setLoading(true);
          let body = { ...form.values, id: profile.id };
          Api.updateMerchantProfile(body, locale)
            .then(() => {
              setLoading(false);
              goToNext();
            })
            .catch(() => {
              setLoading(false);
              NotificationManager.warning(
                'Handlingen mislykkedes. Prøv igen senere eller kontakt support.',
                'Fejl',
                3000,
                null,
                null,
                ''
              );
            });
        } else form.validateForm();
      });
    } else if (step.id === 'step2') {
      goToNext();
    } else if (step.id === 'step3') {
      // validate either stripe or reg-account number form using refs
      if (paymentMethod.type === 'DEBIT') {
        const form = paymentMethodRef[0] as any;
        form.submitForm().then(() => {
          if (
            Object.keys(form.errors).length === 0 &&
            Object.keys(form.touched).length === Object.keys(form.values).length
          ) {
            setPaymentMethod({ ...paymentMethod, data: form.values });
            uploadPlan({ ...paymentMethod, data: form.values });
          } else form.validateForm();
        });
      } else {
        doCardSubmit(cardSubmit + 1);
      }
    } else {
      const formIndex = steps.indexOf(step);
      const form = forms[formIndex] as any;
      const { name } = fields[formIndex];
      form.submitForm().then(() => {
        const newFields = [...fields];

        newFields[formIndex].value = form.values[name];
        newFields[formIndex].valid = !form.errors[name];
        setFields(newFields);

        if (!form.errors[name] && form.touched[name]) {
          goToNext();
          step.isDone = true;
          if (steps.length - 2 <= steps.indexOf(step)) {
            setBottomNavHidden(true);
            // asyncLoading();
          }
        }
      });
    }
  };
  useEffect(() =>{console.log(wizardRef.current)},[fields,wizardRef]);

  const uploadPlan = useCallback((paymentMethod: PaymentMethod) => {
    setLoading(true);

    let object = { plan_name: selPlan.id };
    if (paymentMethod.type === 'DEBIT') {
      object['debit'] = { ...paymentMethod.data };
    } else {
      object['card'] = { ...paymentMethod.data };
    }

    Api.updateMerchantPlan(object, locale)
      .then(() => {
        setLoading(false);
        console.log(wizardRef.current);
        wizardRef.current.next();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        NotificationManager.warning("Der skete en fejl. Prøv igen senere eller kontakt support.","Fejl",3000,null,null,"");
      });
  },[wizardRef,locale,selPlan]);

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  if(!user.user_object) return <Spinner/>
  const initialValues = {
    email: profile.email,
    company_name: profile.company_name,
    legal_address: profile.legal_address,
    legal_zip: profile.legal_zipcode,
    legal_city: profile.legal_city,
    contact_name: profile.contact_name,
    contact_phone: profile.contact_phone,
  };

  const { messages } = intl;
  return (
    <Row>
      <Colxx sm="10" lg="10" md="10">
      <Card>
      <CardBody className="wizard wizard-default">
        <CardTitle className="mt-4 mb-4">
          <IntlMessages id="app.activate" />
        </CardTitle>
        <Wizard ref={wizardRef}>
          <TopNavigation
            className="justify-content-center"
            disableNav
            topNavClick
          />
          <Steps>
            <Step
              id="step1"
              name={messages['wizard.step-name-1']}
              desc={messages['wizard.step-desc-1']}
            >
              <div className="wizard-basic-step">
                <h3 className="text-center">1. Bekræft dine oplysninger</h3>

                <br/><br/>

                <div className="container">

                <h1 className="account-activation-title">Aktivering af din bruger</h1>
                <h4>For at du kan åbne op for opgavemarkedet, se opgaver og samtidig byde på dem, så skal du aktivere din bruger. Du skal samtidig vælge den plan du vil have hos os. Såfremt du blot vil teste platformen, kan du prøve den i <span className="bold-orange">7 dage for 0 kr.</span> Denne plan hedder <span className="bold-orange">"Starter"</span></h4>
                <br/>
                <hr/>

                <br/><br/>
                <Formik
                  initialValues={initialValues}
                  onSubmit={() => {}}
                  innerRef={(instance) => {
                    profileRef[0] = instance;
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.email" />
                        </Label>
                        <Field
                          className="form-control"
                          name="email"
                          validate={validateEmail}
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.company_name" />
                        </Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="company_name"
                          validate={validateNotEmpty}
                        />
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.address" />
                        </Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="legal_address"
                          validate={validateNotEmpty}
                        />
                        {errors.legal_address && touched.legal_address && (
                          <div className="invalid-feedback d-block">
                            {errors.legal_address}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.zip_code" />
                        </Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="legal_zip"
                          validate={validateNotEmpty}
                        />
                        {errors.legal_zip && touched.legal_zip && (
                          <div className="invalid-feedback d-block">
                            {errors.legal_zip}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.city" />
                        </Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="legal_city"
                          validate={validateNotEmpty}
                        />
                        {errors.legal_city && touched.legal_city && (
                          <div className="invalid-feedback d-block">
                            {errors.legal_city}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.country" />
                        </Label>
                        <Field
                          className={'form-control no-disable-marker'}
                          name="country"
                          disabled={true}
                          type="text"
                          value={profile.legal_country}
                        />
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.contact_name" />
                        </Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="contact_name"
                          validate={validateNotEmpty}
                        />
                        {errors.contact_name && touched.contact_name && (
                          <div className="invalid-feedback d-block">
                            {errors.contact_name}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.contact_phone" />
                        </Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="contact_phone"
                          validate={validateNotEmpty}
                        />
                        {errors.contact_phone && touched.contact_phone && (
                          <div className="invalid-feedback d-block">
                            {errors.contact_phone}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group  has-float-label">
                        <Label>
                          <IntlMessages id="user.cvr" />
                        </Label>
                        <Field
                          className="form-control no-disable-marker"
                          type="text"
                          name="cvr"
                          disabled={true}
                          value={profile.legal_vat}
                        />
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
                </div>
              </div>
            </Step>
            <Step
              id="step2"
              name={messages['wizard.step-name-2']}
              desc={messages['wizard.step-desc-2']}
            >
              <h3 className="text-center">2. Vælg plan</h3>
              <div className="wizard-basic-step">
                <br/><br/>
                
                <div className="container">
                <ShowPlanCards
                  setSelPlan={setSelPlan}
                  selPlan={selPlan}
                  plans={plans}
                />

                <div className="cart">
                  <h1><IntlMessages id="merchant.activate.cart"></IntlMessages></h1>
                  <br/><br/><br/>
                  
                  <h5 className="text-bold"><span className="cart-title-orange"><IntlMessages id="merchant.activate.plan_chosen"></IntlMessages></span> <span className="color-orange-cart">{ selPlan.title }</span></h5>
                  <br/><br/>

                  <h5 className="text-bold"><span className="cart-title-orange"><IntlMessages id="merchant.activate.price_pr_month"></IntlMessages></span> <span className="color-orange-cart">{ selPlan.price_mdr }{ selPlan.id !== 'Starter' ? ".- DKK" : "" } </span></h5>
                  <br/><hr/>

                  <h1 className="text-large-2">At betale nu: <span className="color-orange-cart">0.- DKK</span></h1>        
                  <h5 className="first_every_month">Opkrævning er den første i hver måned</h5>  
                </div>

                <br/><br/>
                </div>
              </div>
              
              
            </Step>
            <Step
              id="step3"
              name={messages['wizard.step-name-3']}
              desc={messages['wizard.step-desc-3']}
            >
              <h3 className="text-center">3. Vælg betalingsmetode</h3>
              <div className="wizard-basic-step">
                <Elements stripe={stripePromise}>
                  <PaymentMethodsEntry
                    setPaymentMethod={setPaymentMethod}
                    paymentMethod={paymentMethod}
                    paymentMethodRef={paymentMethodRef}
                    cardSubmit={cardSubmit}
                    setLoading={setLoading}
                    uploadPlan={uploadPlan}
                  />
                </Elements>
              </div>
            </Step>
            <Step id="step4" hideTopNav>
              <div className="wizard-basic-step text-center pt-3">
                {loading ? (
                  <div>
                    <Spinner color="primary" className="mb-1" />
                    <p>
                      <IntlMessages id="wizard.async" />
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="mb-2">
                      <IntlMessages id="wizard.content-thanks" />
                    </h2>
                    <p>
                      <IntlMessages id="wizard.registered" />
                    </p>
                  </div>
                )}
              </div>
            </Step>
          </Steps>
          <BottomNavigationLoading
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className={`justify-content-center ${
              bottomNavHidden && 'invisible'
            }`}
            prevLabel={messages['wizard.prev']}
            nextLabel={messages['wizard.next']}
            loading={loading}
          />
        </Wizard>
      </CardBody>
    </Card>
      </Colxx>
    </Row>
    
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user, loading, error } = reducers.authUser;
  const { locale } = reducers.settings;
  return { user, loading, error, locale };
};

export default injectIntl(connect(mapStateToProps, {})(Activate));
