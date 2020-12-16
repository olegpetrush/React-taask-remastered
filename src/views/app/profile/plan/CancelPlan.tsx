import React from 'react';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
interface Props {
  locale;
  user;
}

const CancelPlan = (props: Props) => {
  return (
    <>
      <p>
        Såfremt du sender din opsigelse på din plan, så skal du fremsende din
        opsigelse via mail til: support@taask.net og du vil modtage en
        bekræftelse på din opsigelse.
      </p>
      <p>
        Bemærk at der "kun" er dag-til-dag opsigelser såfremt du har en
        "STARTER" plan og ved dag-til-dag opsigelser er det kun gældende i de
        syv første dage med både datoen du opretter samt opsiger inklusive. Der
        tages ikke højde for weekender og helligdage. (Læs mere her).
      </p>
      <p>
        Vi stræber efter at sende dig en bekræftelse indenfor 2 arbejdsdage.
        Såfremt du ikke opsiger rettidigt jf. ovenstående, så henviser vi til de
        almindelige handelsbetingelser som altid er gældende.
      </p>
      <p>
        Har du en betalende plan (Lite, Guld mv. læs mere her om de forskellige
        planer) så er der løbende + 3 måneders opsigelsesfrist fra vi modtager
        din opsigelse - denne frist er udover din bindingsperiode, men kan
        rettidigt opsiges til udgangen af din eventuelle bindingsperiode, hvis
        ikke tillægges de løbende + tre måneders opsigelsesfrist.
      </p>
      <p>Mvh.</p>
      <p>Team Taask</p>
    </>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user } = reducers.authUser;
  const { locale } = reducers.settings;
  return { user, locale };
};

export default connect(mapStateToProps, {})(CancelPlan);
