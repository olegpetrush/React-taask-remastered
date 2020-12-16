import React, { useState, useEffect } from 'react';
import { Card, CardBody, Input, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import Api from '../../../../helpers/Api';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { DefaultReducers } from '../../../../redux/exportReducers';
import IntlMessages from '../../../../helpers/IntlMessages';
import { NotificationManager } from '../../../../components/common/react-notifications';
const LanguageLabels = ({ locale, history, labels, language }: any) => {
  const [labelPairs, setLabelPairs] = useState<{ [key: string]: {id:number, value:string} }>({});
  const [initialLabelPairs, setInitialLabelPairs] = useState<{ [key: string]: {id:number, value:string} }>({});
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    let other_labels: any[] = labels.filter((x) => x.original_value && x.language === language);

    let local_labelPairs: { [key: string]: {id:number, value:string} } = {};

    other_labels.forEach((ol) => {
      local_labelPairs[ol.original_value] = ol;
    });

    setLabelPairs(deepCopy({...local_labelPairs}));
    setInitialLabelPairs(deepCopy({...local_labelPairs}));
  }, [labels, language]);

  const updateLabelPairs = (original_label: string, new_label: string) => {
    let local_labelPairs = labelPairs;
    local_labelPairs[original_label].value = new_label;
    setLabelPairs({ ...local_labelPairs });
  };

  const handleSubmit = async () => {
    setLoading(true);
    Object.keys(initialLabelPairs).forEach((ol) => {
      if (initialLabelPairs[ol].value !== labelPairs[ol].value) {
        Api.translateLabel(labelPairs[ol].id,labelPairs[ol].value, locale).then(() => setLoading(false)).catch((error) =>{
            NotificationManager.warning("Kunne ikke opdatere oversættelsen til: "+ol+". Din oversættelse er ikke blevet gemt.","Fejl",3000,null,null,"");
        });
        setLoading(false);
      }
    });
  };


  return (
    <>
      <Colxx xxs="12">
        <h3 className="mb-4 mt-4 primary-color">Oversættelser</h3>
      </Colxx>
      <Card>
        <CardBody>
          <Row>
            <Col xs={6} lg={3} className="text-right">
              <h1>Dansk</h1>
            </Col>
            <Col xs={6}>
              <h1>{language}</h1>
            </Col>
          </Row>
          {Object.keys(labelPairs).map((original_label) => {
            return (
              <Row key={original_label} className="mt-2">
                <Col xs={6} lg={3} className="text-right">
                  {original_label}
                </Col>
                <Col xs={6} lg={9}>
                  <Input
                    type="text"
                    value={labelPairs[original_label].value}
                    onChange={(value) => {
                      updateLabelPairs(
                        original_label,
                        value.currentTarget.value
                      );
                    }}
                  />
                </Col>
              </Row>
            );
          })}
          <Button
            type="button"
            onClick={handleSubmit}
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
            <span className="label">
              <IntlMessages id="user.save" />
            </span>
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  return { locale };
};

function deepCopy(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = deepCopy(obj[i]);
      }
      return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}


export default connect(mapStateToProps, {})(LanguageLabels);
