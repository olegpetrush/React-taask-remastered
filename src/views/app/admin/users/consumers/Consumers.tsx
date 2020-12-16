import React, { Suspense, useMemo } from 'react';
import {
  Row,
  Col,
  Badge,
  Button,
} from 'reactstrap';

import { useTable, usePagination, useSortBy } from 'react-table';

import DatatablePagination from '../../../../../components/DatatablePagination';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Consumer } from '../../../../../interfaces/Consumer';
import IntlMessages from '../../../../../helpers/IntlMessages';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import { DefaultReducers } from '../../../../../redux/exportReducers';
import { updateProfile } from '../../../../../redux/actions';

interface props {
  consumers: Consumer[];
  locale: string;
  history: any;
}

const Consumers = (props: props) => {
  const cols = useMemo(
    () => [
        {
            id: 'name',
            Header: 'Navn',
            accessor: (row: Consumer) => row.full_name,
            cellClass: 'text-muted  w-40 forceWrap',
            Cell: (props) => <>{props.value}</>,
          },
      {
        id: 'address',
        Header: 'Addresse',
        accessor: (row: Consumer) => row.address,
        cellClass: 'text-muted  w-40 forceWrap',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Postnummer',
        accessor: (row: Consumer) => row.zip,
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'By',
        accessor: 'city',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Land',
        accessor: (row: Consumer) => row.country.name,
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        id: 'email',
        Header: 'email',
        accessor: (row: Consumer) => row.email,
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Telefon',
        accessor: (row: Consumer) => row.phone,
        cellClass: 'text-muted  w-5',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        cellClass: 'text-muted  w-10',
        Cell: (props) => (
          <>
            <Link to={'/app/market/task/' + props.value}>
              <Button color="primary" className="badge">
                Se opgave
              </Button>
            </Link>
          </>
        ),
      },
    ],
    []
  );

  return (
    <Suspense fallback={<div className="loading" />}>
      <Row className="mt-4">
        <Colxx xxs="12" className="ml-3">
          <h3>Fundne opgaver</h3>
        </Colxx>
        <Col lg={12}>
          <Table columns={cols} data={props.consumers} divided />
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
  Consumers
);
