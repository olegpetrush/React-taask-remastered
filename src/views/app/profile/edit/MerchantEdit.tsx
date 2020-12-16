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
const MerchantEdit = ({ locale, user }) => {
  const profile = user.user_object;
  const [loading, setLoading] = useState(false);


  if (!profile) return <Spinner />;

  const onUserRegister = (values, actions) => {
    setLoading(true);
    let body = { ...values, id: profile.id };
    Api.updateMerchantProfile(body, locale)
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        NotificationManager.warning("Handlingen mislykkedes. Prøv igen senere eller kontakt support.","Fejl",3000,null,null,'')
      });
  };

  const initialValues = {
    email: profile.email,
    company_name: profile.company_name,
    legal_address: profile.legal_address,
    legal_zip: profile.legal_zipcode,
    legal_city: profile.legal_city,
    contact_name: profile.contact_name,
    contact_phone: profile.contact_phone,
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

export default connect(mapStateToProps, {})(MerchantEdit);
