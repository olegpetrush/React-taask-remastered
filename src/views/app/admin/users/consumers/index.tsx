import React, { Suspense, useState, useEffect } from 'react';
import { Card, CardBody, Input } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Task } from '../../../../../interfaces/Task';
import Api from '../../../../../helpers/Api';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../../../components/common/CustomSelectInput';
import { RangeTooltip } from '../../../../../components/common/SliderTooltips';
import Tasks from '../../../market/myjobs/tasks';
import { DefaultReducers } from '../../../../../redux/exportReducers';
import { Consumer } from '../../../../../interfaces/Consumer';
import Consumers from './Consumers';
import { Route } from 'react-router-dom';
import EditConsumer from './EditConsumer';
const AdminMarket = ({ match ,locale, history }: any) => {
  const [descriptor, setDescriptor] = useState<string>('');
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [filteredConsumers, setFilteredConsumers] = useState<Consumer[]>([]);

  useEffect(() => {
    let consumersIn: Consumer[] = consumers;

    // apply descriptor
    if (descriptor) {
      consumersIn = consumersIn.filter(
        (x) =>
          (!x.email
            .toLocaleLowerCase()
            .search(descriptor.toLocaleLowerCase()) || !x.full_name
            .toLocaleLowerCase()
            .search(descriptor.toLocaleLowerCase()) ||!x.address
            .toLocaleLowerCase()
            .search(descriptor.toLocaleLowerCase()) ||!x.zip
            .toLocaleLowerCase()
            .search(descriptor.toLocaleLowerCase()) ||!x.city
            .toLocaleLowerCase()
            .search(descriptor.toLocaleLowerCase()) ||!x.country.name
            .toLocaleLowerCase()
            .search(descriptor.toLocaleLowerCase()) ||!x.phone
            .toLocaleLowerCase()
            .search(descriptor.toLocaleLowerCase())
            )
      );
    }

    setFilteredConsumers(consumersIn);
  }, [consumers, descriptor]);

  useEffect(() => {
    Api.fetchConsumers(locale)
      .then((consumers) => {
        console.log("Consumers",consumers);
        setConsumers(consumers);
      })
      .catch((error) => {});
  }, [locale]);

  return (
    <Suspense fallback={<div className="loading" />}>
      {/* <Route
        path={`${match.url}/consumers`}
        render={(props) => <EditConsumer {...props} />}
      /> */}
      
      <Colxx xxs="12">
        <h3 className="mb-4 primary-color">Søg Opgaver</h3>
      </Colxx>
      <Card>
        <CardBody>
          <div className="card-title">Filtre</div>
          <div className="row">
            <div className="col-6 sm-12">
              <label>Fri-tekst søgning</label>
              <Input
                addon
                type="text"
                aria-label="Checkbox for following text input"
                onChange={(e) => setDescriptor(`${e.target.value}`)}
              />
              {/* <Field className="form-control" type="text" name="contact_name" /> */}
            </div>
          </div>
        </CardBody>
      </Card>
      <Consumers history={history} consumers={filteredConsumers} />
    </Suspense>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  return { locale };
};

export default connect(mapStateToProps, {})(AdminMarket);
