import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FormGroup, Label } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  validateNotEmpty,
  validateNotMinusOne,
  validateEmail,
  validatePassword,
  validateRepeatPassword,
} from '../../../../helpers/Validators';

export const StepConsumer = ({ formRef, countries }) => {
  return (
    <div className="wizard-basic-step">
      <Formik
        innerRef={(instance) => {
          formRef[1] = instance;
        }}
        initialValues={{
          email: '',
          password: '',
          repeatpassword: '',
          address: '',
          zip: '',
          city: '',
          country: '-1',
          full_name: '',
          phone: '',
        }}
        onSubmit={() => {}}
      >
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
                <div className="invalid-feedback d-block">{errors.email}</div>
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
                <IntlMessages id="user.address" />
              </Label>
              <Field
                className="form-control"
                type="text"
                name="address"
                validate={validateNotEmpty}
              />
              {errors.address && touched.address && (
                <div className="invalid-feedback d-block">{errors.address}</div>
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
                <div className="invalid-feedback d-block">{errors.city}</div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="user.country" />
              </Label>
              <Field
                className="form-control"
                as="select"
                type="text"
                name="country"
                validate={validateNotMinusOne}
              >
                {countries.map((x, y) => {
                  return (
                    <option key={x.id} value={x.country_code} disabled={x.id === -1}>
                      {x.name}
                    </option>
                  );
                })}
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
                name="full_name"
                validate={validateNotEmpty}
              />
              {errors.full_name && touched.full_name && (
                <div className="invalid-feedback d-block">{errors.full_name}</div>
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
                <div className="invalid-feedback d-block">{errors.phone}</div>
              )}
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};
