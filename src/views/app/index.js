import React, { Suspense, useEffect } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import { updateProfile } from '../../redux/actions';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './dashboard')
);
const Market = React.lazy(() =>
  import(/* webpackChunkName: "viwes-market" */ './market')
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "profile" */ './profile')
);

const Admin = React.lazy(() =>
  import(/* webpackChunkName: "admin" */ './admin')
);

const App = ({ match, history, user, locale, updateProfileAction }) => {
  useEffect(() => {
    if (!user.user_object) {
      updateProfileAction(user, locale);
    }
  }, [user,locale,updateProfileAction]);

  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboard`}
            />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/market`}
              render={(props) => <Market {...props} />}
            />
            <Route
              path={`${match.url}/profile`}
              render={(props) => <Profile {...props} />}
            />
            <Route
              path={`${match.url}/admin`}
              render={(props) => <Admin {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = (reducers) => {
  const { containerClassnames } = reducers.menu;
  const { user } = reducers.authUser;
  const { locale } = reducers.settings;
  return { containerClassnames, user, locale };
};

export default withRouter(
  connect(mapStateToProps, { updateProfileAction: updateProfile })(App)
);
