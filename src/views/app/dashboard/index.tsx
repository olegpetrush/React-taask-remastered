import React, { useState, useEffect } from 'react';
import { Row, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Api from '../../../helpers/Api';
import { NotificationManager } from '../../../components/common/react-notifications';
import Icon from '../../../components/Icon';
import IconCard from '../../../components/cards/IconCard'
import '../../../assets/css/sass/custom/merchant_dashboard.scss';
import Swal from 'sweetalert2'
import { getCookie, setCookie } from '../../../helpers/Cookies';
import { LineChart } from '../../../components/charts';
import { lineChartData } from '../../../data/charts';

const Dashboard = ({ match, history, locale }) => {
  const [status, setStatus] = useState({
    active_task_count: 'Indlæser...',
    branch_count: 'Indlæser...',
    most_tasks_in_branch: 'Indlæser...',
    newest_branch: 'Indlæser...',
    partners_pr_branch: 'Indlæser...',
    task_count: 'Indlæser...',
  });


  useEffect(() => {
    Api.fetchDashboard(locale)
      .then((value) => {
        setStatus(value);
      })
      .catch((error) => {
        NotificationManager.warning(
          'Kunne ikke hente dashboard.',
          'Fejl',
          3000,
          null,
          null,
          ''
        );
      });

      if(getCookie("first_time_login") !== "true"){
        Swal.fire({
          icon: 'warning',
          title: 'Din bruge skal aktiveres',
          text: 'For at se opgaverne og byde på dem skal du aktivere din bruger først. Du kan teste platformen helt gratis såfremt du ønsker dette. Tryk på knappen for at aktivér dun bruger.',
          confirmButtonText: 'Aktiver min bruger',
          confirmButtonColor: '#FFAA45'
        }).then((value) => {
          if(value.value === true){
            history.push("/app/profile/activate")
          }
        })
    
        setCookie("first_time_login", "true");
      }
  }, [locale]);
  

  return (
    <>
      <Row>
        <Colxx lg="12">
          <Card>
            <CardBody style={{ backgroundColor: "#111111" }}>
              <h1 style={{ color: "#ffaa45" }}>OBS: Din konto skal aktiveres</h1>
              <p className="text-white">For at få adgang til opgaverne skal du aktivere din konto</p> <br/>
              <Button onClick={() => {history.push("/app/profile/activate")}} color="primary">Aktiver konto</Button>
              
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <br/><br/>

      <Row>
        <Colxx xxs="6">
            <Row>
              <Colxx xxs="12" className="">
                <Card>
                 <CardBody>
                  <CardTitle>Nye opgaver pr. dagen</CardTitle>
                  <LineChart shadow data={lineChartData}/>
                 </CardBody>
                </Card>
              </Colxx>
            </Row>
            <br/>
            <Row>
              <Colxx xxs="6" className="pr-1">
                <Card>
                  <CardBody className="icon-cards">
                    <h1>
                      <Icon className="orange-color-icon" icon="iconsminds-library" />
                    </h1>
                    <CardTitle className="text-muted">Antal brancher</CardTitle>
                    
                    <div className="text-value">{status.branch_count}</div>
                  </CardBody>
                </Card>
              </Colxx>
              <Colxx xxs="6" className="pl-1">
                <Card>
                  <CardBody className="icon-cards">
                    <h1>
                      <Icon className="orange-color-icon" icon="iconsminds-library" />
                    </h1>
                    <CardTitle className="text-muted">Nyeste branche</CardTitle>
                    <div className="text-value">{status.newest_branch}</div>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
            <Row className="mt-2">
              <Colxx xxs="6" className="pr-1">
                <Card>
                  <CardBody className="icon-cards">
                    <h1>
                      <Icon className="orange-color-icon" icon="iconsminds-library" />
                    </h1>
                    <CardTitle className="text-muted">Flest opgaver i</CardTitle>
                    <div className="text-value">{status.most_tasks_in_branch}</div>
                  </CardBody>
                </Card>
              </Colxx>
              <Colxx xxs="6" className="pl-1">
                <Card>
                  <CardBody className="icon-cards">
                    <h1>
                      <Icon className="orange-color-icon" icon="iconsminds-library" />
                    </h1>
                    <CardTitle className="text-muted">Partnere pr. branche</CardTitle>
                    <div className="text-value">{Math.round(Number(status.partners_pr_branch) * 100) / 100}</div>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
        </Colxx>
        <Colxx xxs="6">
          <Row>
            <Colxx xxs="12">
              <Card>
                <CardBody>
                  <Row>
                    <Colxx xxs="8">
                      <CardTitle>Antal aktive opgaver</CardTitle>
                    </Colxx>
                    <Colxx xxs="4">
                      <Button
                      size="lg"
                        color="primary"
                        onClick={() => {
                          history.push('/app/market/search');
                        }}
                        className="badge w-100"
                      >
                        Se aktive opgaver
                      </Button>
                    </Colxx>
                  </Row>
                  <h1 className="text-value">{status.active_task_count}</h1>
                  <p className="text-muted">Aktive opgaver i opgavemarkedet.</p>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" className="mt-4">
              <Card>
                <CardBody>
                  <Row>
                    <Colxx xxs="8">
                      <CardTitle>Antal opgaver i alt</CardTitle>
                    </Colxx>
                    <Colxx xxs="4">
                      <Button
                        size="lg"
                        color="primary"
                        onClick={() => {
                          history.push('/app/market/search');
                        }}
                        className="badge w-100"
                      >
                        Se opgavemarked
                      </Button>
                    </Colxx>
                  </Row>
                  <h1 className="text-value">{status.task_count}</h1>
                  <p className="text-muted">Opgaver i alt på opgavemarkedet.</p>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>

    </>
  );
};
const mapStateToProps = (reducers) => {
  const { containerClassnames } = reducers.menu;
  const { user } = reducers.authUser;
  const { locale } = reducers.settings;
  return { containerClassnames, user, locale };
};

export default withRouter(connect(mapStateToProps, {})(Dashboard));
