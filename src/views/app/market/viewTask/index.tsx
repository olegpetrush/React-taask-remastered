import React, { Suspense, useState, useEffect } from 'react';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import Api from '../../../../helpers/Api';
import { Task } from '../../../../interfaces/Task';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import {
  CardBody,
  Card,
  Col,
  Row,
  Media,
  Badge,
  Button,
  CardTitle,
} from 'reactstrap';
import Icon from '../../../../components/Icon';
import IntlMessages from '../../../../helpers/IntlMessages';
import { NotificationManager } from '../../../../components/common/react-notifications';
const ViewTask = ({ match, location, locale, user }: any) => {
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState(false);
  const [toRefresh, setToRefresh] = useState(0);
  const id = match.params.taskId;

  const toggleActive = () => {
    if (!task) return;
    setLoading(true);
    Api.toggleTask(task, locale)
      .then(() => {
        setLoading(false);
        setToRefresh(toRefresh + 1);
      })
      .catch((error) =>
        NotificationManager.warning(
          'Fejl: ' + error,
          'Fejl',
          3000,
          null,
          null,
          ''
        )
      );
  };

  useEffect(() => {
    Api.fetchTask(id, locale)
      .then((task) => {
        setTask(task);
      })
      .catch((error) => {});
  }, [locale, id, toRefresh]);

  if (!task) return <></>;

  return (
    <Suspense fallback={<div className="loading" />}>
      <Colxx xxs="12">
        <h3 className="mb-4">Vis opgave</h3>
        <Card>
          <CardBody>
            <Row>
              <Col sm={6}>
                <Media>
                  <Media left>
                    <Media
                      object
                      src="/assets/img/profile-picture.svg"
                      className="medium-picture"
                      alt="Profil billede"
                    />
                  </Media>
                  <Media body>
                    <Media heading>{task?.consumer.full_name}</Media>
                    <p>
                      {!task?.active ? (
                        <Badge color="dark">
                          <IntlMessages id="badge.inactive" />
                        </Badge>
                      ) : (
                        <Badge color="success">
                          <IntlMessages id="badge.active" />
                        </Badge>
                      )}
                    </p>
                    <p>
                      <Icon icon="iconsminds-location-2" />{' '}
                      {task.consumer.address}, {task.consumer.zip}{' '}
                      {task.consumer.city}
                    </p>
                    <p>
                      <Icon icon="iconsminds-envelope" /> {task.consumer.email}
                    </p>
                    <p>
                      <Icon icon="iconsminds-old-telephone" />{' '}
                      {task.consumer.phone}
                    </p>
                  </Media>
                </Media>
              </Col>
              <Col sm={6}>
                <h3>Opgave-beskrivelse</h3>
                <p>{task.description}</p>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="mt-3">
          <CardBody>
            <Row className="text-center">
              <Col sm={3}>
                <h1>
                  <Icon icon="iconsminds-coins" />
                </h1>
                <p>Budget: {task.budget}</p>
              </Col>
              <Col sm={3}>
                <h1>
                  <Icon icon="iconsminds-stopwatch" />
                </h1>
                <p>Haste-niveau: {task.urgency}</p>
              </Col>
              <Col sm={3}>
                <h1>
                  <Icon icon="iconsminds-globe-2" />
                </h1>
                <p>Land: {task.consumer.country.name}</p>
              </Col>
              <Col sm={3}>
                <h1>
                  <Icon icon="iconsminds-clock-back" />
                </h1>
                <p>Oprettet: {new Date(task.date_time).toLocaleString()}</p>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {user.role === 'Administrator' ? (
          <Card className="mt-3">
            <CardBody>
              <CardTitle>Admin-aktioner</CardTitle>
              <Row className="text-center">
                <Col sm={3}>
                  <Button
                    type="button"
                    onClick={toggleActive}
                    color="primary"
                    className={`w-100 mt-4 btn-shadow btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    } `}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">Toggle aktiv</span>
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ) : (
          ''
        )}
      </Colxx>
    </Suspense>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  const { user } = reducers.authUser;
  return { locale, user };
};

export default connect(mapStateToProps, {})(ViewTask);
