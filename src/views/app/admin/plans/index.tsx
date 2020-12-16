import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const AdminPlans = ({ match, history, locale }) => {
  return (
    <h1>Planer</h1>
  );
};
const mapStateToProps = (reducers) => {
  const { containerClassnames } = reducers.menu;
  const { user } = reducers.authUser;
  const { locale } = reducers.settings;
  return { containerClassnames, user, locale };
};

export default withRouter(connect(mapStateToProps, {})(AdminPlans));
