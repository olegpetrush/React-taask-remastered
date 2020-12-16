import React, { useState, useEffect } from 'react';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import plans from '../activate/plans';
import ShowPlanCardsButtons from './ShowPlanCardsButtons';
import Api from '../../../../helpers/Api';
import { NotificationManager } from '../../../../components/common/react-notifications';
interface Props {
  locale;
  user;
  history;
}

const UpgradePlan = (props: Props) => {
  const [selPlan, setSelPlan] = useState(plans[props.locale][0]);

  useEffect(() => {
    setSelPlan(props.user.user_object.plan.plan.id);
  }, [props.user]);

  const changePlanAction = async (plan): Promise<void> => {
    try {
      await Api.updateMerchantPlan(
        { plan_name: plan.id },
        props.locale
      );
      props.history.push("");
    } catch (err) {
      NotificationManager.warning("Kunne ikke opgradere din plan. Prøv igen senere eller kontakt support.","Fejl",3000,null,null,"")
    }
  };

  return (
    <>
      <ShowPlanCardsButtons
        plans={plans}
        selPlan={selPlan}
        changePlanAction={changePlanAction}
      />
    </>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user } = reducers.authUser;
  const { locale } = reducers.settings;
  const { history } = reducers.menu;
  return { user, locale,history };
};

export default connect(mapStateToProps, {})(UpgradePlan);
