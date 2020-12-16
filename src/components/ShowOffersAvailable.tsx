import React from 'react';
import { connect } from 'react-redux';
import { DefaultReducers } from '../redux/exportReducers';
import Icon from './Icon';
import { Badge } from 'reactstrap';
const ShowOffersAvailable = ({ user, loading, error, locale }: any) => {


  return (
    <>
      <Badge className="mr-2 offersAvailable" color="dark">
        <Icon icon="simple-icon-lock-open" className="mr-2" />
        <span className="HideWhenSmol">Bud tilgængelige: </span>
        {user.user_object?.offers_avalible}
      </Badge>
      <Badge color="primary" className="offersAvailable">
        <Icon icon="simple-icon-star" className="mr-2" />
        <span className="HideWhenSmol"> Superbud tilgængelige: </span>
        {user.user_object?.super_offers_avalible}
      </Badge>
    </>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  const { user, loading, error } = reducers.authUser;
  return { locale, user, loading, error };
};

export default connect(mapStateToProps, {})(ShowOffersAvailable);
