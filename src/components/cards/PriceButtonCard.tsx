/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Card, CardBody, Row, Button } from 'reactstrap';
import { Colxx } from '../common/CustomBootstrap';

const PriceSelectCard = ({ data, onClick,disabled }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Card>
      <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
        <div className="price-top-part">
          <i className={`large-icon ${data.icon}`} />
          <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
            {data.title}
          </h5>
          <p className="text-large mb-2 text-default">{data.price}</p>
          <p className="text-muted text-small">{data.detail}</p>
        </div>
        <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
          {data.features.map((feature, index) => {
            return (
              <Row key={index}>
                <Colxx sm={8} className="text-center">
                  {feature.left}
                </Colxx>
                <Colxx sm={4} className="text-center">
                  {feature.right}
                </Colxx>
              </Row>
            );
          })}
          <div className="text-center mt-5">
            <Button
              type="button"
              onClick={() => {
                setLoading(true);
                onClick().then(() => setLoading(false));
              }}
              disabled={disabled}
              color={disabled ? "dark" : "primary"}
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
              <span className="label">Vælg</span>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default React.memo(PriceSelectCard);
