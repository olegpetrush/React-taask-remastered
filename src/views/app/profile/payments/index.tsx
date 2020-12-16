import React, { Suspense, useState, useEffect } from 'react';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import Api from '../../../../helpers/Api';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import PaymentsTable from './PaymentsTable';
import { Invoice } from '../../../../interfaces/Invoice';
const Payments = ({ locale }: any) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  
  useEffect(() => {
    Api.fetchInvoices(locale)
      .then((invoices) => setInvoices(invoices))
      .catch((error) => {}); 
  }, [locale]);

  return (
    <Suspense fallback={<div className="loading" />}>
      <Colxx xxs="12">
        <h3 className="mb-4">Betalinger</h3>
      </Colxx>
      <PaymentsTable invoices={invoices} />
    </Suspense>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  return { locale };
};

export default connect(mapStateToProps, {})(Payments);
