import React, { Suspense, useMemo } from 'react';
import { Row, Col, Badge } from 'reactstrap';

import { useTable, usePagination, useSortBy } from 'react-table';

import DatatablePagination from '../../../../components/DatatablePagination';
import classnames from 'classnames';
import IntlMessages from '../../../../helpers/IntlMessages';
import { connect } from 'react-redux';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { updateProfile } from '../../../../redux/actions';
import { Invoice } from '../../../../interfaces/Invoice';

interface props {
  invoices: Invoice[];
  locale: string;
}

const PaymentsTable = (props: props) => {
  const cols = useMemo(
    () => [
      {
        Header: 'Faktura #',
        accessor: 'invoice_number',
        cellClass: 'text-muted  w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        id: 'date',
        Header: 'Oprettet dato',
        accessor: 'date',
        cellClass: 'text-muted w-20',
        Cell: (props) => <>{(new Date(props.value)).toLocaleDateString()}</>,
      },
      {
        Header: 'Seneste betalingsdato',
        accessor: 'due_date',
        cellClass: 'text-muted  w-20',
        Cell: (props) => <>{(new Date(props.value)).toLocaleDateString()}</>,
      },
      {
        Header: 'Totalt beløb',
        accessor: 'total',
        cellClass: 'text-muted  w-20 forceWrap',
        Cell: (props) => <>{props.value}</>,
      },
      
      {
        Header: 'Betalingsmetode',
        accessor: 'collection_method',
        cellClass: 'text-muted  w-20',
        Cell: (props) => <>{props.value === "direct_debit" ? "Betalingsservice" : "Betalingskort"}</>,
      },

      {
        Header: 'Status',
        accessor: 'status',
        cellClass: 'text-muted  w-5',
        Cell: (props) => (
          <>
            {props.value === "paid" ? (
              <Badge color="success" className="w-100">
                <IntlMessages id="badge.invoice_paid" />
              </Badge>
            ) : (
              <Badge color="dark" className="w-100">
                <IntlMessages id="badge.invoice_pending" />
              </Badge>
            )}
          </>
        ),
      },
    ],
    []
  );

  return (
    <Suspense fallback={<div className="loading" />}>
      <Row className="mt-4">
        <Col lg={12}>
          <Table columns={cols} data={props.invoices} divided />
        </Col>
      </Row>
    </Suspense>
  );
};

function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        sortBy: [{ id: 'date', desc: true }],
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  return { locale };
};

export default connect(mapStateToProps, { updateProfileAction: updateProfile })(
  PaymentsTable
);
