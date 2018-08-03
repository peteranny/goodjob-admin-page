// @flow
import React from 'react';
import { graphql } from 'react-apollo';

import {
  withState,
  withProps,
  compose,
  type HOC,
} from 'recompose';

import { getTimeSalaryQL } from '../../graphql/TimeAndSalary/';
import type { ExperienceType } from '../../shared/types/experienceType';

import AdminLayout from './AdminLayout';
import FunctionalTable from '../FunctionalTable';
import WrapTable from '../../shared/hoc/WrapTable';
import withPagination from '../../shared/hoc/withPagination';

const COLUMNS = [
  { title: 'ID', dataIndex: 'id', key: 'id', filterVisible: false },
  { title: '公司', dataIndex: 'company', key: 'company', searchable: true, showSearchValue: '', filterVisible: false },
  { title: '職稱', dataIndex: 'job_title', key: 'job_title', searchable: true, showSearchValue: '', filterVisible: false },
  { title: '薪資種類', dataIndex: 'salary_type', key: 'salary_type', filterVisible: false },
  { title: '薪資金額', dataIndex: 'salary_amount', key: 'salary_amount', sortable: true, filterVisible: false },
  { title: '實際平均工時', dataIndex: 'estimated_hourly_wage', key: 'estimated_hourly_wage', sortable: true, filterVisible: false },
  { title: '一週總工時', dataIndex: 'week_work_time', key: 'week_work_time', sortable: true, filterVisible: false },
  { title: '封存狀態', dataIndex: 'archive_status', key: 'archive_status', filterVisible: false },
  { title: '封存理由', dataIndex: 'archive_reason', key: 'archive_reason', filterVisible: false },
];

type Props = {};

type PropsFromHOC = {
  expData: Array<ExperienceType>,
  setSearchObj: ({
    columnKey: string,
    value: string,
  }) => void,
};

const TimeAndSalary = ({
  setSearchObj,
  expData,
  ...restProps
}: Props & PropsFromHOC) => (
  <AdminLayout>
    <WrapTable
      _columns={COLUMNS}
      setSearchObj={setSearchObj}
      renderProps={({
        columns,
        changeColumnSearchValue,
        setFilterVisible,
        submitSearchObj,
      }) => (
        <FunctionalTable
          columns={columns}
          dataSource={expData}
          changeColumnSearchValue={changeColumnSearchValue}
          setFilterVisible={setFilterVisible}
          submitSearchObj={submitSearchObj}
          displayedFormFields={[
            '_id',
            'company',
            'job_title',
            'estimated_hourly_wage',
            'week_work_time',
            'salary_type',
            'salary_amount',
          ]}
          {...restProps}
        />
      )}
    />
  </AdminLayout>
);

const withGraphqlData: HOC<*, Props> = compose(
  withState('searchObj', 'setSearchObj', { columnKey: 'COMPANY', value: '' }),
  graphql(getTimeSalaryQL, {
    options: (props) => {
      const {
        searchObj: {
          columnKey,
          value,
        },
        page,
        pageSize,
      } = props;

      return ({
        variables: {
          queryExp: {
            search: {
              query: value,
              by: columnKey.toUpperCase(),
            },
            start: (page - 1) * pageSize,
            limit: pageSize,
          },
        },
      });
    },
  }),
  withProps(({
    data: {
      workings,
    },
  }) => {
    const _expData = (workings && workings.data) || [];
    const expData = _expData.map(data => ({
      ...data,
      id: data._id,
      key: data._id,
      company: data.company.name,
      salary_type: data.salary.type,
      salary_amount: data.salary.amount,
      archive_status: data.archive && data.archive.is_archive,
      archive_reason: data.archive && data.archive.reason ? data.archive.reason : null,
    }));
    const nData = workings ? workings.total : 0;

    return ({
      expData,
      nData,
    });
  }),
);

const hoc = compose(
  withPagination,
  withGraphqlData,
);

export default hoc(TimeAndSalary);
