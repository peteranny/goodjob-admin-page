// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { Tag } from 'antd';

import { withProps, compose, type HOC } from 'recompose';

import { getTimeSalaryQL, updateTimeSalaryQL } from '../../graphql/TimeAndSalary/';
import type { ExperienceType } from '../../shared/types/experienceType';

import AdminLayout from './AdminLayout';
import FunctionalTable from '../FunctionalTable';
import withPagination from '../../shared/hoc/withPagination';
import withSearchOptionFromRoute from '../../shared/hoc/withSearchOptionFromRoute';

const COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    searchable: true
  },
  {
    title: '公司',
    dataIndex: 'company',
    key: 'company',
    searchable: true
  },
  {
    title: '職稱',
    dataIndex: 'job_title',
    key: 'job_title',
    searchable: true
  },
  {
    title: '薪資種類',
    dataIndex: 'salary_type',
    key: 'salary_type',
    render: text => <Tag>{text}</Tag>
  },
  {
    title: '薪資金額',
    dataIndex: 'salary_amount',
    key: 'salary_amount',
    sortable: true
  },
  {
    title: '估計時薪',
    dataIndex: 'estimated_hourly_wage',
    key: 'estimated_hourly_wage',
    sortable: true,
    render: value => (typeof value === 'number' ? parseInt(value, 10) : value)
  },
  {
    title: '一週總工時',
    dataIndex: 'week_work_time',
    key: 'week_work_time',
    sortable: true
  },
  {
    title: '封存狀態',
    dataIndex: 'archive_status',
    key: 'archive_status',
    render: isArchived => (isArchived ? <Tag color="red">已封存</Tag> : '')
  },
  {
    title: '封存理由',
    dataIndex: 'archive_reason',
    key: 'archive_reason',
    render: (reason, record) => (record.archive_status ? reason : '')
  }
];

type Props = {
  page: number,
  pageSize: number,

  searchObj: {
    columnKey: string,
    value: string
  },
  setSearchObj: ({
    columnKey: string,
    value: string
  }) => void
};

type PropsFromHOC = {
  expData: Array<ExperienceType>,
  setSearchObj: ({
    columnKey: string,
    value: string
  }) => void
};

const TimeAndSalary = ({ setSearchObj, expData, ...restProps }: Props & PropsFromHOC) => (
  <AdminLayout>
    <FunctionalTable
      _columns={COLUMNS}
      dataSource={expData}
      displayedFormFields={[
        '_id',
        'company',
        'job_title',
        'estimated_hourly_wage',
        'week_work_time',
        'salary_type',
        'salary_amount'
      ]}
      {...restProps}
    />
  </AdminLayout>
);

const withGraphqlData: HOC<*, Props> = compose(
  graphql(getTimeSalaryQL, {
    options: props => {
      const {
        searchObj: { columnKey, value },
        page,
        pageSize
      } = props;

      return {
        variables: {
          queryExp: {
            search: {
              query: value,
              by: columnKey.toUpperCase()
            },
            start: (page - 1) * pageSize,
            limit: pageSize
          }
        }
      };
    }
  }),
  withProps(({ data: { workings, loading } }) => {
    const _expData = (workings && workings.data) || [];
    const expData = _expData.map(data => ({
      ...data,
      id: data._id,
      key: data._id,
      company: data.company.name,
      salary_type: data.salary && data.salary.type,
      salary_amount: data.salary && data.salary.amount,
      archive_status: !!(data.archive && data.archive.is_archived),
      archive_reason: data.archive && data.archive.reason ? data.archive.reason : ''
    }));
    const nData = workings ? workings.total : 0;

    return {
      isLoading: loading,
      expData,
      nData
    };
  })
);

const withGraphqlMutation: HOC<*, Props> = compose(
  graphql(updateTimeSalaryQL),
  withProps(({ mutate }) => ({
    updateArchive: async (_id, isArchived, reason = '') => {
      await mutate({
        variables: {
          mutationExp: {
            workings: {
              _id,
              archive: {
                is_archived: isArchived,
                reason
              }
            }
          }
        }
      });
    }
  }))
);

const hoc = compose(
  withSearchOptionFromRoute,
  withPagination,
  withGraphqlData,
  withGraphqlMutation
);

export default hoc(TimeAndSalary);
