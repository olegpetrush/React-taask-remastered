import React from 'react';
import {
  Row,
  Card,
  CardTitle
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearError } from '../../../../redux/actions';

import IntlMessages from '../../../../helpers/IntlMessages';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { DefaultReducers } from '../../../../redux/exportReducers';
import IconCard from '../../../../components/cards/IconCard';

interface Props{
  history: any[];
  loading: boolean;
  locale: string;
  registerUserAction: any;
  error: any;
}

const RegisterSelect = () => {


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
              <NavLink to='/user/register/customer'>
                <IconCard icon="iconsminds-file" title="Privat" value="Jeg har en opgave, der skal løses."/>
              </NavLink>
              <NavLink to='/user/register/merchant'>
                <IconCard icon="iconsminds-box-with-folders" title="Håndværker" value="Jeg er håndværker."/>
              </NavLink>
            </CardTitle>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = (reducers:DefaultReducers) => {
  const { user, loading, error } = reducers.authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser, clearErrorAction: clearError
})(RegisterSelect);
