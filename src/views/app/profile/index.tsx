import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Edit = React.lazy(() => import(/* webpackChunkName: "edit" */ './edit'));
const Notifications = React.lazy(() =>
  import(/* webpackChunkName: "notifications" */ './notifications')
);
const MyPlan = React.lazy(() =>
  import(/* webpackChunkName: "myplan" */ './plan')
);
const Payments = React.lazy(() =>
  import(/* webpackChunkName: "payments" */ './payments')
);
const Activate = React.lazy(() =>
  import(/* webpackChunkName: "activate" */ './activate')
);
interface props {
  match: any;
}

const Profile = (props: props) => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect
          exact
          from={`${props.match.url}/`}
          to={`${props.match.url}/edit`}
        />
        <Route
          path={`${props.match.url}/edit`}
          render={(props) => <Edit {...props} />}
        />
        <Route
          path={`${props.match.url}/notifications`}
          render={(props) => <Notifications {...props} />}
        />
        <Route
          path={`${props.match.url}/plan`}
          render={(props) => <MyPlan {...props} />}
        />
        <Route
          path={`${props.match.url}/activate`}
          render={(props) => <Activate {...props} />}
        />
        <Route
          path={`${props.match.url}/payments`}
          render={(props) => <Payments {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Profile;
