// @flow
import React from 'react';
import { graphql } from 'react-apollo';

import { withProps, compose, type HOC } from 'recompose';

import { getWorkExpQL, updateWorkExpQL } from '../../graphql/WorkExperience/';
import type { ExperienceType } from '../../shared/types/experienceType';

import AdminLayout from './AdminLayout';
import FunctionalTable from '../FunctionalTable';
import withPagination from '../../shared/hoc/withPagination';
import withSearchOption from '../../shared/hoc/withSearchOption';

const COLUMNS = [
  { title: 'ID', dataIndex: 'id', key: 'id', filterVisible: false, width: '150px' },
  {
    title: '公司',
    dataIndex: 'company',
    key: 'company',
    searchable: true,
    showSearchValue: '',
    filterVisible: false
  },
  {
    title: '職稱',
    dataIndex: 'job_title',
    key: 'job_title',
    searchable: true,
    showSearchValue: '',
    filterVisible: false
  },
  { title: '標題', dataIndex: 'title', key: 'title', filterVisible: false },
  { title: '地區', dataIndex: 'region', key: 'region', filterVisible: false },
  {
    title: '封存狀態',
    dataIndex: 'archive_status',
    key: 'archive_status',
    filterVisible: false,
    render: isArchived => (isArchived ? '已封存' : '')
  },
  {
    title: '封存理由',
    dataIndex: 'archive_reason',
    key: 'archive_reason',
    filterVisible: false,
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

/* eslint-disable camelcase */

const WorkExperience = ({ setSearchObj, expData, ...restProps }: Props & PropsFromHOC) => (
  <AdminLayout>
    <FunctionalTable
      _columns={COLUMNS}
      setSearchObj={setSearchObj}
      dataSource={expData}
      displayedFormFields={['_id', 'title', 'company', 'job_title', 'region']}
      {...restProps}
    />
  </AdminLayout>
);

const withGraphqlData: HOC<*, Props> = compose(
  graphql(getWorkExpQL, {
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
  withProps(({ data: { work_experiences, loading } }) => {
    const _expData = (work_experiences && work_experiences.data) || [];
    const expData = _expData.map(data => ({
      ...data,
      id: data._id,
      key: data._id,
      company: data.company.name,
      archive_status: !!(data.archive && data.archive.is_archived),
      archive_reason: data.archive && data.archive.reason ? data.archive.reason : ''
    }));
    const nData = work_experiences ? work_experiences.total : 0;

    return {
      isLoading: loading,
      expData,
      nData
    };
  })
);

const withGraphqlMutation: HOC<*, Props> = compose(
  graphql(updateWorkExpQL),
  withProps(({ mutate }) => ({
    updateArchive: async (_id, isArchived, reason = '') => {
      await mutate({
        variables: {
          mutationExp: {
            experiences: {
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
  withSearchOption,
  withPagination,
  withGraphqlData,
  withGraphqlMutation
);

export default hoc(WorkExperience);
