/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody, CustomInput, Row } from 'reactstrap';
import { Colxx } from '../common/CustomBootstrap';
import '../../../src/assets/css/sass/custom/merchant_activate.scss';
import starter_icon from '../../assets/custom_images/starter.svg'
import lite_icon from '../../assets/custom_images/lite.svg'
import gold_icon from '../../assets/custom_images/gold.svg'

const PriceSelectCard = ({ data, selKey, selected, onSelect }) => {
  return (
    <Card className="border-taask-orange">
      <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
        <div className="price-top-part">
          <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4 text-title">
            {data.title}
          </h5>

          {/* {data.id === 'Starter' ? <img src={starter_icon} className="pricing-icons"></img> : ""}
          {data.id === 'Lite' ? <img src={lite_icon} className="pricing-icons"></img> : ""}
          {data.id === 'Gold' ? <img src={gold_icon} className="pricing-icons"></img> : ""} */}

          <i className={`large-icon ${data.icon}`} />
          
          
          {/* <i className={`large-plan-icon large-icon ${data.icon}`} /> */}
          <br/>
          <br/>
          <span className={`text-large mb-2 text-default ${data.price_color}`}>{data.price}</span><span className="text-dkk">&nbsp; DKK</span>
          
         <br/>
        </div>

        <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
          {data.features.map((feature, index) => {
            return (
              <Row key={index}>
                <Colxx sm={8}><span className="details-text-left">{feature.left}</span> {feature.is_mdr ? <span className="color-mdr">mdr.</span> : ''}</Colxx>
                <Colxx sm={4} className="details-text-right">{feature.right}</Colxx>
              </Row>
            );
          })}
          <div className="text-center mt-5">
            <CustomInput
              type="radio"
              name="planRadio"
              id={selKey}
              label={'Vælg'}
              onChange={onSelect}
              checked={selected}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default React.memo(PriceSelectCard);
