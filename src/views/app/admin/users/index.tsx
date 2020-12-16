import React from 'react';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Consumers from './consumers'
import Merchants from './merchants'

const AdminUsers = ({ match, history, locale }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/consumers`}
        render={(props) => <Consumers {...props} />}
      />
      <Route
        path={`${match.url}/merchants`}
        render={(props) => <Merchants {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  );
};
const mapStateToProps = (reducers) => {
  const { containerClassnames } = reducers.menu;
  const { user } = reducers.authUser;
  const { locale } = reducers.settings;
  return { containerClassnames, user, locale };
};

export default withRouter(connect(mapStateToProps, {})(AdminUsers));
