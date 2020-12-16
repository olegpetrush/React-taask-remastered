import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Search = React.lazy(() =>
  import(/* webpackChunkName: "notifications" */ './search')
);
const MyJobs = React.lazy(() =>
  import(/* webpackChunkName: "myplan" */ './myjobs')
);

const Task = React.lazy(() =>
  import(/* webpackChunkName: "task" */ './viewTask')
);
const CreateTask = React.lazy(() =>
  import(/* webpackChunkName: "createTask" */ './createTask')
);
interface props{
    match: any;
}

const Market = (props: props) => {
  return(
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${props.match.url}/`} to={`${props.match.url}/search`} />
      <Route
        path={`${props.match.url}/search`}
        render={(props) => <Search {...props} />}
      />
      <Route
        path={`${props.match.url}/myjobs`}
        render={(props) => <MyJobs {...props} />}
      />
      <Route
        path={`${props.match.url}/task/:taskId`}
        render={(props) => <Task {...props} />}
      />
      <Route
        path={`${props.match.url}/newtask`}
        render={(props) => <CreateTask {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);};
export default Market;
