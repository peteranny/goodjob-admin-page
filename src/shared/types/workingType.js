// @flow
import type { Company, Salary, Archive } from './commonType';

export type Working = {
  _id: string,
  __typename: string,
  company: Company,
  sector: string,
  salary: Salary,
  weekWorkTime: number,
  estimatedHourlyWage: number,
  archive: Archive
};
