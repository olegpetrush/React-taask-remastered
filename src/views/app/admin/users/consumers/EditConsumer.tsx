import React, { Suspense, useMemo } from 'react';
import { Row, Col, Badge, Button, Form, FormGroup, Label } from 'reactstrap';

import { useTable, usePagination, useSortBy } from 'react-table';

import DatatablePagination from '../../../../../components/DatatablePagination';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Consumer } from '../../../../../interfaces/Consumer';
import IntlMessages from '../../../../../helpers/IntlMessages';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { DefaultReducers } from '../../../../../redux/exportReducers';
import { updateProfile } from '../../../../../redux/actions';
import { Formik, Field } from 'formik';
import {
  validateEmail,
  validateNotEmpty,
} from '../../../../../helpers/Validators';

interface props {
  consumer: Consumer;
  locale: string;
  history: any;
}

const EditConsumer = (props: props) => {
  const saveEdit = () => {};

  return (
    <Suspense fallback={<div className="loading" />}>
      <Row className="mt-4">
        <Colxx xxs="12" className="ml-3">
          <h3>Rediger consumer</h3>
        </Colxx>
        <Col lg={12}>
          <Formik initialValues={props.consumer} onSubmit={saveEdit}>
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
                    name="legal_zip"
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
                    name="legal_city"
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
                    <IntlMessages id="user.contact_name" />
                  </Label>
                  <Field
                    className="form-control"
                    type="text"
                    name="contact_name"
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
                    name="contact_phone"
                    validate={validateNotEmpty}
                  />
                  {errors.full_name && touched.full_name && (
                    <div className="invalid-feedback d-block">
                      {errors.full_name}
                    </div>
                  )}
                </FormGroup>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Suspense>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  return { locale };
};

export default connect(mapStateToProps, { updateProfileAction: updateProfile })(
  EditConsumer
);
