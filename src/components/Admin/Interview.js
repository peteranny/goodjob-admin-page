// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { Tag } from 'antd';

import { withProps, compose, type HOC } from 'recompose';

import { getInterviewExpQL, updateInterviewExpQL } from '../../graphql/InterviewExperience/';
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
    filterVisible: false
  },
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
    render: isArchived => (isArchived ? <Tag color="red">已封存</Tag> : '')
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

const Interview = ({ setSearchObj, expData, ...restProps }: Props & PropsFromHOC) => (
  <AdminLayout>
    <FunctionalTable
      _columns={COLUMNS}
      dataSource={expData}
      displayedFormFields={['_id', 'title', 'company', 'job_title', 'region']}
      {...restProps}
    />
  </AdminLayout>
);

/* eslint-disable camelcase */

const withGraphqlData: HOC<*, Props> = compose(
  graphql(getInterviewExpQL, {
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
  withProps(({ data: { interview_experiences, loading } }) => {
    const _expData = (interview_experiences && interview_experiences.data) || [];
    const expData = _expData.map(data => ({
      ...data,
      id: data._id,
      key: data._id,
      company: data.company.name,
      archive_status: !!(data.archive && data.archive.is_archived),
      archive_reason: data.archive && data.archive.reason ? data.archive.reason : ''
    }));
    const nData = interview_experiences ? interview_experiences.total : 0;

    return {
      isLoading: loading,
      expData,
      nData
    };
  })
);

const withGraphqlMutation: HOC<*, Props> = compose(
  graphql(updateInterviewExpQL),
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
  withSearchOptionFromRoute,
  withPagination,
  withGraphqlData,
  withGraphqlMutation
);

export default hoc(Interview);
