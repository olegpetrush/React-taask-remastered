import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications';

import { loginUser,clearError } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import '../../assets/css/sass/custom/login.scss';

const Login = ({ history, loading, error, loginUserAction,clearErrorAction }) => {
  const [email] = useState('lau@taask.net');
  const [password] = useState('1234Abc!');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
      clearErrorAction();
    }
  }, [error,clearErrorAction]);

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        loginUserAction(values, history);
      }
    }
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card border-black">
          <div className="position-relative image-side ">
            <p className="h3">Velkommen til Taask's app</p>
            <br/>
            <p className="mb-0">
              Her kan du logge på appen for at se dine aktuelle opgaver, uploade nye opgaver, søge efter en professionel eller som partner, kan søge på opgavemarkedspladsen blandt hundredevis af opgaver.
            </p>
            <br/>
            <p className="mb-0">
              Har du ikke et login, så kan du ganske gratis få et tilddelt. Du kan også gå tilbage til vores forside og læse mere om hvem vi er og hvad vi kan gøre for dig.
            </p>
            <br/>
            <p className="mb-0">
              Vi ønsker dig en god dag, Team Taask.net
            </p>
            <br/>
            <Button color="primary" onClick={() => {history.push("/user/register")}}>Registrer din bruger</Button>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
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
                        <IntlMessages id="user.login-button" />
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
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser, clearErrorAction:clearError
})(Login);
