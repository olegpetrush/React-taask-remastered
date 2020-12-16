import React from 'react';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
interface Props {
  locale;
  user;
}

const CurrentPlan = (props: Props) => {
    let plan = props.user.user_object?.plan?.plan;
    if(!plan) { return <Spinner/>}
  return(<h1>{plan.name}</h1>);
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user } = reducers.authUser;
  const { locale } = reducers.settings;
  return { user, locale };
};

export default connect(mapStateToProps, {})(CurrentPlan);
