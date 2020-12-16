/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React from 'react';
import { WithWizard } from 'react-albus';
import { Button } from 'reactstrap';

const BottomNavigationLoading = ({
  className,
  onClickPrev,
  prevLabel,
  onClickNext,
  nextLabel,
  loading,
}) => {
  return (
    <WithWizard
      render={({ next, previous, step, steps }) => (
        <div className={`wizard-buttons ${className}`}>
          <Button
            color="primary"
            className={`mr-1 ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
            onClick={() => {
              onClickPrev(previous, steps, step);
            }}
          >
            {prevLabel}
          </Button>
          &nbsp;	&nbsp;
          <Button
            size="lg"
            color="success"
            className={"btn-shadow btn-multiple-state "+
              (steps.indexOf(step) >= steps.length - 1 ? ' disabled ' : '') +
              (loading
                ? ' show-spinner '
                : '')
            }
            onClick={() => {
              onClickNext(next, steps, step);
            }}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">{nextLabel}</span>
            
          </Button>
        </div>
      )}
    />
  );
};
export default BottomNavigationLoading;
