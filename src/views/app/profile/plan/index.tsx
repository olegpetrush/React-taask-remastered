import React, { useState } from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
} from 'reactstrap';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';import { Colxx } from '../../../../components/common/CustomBootstrap';
import classnames from 'classnames';
import CancelPlan from './CancelPlan';
import UpgradePlan from './UpgradePlan';
import CurrentPlan from './CurrentPlan';
interface Props {
  locale;
  user;
}

const MyPlan = (props: Props) => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  return (
    <Card className="mb-4">
      <CardHeader>
        <Nav tabs className="card-header-tabs ">
          <NavItem>
            <NavLink
              to="#"
              location={{}}
              className={classnames({
                active: activeFirstTab === '1',
                'nav-link': true,
              })}
              onClick={() => {
                setActiveFirstTab('1');
              }}
            >
              Nuværende plan
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="#"
              location={{}}
              className={classnames({
                active: activeFirstTab === '2',
                'nav-link': true,
              })}
              onClick={() => {
                setActiveFirstTab('2');
              }}
            >
              Opgrader plan
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="#"
              location={{}}
              className={classnames({
                active: activeFirstTab === '3',
                'nav-link': true,
              })}
              onClick={() => {
                setActiveFirstTab('3');
              }}
            >
              Opsig plan
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>

      <TabContent activeTab={activeFirstTab}>
        <TabPane tabId="1">
          <Row>
            <Colxx sm="12">
              <CardBody>
                <CardTitle className="mb-4">Din nuværende plan er:</CardTitle>
                <CurrentPlan />
              </CardBody>
            </Colxx>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Colxx sm="12">
              <CardBody>
                <CardTitle className="mb-4">Opgrader plan</CardTitle>
                <UpgradePlan />
              </CardBody>
            </Colxx>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Colxx sm="12">
              <CardBody>
                <CardTitle className="mb-4">Vil du opsige din plan?</CardTitle>
                <CancelPlan />
              </CardBody>
            </Colxx>
          </Row>
        </TabPane>
      </TabContent>
    </Card>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { user, loading, error } = reducers.authUser;
  const { locale } = reducers.settings;
  return { user, loading, error, locale };
};

export default connect(mapStateToProps, {})(MyPlan);
