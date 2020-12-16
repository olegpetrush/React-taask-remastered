import React from 'react';
import { Row } from 'reactstrap';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import PriceButtonCard from '../../../../components/cards/PriceButtonCard';
const ShowPlanCardsButtons = ({ locale, changePlanAction, selPlan, plans }) => {
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
                <PriceButtonCard disabled={item.num_id <= selPlan} data={item} onClick={async ():Promise<void> => await changePlanAction(item)} />
              </Colxx>
            );
          })}
    </Row>
    
    </form>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user, error } = reducers.authUser;
  const { locale } = reducers.settings;
  return { user, error, locale };
};

export default connect(mapStateToProps, {})(ShowPlanCardsButtons);
