// @flow
import React from 'react';
import FunctionalTable from '../FunctionalTable';

const dataSource = [
  {
    key: '1',
    id: 'a',
    company: 'Droi',
    job_title: '資深工程師',
    title: '小風好可愛',
    region: '台北',
    archive_status: 'archived',
    archive_reason: 'You cant see me',
  },
  {
    key: '2',
    id: 'b',
    company: '同光',
    job_title: '小組長',
    title: '小風好帥',
    region: '台北',
    archive_status: 'unarchived',
    archive_reason: 'You can see me',
  },
];

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '公司', dataIndex: 'company', key: 'company' },
  { title: '職稱', dataIndex: 'job_title', key: 'job_title' },
  { title: '標題', dataIndex: 'title', key: 'title' },
  { title: '地區', dataIndex: 'region', key: 'region' },
  { title: '封存狀態', dataIndex: 'archive_status', key: 'archive_status' },
  { title: '封存理由', dataIndex: 'archive_reason', key: 'archive_reason' },
];

const WorkExperienceView = () => (
  <FunctionalTable
    columns={columns}
    dataSource={dataSource}
  />
);

export default WorkExperienceView;
