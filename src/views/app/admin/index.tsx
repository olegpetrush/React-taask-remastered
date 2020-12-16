import React from 'react';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminMarket from './market';
import AdminUsers from './users';
import AdminPlans from './plans';
import AdminTranslations from './translations';
import AdminIndustries from './industries';

const Admin = ({ match, history, locale }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/market`}
        render={(props) => <AdminMarket {...props} />}
      />
      <Route
        path={`${match.url}/users`}
        render={(props) => <AdminUsers {...props} />}
      />
      <Route
        path={`${match.url}/plans`}
        render={(props) => <AdminPlans {...props} />}
      />
      <Route
        path={`${match.url}/translations`}
        render={(props) => <AdminTranslations {...props} />}
      />
      <Route
        path={`${match.url}/industries`}
        render={(props) => <AdminIndustries {...props} />}
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

export default withRouter(connect(mapStateToProps, {})(Admin));
