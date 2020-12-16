import React, { Suspense, useState, useEffect } from 'react';
import { Card, CardBody, Input} from 'reactstrap';
import Select from 'react-select';
import { RangeTooltip } from '../../../../components/common/SliderTooltips';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import Tasks from './tasks';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import Api from '../../../../helpers/Api';
import { Task } from '../../../../interfaces/Task';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
const AdminMarket = ({ locale,history }: any) => {
  const [industries, setIndustries] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [selCountry, setSelCountry] = useState<any>({key:"0",value:"0",label:"Loader.."});
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selIndustry, setSelIndustry] = useState<any>({key:"0",value:"0",label:"Loader.."});
  const [descriptor, setDescriptor] = useState<string>('');
  const [zips, setZips] = useState<number[]>([1000, 9990]);

  useEffect(() => {
    let tasksIn: Task[] = tasks;

    // apply zips
    tasksIn = tasksIn.filter(
      (x) => +x.consumer.zip >= zips[0] && +x.consumer.zip <= zips[1]
    );

    // apply descriptor
    if (descriptor) {
      tasksIn = tasksIn.filter(
        (x) =>
          !x.description
            .toLocaleLowerCase()
            .search(descriptor.toLocaleLowerCase())
      );
    }

    // apply country
    tasksIn = tasksIn.filter(x=>x.consumer.country.country_code === selCountry.key);

    // apply industry
    tasksIn = tasksIn.filter(x=>x.industry.id === selIndustry.key);

    setFilteredTasks(tasksIn);
  }, [tasks, selCountry, selIndustry, descriptor, zips]);

  useEffect(() => {
    Api.fetchTasks(false, locale)
      .then((tasks) => setTasks(tasks))
      .catch((error) => {});
    Api.fetchCountries(locale)
      .then((countries) => {
        let mappedCountries = countries.map(x=>{return({key:x.country_code,value:x.country_code,label:x.name});});
        setCountries(mappedCountries);
        setSelCountry(mappedCountries[0]);
      })
      .catch((error) => {});
    Api.fetchIndustries(locale)
      .then((industries) => {
        let mappedIndustries = industries.map(x=>{return({key:x.id,value:x.id,label:x.name});});
        setIndustries(mappedIndustries);
        setSelIndustry(mappedIndustries[0]);
      })
      .catch((error) => {});
  }, [locale]);

  return (
    <Suspense fallback={<div className="loading" />}>
      <Colxx xxs="12">
        <h3 className="mb-4 primary-color">Søg Opgaver</h3>
      </Colxx>
      <Card>
        <CardBody>
          <div className="card-title">Filtre</div>
          <div className="row">
            <div className="col-6 sm-12">
              <label>Vælg branche</label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                value={selIndustry}
                onChange={setSelIndustry}
                options={industries}
              />
            </div>
            <div className="col-6 sm-12">
              <label>Vælg postnumre</label>
              <RangeTooltip
                min={1000}
                max={9990}
                step={10}
                defaultValue={zips}
                onAfterChange={setZips}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6 sm-12">
              <label>Land</label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                value={selCountry}
                onChange={setSelCountry}
                options={countries}
              />
            </div>
            <div className="col-6 sm-12">
              <label>Beskrivelse</label>
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
      <Tasks history={history} tasks={filteredTasks} />
    </Suspense>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  return { locale };
};

export default connect(mapStateToProps, {})(AdminMarket);
