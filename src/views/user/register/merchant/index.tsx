import React, { useState } from 'react';
import { Row, Card, CardTitle, FormGroup, Label, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearError } from '../../../../redux/actions';

import IntlMessages from '../../../../helpers/IntlMessages';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { Formik, Form, Field } from 'formik';
import { useEffect } from 'react';
import { Country } from '../../../../interfaces/Country';
import Api from '../../../../helpers/Api';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import { validateEmail, validatePassword, validateRepeatPassword, validateNotEmpty } from '../../../../helpers/Validators';

const MerchantRegister = ({
  history,
  loading,
  locale,
  registerUserAction,
  clearErrorAction,
  error,
}) => {
  const [email] = useState('simon@taask.net');
  const [password] = useState('1234Abc!');
  const [repeatpassword] = useState('1234Abc!');
  const [company_name] = useState('SimonSwag');
  const [address] = useState('Simons Addresse 122');
  const [zip_code] = useState('9220');
  const [city] = useState('Aalborg Øst');
  const [country,setCountry] = useState<string>('');
  const [contact_name] = useState('Simon Tornberg');
  const [contact_phone] = useState('12345678');
  const [cvr] = useState('12345');

  const [countries, setCountries] = useState<Country[]>([
    { id: 0, country_code: '0', name: 'Loading...' },
  ]);

  useEffect(() => {
    // load countries
    Api.fetchCountries(locale)
      .then((countries: Country[]) => {
        setCountries([{ id: 0, country_code: '', name: 'Vælg et land' },...countries]);
        setCountry(countries[0].country_code);
      })
      .catch(() => {
        setCountries([
          {
            id: 0,
            country_code: '',
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

  const onUserRegister = (values, actions) => {
    registerUserAction(
      {
        role: 'MERCHANT',
        company_name: values.company_name,
        contact_phone: values.contact_phone,
        email: values.email,
        contact_name: values.contact_name,
        legal_address: values.address,
        legal_city: values.city,
        legal_country: values.country,
        legal_vat: values.cvr,
        legal_zip: values.zip_code,
        password: values.password,
      },
      history
    );
  };

  const initialValues = {
    email,
    password,
    repeatpassword,
    company_name,
    address,
    zip_code,
    city,
    country,
    contact_name,
    contact_phone,
    cvr,
  };

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
            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
              {({ errors, touched, values }) => (
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
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.repeatpassword" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="repeatpassword"
                      validate={(value: string) =>
                        validateRepeatPassword(value, values.password)
                      }
                    />
                    {errors.repeatpassword && touched.repeatpassword && (
                      <div className="invalid-feedback d-block">
                        {errors.repeatpassword}
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
                    {errors.company_name && touched.company_name && (
                      <div className="invalid-feedback d-block">
                        {errors.company_name}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.address" />
                    </Label>
                    <Field
                      className="form-control"
                      type="text"
                      name="address"
                      validate={validateNotEmpty}
                    />
                    {errors.address && touched.address && (
                      <div className="invalid-feedback d-block">
                        {errors.address}
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
                      name="zip_code"
                      validate={validateNotEmpty}
                    />
                    {errors.zip_code && touched.zip_code && (
                      <div className="invalid-feedback d-block">
                        {errors.zip_code}
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
                      name="city"
                      validate={validateNotEmpty}
                    />
                    {errors.city && touched.city && (
                      <div className="invalid-feedback d-block">
                        {errors.city}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.country" />
                    </Label>
                    <Field
                      className={'form-control'}
                      as="select"
                      name="country"
                      validate={validateNotEmpty}
                    >
                      {countries.map((x, y) => (
                        <option key={x.country_code} value={x.country_code} disabled={!x.country_code}>{x.name}</option>
                      ))}
                    </Field>
                    {errors.country && touched.country && (
                      <div className="invalid-feedback d-block">
                        {errors.country}
                      </div>
                    )}
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
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.cvr" />
                    </Label>
                    <Field
                      className="form-control"
                      type="text"
                      name="cvr"
                      validate={validateNotEmpty}
                    />
                    {errors.cvr && touched.cvr && (
                      <div className="invalid-feedback d-block">
                        {errors.cvr}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                    type="submit"
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.register-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
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

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
  clearErrorAction: clearError,
})(MerchantRegister);
