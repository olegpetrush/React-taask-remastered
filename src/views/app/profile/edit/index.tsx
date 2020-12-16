import React from 'react';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import { getCookie } from '../../../../helpers/Cookies';
import MerchantEdit from './MerchantEdit';
import ConsumerEdit from './ConsumerEdit';
const Edit = ({ locale, user }) => {
  return (
    <>
      {getCookie('user_role') === 'Merchant' ? (
        <MerchantEdit />
      ) : (
        <ConsumerEdit />
      )}
    </>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user, loading, error } = reducers.authUser;
  const { locale } = reducers.settings;
  return { user, loading, error, locale };
};

export default connect(mapStateToProps, {})(Edit);
