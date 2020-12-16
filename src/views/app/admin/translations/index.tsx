import React, { Suspense, useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import Api from '../../../../helpers/Api';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { DefaultReducers } from '../../../../redux/exportReducers';
import LanguageLabels from './LanguageLabels';
const AdminMarket = ({ locale, history }: any) => {
  const [languages, setLanguages] = useState<any[]>([
    {
      key: '0',
      value: 'Loading',
      label: 'Loading',
    },
  ]);
  const [selLanguage, setSelLanguage] = useState<any>({
    key: '0',
    value: 'Loading',
    label: 'Loading',
  });
  const [labels, setLabels] = useState<any>([]);

  useEffect(() => {
    Api.fetchLabels(locale)
      .then((labels) => setLabels(labels))
      .catch((error) => {});
    Api.fetchLanguages(locale).then((languages) => {
      languages = languages.filter(x=>x.name !== "Dansk");
      let mappedLanguages = languages.map((x) => {
        return { key: x.id, value: x.name, label: x.name };
      });
      setLanguages(mappedLanguages);
      setSelLanguage(mappedLanguages[0]);
    }).catch((error) => {});
  }, [locale]);

  return (
    <Suspense fallback={<div className="loading" />}>
      <Colxx xxs="12">
        <h3 className="mb-4 primary-color">Søg Opgaver</h3>
      </Colxx>
      <Card>
        <CardBody>
          <div className="card-title">Filtre</div>

          <div className="row mt-4">
            <div className="col-6 sm-12">
              <label>Land</label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                value={selLanguage}
                onChange={setSelLanguage}
                options={languages}
              />
            </div>
          </div>
        </CardBody>
      </Card>
      <LanguageLabels labels={labels} language={selLanguage.value} />
    </Suspense>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  return { locale };
};

export default connect(mapStateToProps, {})(AdminMarket);
