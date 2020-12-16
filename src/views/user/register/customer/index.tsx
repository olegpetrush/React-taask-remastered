import React, { useState, createRef } from 'react';
import { Row, Card, CardTitle, Spinner } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearError } from '../../../../redux/actions';

import IntlMessages from '../../../../helpers/IntlMessages';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { useEffect } from 'react';
import { Country } from '../../../../interfaces/Country';
import Api from '../../../../helpers/Api';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import TopNavigation from '../../../../components/wizard/TopNavigation';
import Wizard from 'react-albus/lib/components/Wizard';
import Steps from 'react-albus/lib/components/Steps';
import { Step } from 'react-albus/lib';
import { Industry } from '../../../../interfaces/Industry';
import { injectIntl } from 'react-intl';
import { StepTask } from './StepTask';
import { StepConsumer } from './StepConsumer';
import BottomNavigationLoading from '../../../../components/wizard/BottomNavigationLoading';

const CustomerRegister = ({ locale, clearErrorAction, error, intl }) => {
  const formRefs = [createRef<any>(), createRef<any>()];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({budget: 0});

  const [countries, setCountries] = useState<Country[]>([
    { id: -1, country_code: '', name: 'Loading...' },
  ]);
  const [industries, setIndustries] = useState<Industry[]>([
    { id: -1, name: 'Loading...' },
  ]);

  useEffect(() => {
    // load countries
    Api.fetchCountries(locale)
      .then((countries: Country[]) =>
        setCountries([
          {
            id: -1,
            country_code: '',
            name: 'Vælg land',
          },
          ...countries,
        ])
      )
      .catch(() => {
        setCountries([
          {
            id: -1,
            country_code: '',
            name: 'Kunne ikke hente lande.. Prøv at refreshe siden.',
          },
        ]);
      });
    Api.fetchIndustries(locale)
      .then((industries: Industry[]) =>
        setIndustries([
          {
            id: -1,
            name: 'Vælg branche',
          },
          ...industries,
        ])
      )
      .catch(() => {
        setIndustries([
          {
            id: -1,
            name: 'Kunne ikke hente lande.. Prøv at refreshe siden.',
          },
        ]);
      });
  }, [locale]);

  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Registration Error',
        3000,
        null,
        null,
        ''
      );
      clearErrorAction();
    }
  }, [error, clearErrorAction]);

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }

    const formIndex = steps.indexOf(step);
    if (formIndex === 0 || formIndex === 1) {
      const form = formRefs[formIndex] as any;
      form.submitForm().then(() => {
        if (
          Object.keys(form.errors).length === 0 &&
          Object.keys(form.touched).length === Object.keys(form.values).length
        ) {
          
          let finalFields = { ...fields, ...form.values };
          setFields(finalFields); // needed because setFields can be async.
          if (formIndex === 0) goToNext();
          else {
            setLoading(true);
            Api.createConsumer(finalFields, locale)
              .then(() => {
                setLoading(false);
                setBottomNavHidden(true);
                goToNext();
              })
              .catch((error: Error) => {
                setLoading(false);
                // hvis fejlen er at mailen allerede er optaget //todo
                if (
                  error.message.search(
                    'A user with this email already exists'
                  ) !== -1
                )
                  NotificationManager.warning(
                    'Der findes allerede en bruger med denne email i systemet.',
                    'Fejl',
                    3000,
                    null,
                    null,
                    ''
                  );
                else
                  NotificationManager.warning(
                    'Kunne ikke oprette bruger: ' + error.message,
                    'Fejl',
                    3000,
                    null,
                    null,
                    ''
                  );
              });
          }
        } else form.validateForm();
      });
    }
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };
  const messages = intl;

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <div className="wizard wizard-default card-body">
              <Wizard>
                <TopNavigation
                  className="justify-content-center"
                  disableNav
                  topNavClick={false}
                />
                <Steps>
                  <Step
                    id="step1"
                    name={messages['wizard.step-name-1']}
                    desc={messages['wizard.step-desc-1']}
                  >
                    <StepTask formRef={formRefs} industries={industries} />
                  </Step>
                  <Step
                    id="step2"
                    name={messages['wizard.step-name-2']}
                    desc={messages['wizard.step-desc-2']}
                  >
                    <StepConsumer formRef={formRefs} countries={countries} />
                  </Step>
                  <Step id="step4" hideTopNav>
                    <div className="wizard-basic-step text-center pt-3">
                      {loading ? (
                        <div>
                          <Spinner color="primary" className="mb-1" />
                          <p>Vent venligst...</p>
                        </div>
                      ) : (
                        <div>
                          <h2 className="mb-2">Tak!</h2>
                          <p>Din opgave er registreret.</p>
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
                  prevLabel={'Forrige'}
                  nextLabel={'Næste'}
                  loading={loading}
                />
              </Wizard>
            </div>
          </div>
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

export default injectIntl(
  connect(mapStateToProps, {
    registerUserAction: registerUser,
    clearErrorAction: clearError,
  })(CustomerRegister)
);
