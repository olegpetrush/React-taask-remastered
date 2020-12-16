import React, { useState } from 'react';
import {
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Button,
  Spinner,
  CardBody,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Formik, Field } from 'formik';
import {
  validateEmail,
  validateNotEmpty,
} from '../../../../helpers/Validators';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import Api from '../../../../helpers/Api';
import { NotificationManager } from '../../../../components/common/react-notifications';
const ConsumerEdit = ({ locale, user }) => {
  const profile = user.user_object;
  const [loading, setLoading] = useState(false);

  if (!profile) return <Spinner />;

  const onUserRegister = (values, actions) => {
    setLoading(true);
    let body = { ...values, id: profile.id };
    Api.updateConsumerProfile(body, locale)
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        NotificationManager.warning("Handlingen mislykkedes. Prøv igen senere eller kontakt support.","Fejl",3000,null,null,'')
      });
  };

  const initialValues = {
    email: profile.email,
    address: profile.address,
    zip: profile.zip,
    city: profile.city,
    full_name: profile.full_name,
    phone: profile.phone,
  };
  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">
          <IntlMessages id="app.edit_profile" />
        </CardTitle>
        <Formik initialValues={initialValues} onSubmit={onUserRegister}>
          {({ errors, touched, values, handleSubmit }) => (
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
                  <div className="invalid-feedback d-block">{errors.email}</div>
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
                  name="zip"
                  validate={validateNotEmpty}
                />
                {errors.zip && touched.zip && (
                  <div className="invalid-feedback d-block">
                    {errors.zip}
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
                  className={'form-control no-disable-marker'}
                  name="country"
                  disabled={true}
                  type="text"
                  value={profile.country.country.name}
                />
              </FormGroup>
              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages id="user.contact_name" />
                </Label>
                <Field
                  className="form-control"
                  type="text"
                  name="full_name"
                  validate={validateNotEmpty}
                />
                {errors.full_name && touched.full_name && (
                  <div className="invalid-feedback d-block">
                    {errors.full_name}
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
                  name="phone"
                  validate={validateNotEmpty}
                />
                {errors.phone && touched.phone && (
                  <div className="invalid-feedback d-block">
                    {errors.phone}
                  </div>
                )}
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  color="primary"
                  className={`btn-shadow btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  } `}
                  size="lg"
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="user.save" />
                  </span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user, loading, error } = reducers.authUser;
  const { locale } = reducers.settings;
  return { user, loading, error, locale };
};

export default connect(mapStateToProps, {})(ConsumerEdit);
