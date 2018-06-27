// @flow
import React from 'react';
import FunctionalTable from '../FunctionalTable';

const dataSource = [
  {
    key: '1',
    id: 'a',
    company: 'Droi',
    job_title: '資深工程師',
    salary_type: '月薪',
    salary_amount: 66000,
    expected_hourly_wage: 275,
    estimated_hourly_wage: 275,
    weekly_wage: 16500,
    job_type: '?',
    archive_status: 'archived',
    archive_reason: 'You cant see me',
  },
  {
    key: '2',
    id: 'b',
    company: '同光',
    job_title: '小組長',
    salary_type: '月薪',
    salary_amount: 0,
    expected_hourly_wage: 0,
    estimated_hourly_wage: 0,
    weekly_wage: 0,
    job_type: '?',
    archive_status: 'unarchived',
    archive_reason: 'You can see me',
  },
];

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '公司', dataIndex: 'company', key: 'company' },
  { title: '職稱', dataIndex: 'job_title', key: 'job_title' },
  { title: '薪資種類', dataIndex: 'salary_type', key: 'salary_type' },
  { title: '薪資金額', dataIndex: 'salary_amount', key: 'salary_amount', sortable: true },
  { title: '工作日表訂工時', dataIndex: 'expected_hourly_wage', key: 'expected_hourly_wage', sortable: true },
  { title: '實際平均工時', dataIndex: 'estimated_hourly_wage', key: 'estimated_hourly_wage', sortable: true },
  { title: '一週總工時', dataIndex: 'weekly_wage', key: 'weekly_wage', sortable: true },
  { title: '職務型態', dataIndex: 'job_type', key: 'job_type' },
  { title: '封存狀態', dataIndex: 'archive_status', key: 'archive_status' },
  { title: '封存理由', dataIndex: 'archive_reason', key: 'archive_reason' },
];

const TimeAndSalaryView = () => (
  <FunctionalTable
    columns={columns}
    dataSource={dataSource}
  />
);

export default TimeAndSalaryView;
