import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CustomerRegister = React.lazy(() =>
  import(/* webpackChunkName: "myplan" */ './customer')
);
const MerchantRegister = React.lazy(() =>
  import(/* webpackChunkName: "payments" */ './merchant')
);
const SelectRegister = React.lazy(() =>
  import(/* webpackChunkName: "payments" */ './selectRegister')
);


const Register = ({match,history,loading,locale,registerUserAction,clearErrorAction,error}) => {
  return(
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      
      <Route
        path={`${match.url}/merchant`}
        render={(props) => <MerchantRegister {...props} />}
      />
      <Route
        path={`${match.url}/customer`}
        render={(props) => <CustomerRegister {...props} />}
      />
      <Route
        path={`${match.url}/`}
        render={(props) => <SelectRegister {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);};
export default Register;
