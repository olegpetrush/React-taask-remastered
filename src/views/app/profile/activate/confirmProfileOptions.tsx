import React, { useState, createRef, forwardRef } from 'react';
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
import { Wizard, Steps, Step } from 'react-albus';
import { Formik, Field } from 'formik';

import { injectIntl } from 'react-intl';
import {
  validateEmail,
  validateNotEmpty,
  validatePassword,
} from '../../../../helpers/Validators';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import Api from '../../../../helpers/Api';
import { NotificationManager } from '../../../../components/common/react-notifications';
import TopNavigation from '../../../../components/wizard/TopNavigation';
import BottomNavigation from '../../../../components/wizard/BottomNavigation';

interface Props{
    locale;
    user;
    intl;
}

const ConfirmProfileOptions = forwardRef((props:Props,ref) => {
  const profile = props.user.user_object;
  const [loading, setLoading] = useState(false);

  const profileRef = [createRef<any>()];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
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

  if (!profile) return <Spinner />;

  const onUserRegister = (values, actions) => {
    setLoading(true);
    let body = { ...values, id: profile.id };
    Api.updateMerchantProfile(body,  props.locale)
      .then(() => setLoading(false))
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

  const asyncLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  

  const { messages } =  props.intl;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onUserRegister}
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
              <div className="invalid-feedback d-block">{errors.legal_zip}</div>
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
  );
});

export default ConfirmProfileOptions;
