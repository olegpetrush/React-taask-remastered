import React, { Suspense, useState, useEffect, createRef } from 'react';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import Api from '../../../../helpers/Api';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import { CardBody, Card, Button } from 'reactstrap';
import { StepTask } from '../../../user/register/customer/StepTask';
import { Industry } from '../../../../interfaces/Industry';
import { NotificationManager } from '../../../../components/common/react-notifications';
const CreateTask = ({ match, location, locale, user }: any) => {
  const formRef = [createRef<any>()];
  const [industries, setIndustries] = useState<Industry[]>([
    { id: -1, name: 'Loading...' },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Api.fetchIndustries(locale)
      .then((industries: Industry[]) =>
        setIndustries([
          {
            id: -1,
            name: 'Vælg branche',
          },
          ...industries,
        ])
      )
      .catch(() => {
        setIndustries([
          {
            id: -1,
            name: 'Kunne ikke hente lande.. Prøv at refreshe siden.',
          },
        ]);
      });
  }, [locale]);

  const submit = () => {
    const form = formRef[0] as any;
    form.submitForm().then(() => {
      if (
        Object.keys(form.errors).length === 0 &&
        Object.keys(form.touched).length === Object.keys(form.values).length
      ) {
        setLoading(true);
        Api.createTask(
          { ...form.values, user_id: user.user_object.id, budget: 0 },
          locale
        )
          .then(() => {
            setLoading(false);
            NotificationManager.success(
              '',
              'Opgave oprettet',
              3000,
              null,
              null,
              ''
            );
          })
          .catch((error) => {
            setLoading(false);
            NotificationManager.warning(
              error.message,
              'Fejl',
              3000,
              null,
              null,
              ''
            );
          });
      } else form.validateForm();
    });
  };

  return (
    <Suspense fallback={<div className="loading" />}>
      <Colxx xxs="12">
        <h3 className="mb-4">Vis opgave</h3>
        <Card>
          <CardBody>
            <StepTask industries={industries} formRef={formRef} />
            <Button
              type="button"
              onClick={submit}
              color="primary"
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              } `}
              size="lg"
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Opret opgave</span>
            </Button>
          </CardBody>
        </Card>
      </Colxx>
    </Suspense>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  const { user } = reducers.authUser;
  return { locale, user };
};

export default connect(mapStateToProps, {})(CreateTask);
