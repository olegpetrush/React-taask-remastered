import React, { Suspense, useMemo } from 'react';
import {
  Row,
  Col,
  Badge,
  Button,
} from 'reactstrap';

import { useTable, usePagination, useSortBy } from 'react-table';

import DatatablePagination from '../../../../components/DatatablePagination';
import { Task } from '../../../../interfaces/Task';
import classnames from 'classnames';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { connect } from 'react-redux';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { updateProfile } from '../../../../redux/actions';
import { Link } from 'react-router-dom';

interface props {
  tasks: Task[];
  locale: string;
  history: any;
  updateProfileAction: any;
}

const Tasks = (props: props) => {
  const cols = useMemo(
    () => [
      {
        id: 'industry',
        Header: 'Branche',
        accessor: 'industry.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        id: 'description',
        Header: 'Beskrivelse',
        accessor: (row: Task) => row.description,
        cellClass: 'text-muted  w-40 forceWrap',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Postnummer',
        accessor: (row: Task) => row.consumer.zip,
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'By',
        accessor: 'consumer.city',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Land',
        accessor: (row: Task) => row.consumer.country.name,
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        id: 'date',
        Header: 'Dato',
        accessor: (row: Task) => row.date_time,
        cellClass: 'text-muted  w-10',
        sortMethod: (a, b) => {
          let aDate = new Date(a);
          let bDate = new Date(b);
          return aDate.getTime() - bDate.getTime();
        },
        Cell: (props) => <>{new Date(props.value).toLocaleString()}</>,
      },
      {
        Header: 'Status',
        accessor: (row: Task) => row.active,
        cellClass: 'text-muted  w-5',
        Cell: (props) => (
          <>
            {!props.value ? (
              <Badge color="dark" className="w-100">
                <IntlMessages id="badge.inactive" />
              </Badge>
            ) : (
              <Badge color="success" className="w-100">
                <IntlMessages id="badge.active" />
              </Badge>
            )}
          </>
        ),
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
          <Table columns={cols} data={props.tasks} divided />
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
  Tasks
);
