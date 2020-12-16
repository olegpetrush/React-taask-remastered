import React, { Suspense, useState, useEffect } from 'react';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import Api from '../../../../helpers/Api';
import { Task } from '../../../../interfaces/Task';
import { DefaultReducers } from '../../../../redux/exportReducers';
import { connect } from 'react-redux';
import Tasks from './tasks';
const MyJobs = ({ locale }: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  
  useEffect(() => {
    Api.fetchMyTasks(true, locale)
      .then((tasks) => setTasks(tasks))
      .catch((error) => {});
  }, [locale]);

  return (
    <Suspense fallback={<div className="loading" />}>
      <Colxx xxs="12">
        <h3 className="mb-4">Mine Opgaver</h3>
      </Colxx>
      <Tasks tasks={tasks} />
    </Suspense>
  );
};

const mapStateToProps = (reducers: DefaultReducers) => {
  const { locale } = reducers.settings;
  return { locale };
};

export default connect(mapStateToProps, {})(MyJobs);
