import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const AdminIndustries = ({ match, history, locale }) => {
  return (
    <h1>Brancher</h1>
  );
};
const mapStateToProps = (reducers) => {
  const { containerClassnames } = reducers.menu;
  const { user } = reducers.authUser;
  const { locale } = reducers.settings;
  return { containerClassnames, user, locale };
};

export default withRouter(connect(mapStateToProps, {})(AdminIndustries));
