import React from 'react';
import { Row } from 'reactstrap';

import { injectIntl } from 'react-intl';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import PriceSelectCard from '../../../../components/cards/PriceSelectCard';
const ShowPlanCards = ({ locale, user, intl, setSelPlan, selPlan, plans }) => {
  const change = (index:number) => {
      setSelPlan(plans[locale][index]);
  }
  return (
      
    <form>
    <Row className="equal-height-container mb-5">
          {plans[locale].map((item, index) => {
            return (
              <Colxx
                md="12"
                lg="4"
                className="col-item mb-4"
                key={`priceCard_${index}`}
              >
                <PriceSelectCard data={item} selKey={item.id} selected={item.id === selPlan.id} onSelect={() => change(index)} />
              </Colxx>
            );
          })}
    </Row>
    
    </form>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user, loading, error } = reducers.authUser;
  const { locale } = reducers.settings;
  return { user, loading, error, locale };
};

export default injectIntl(connect(mapStateToProps, {})(ShowPlanCards));
