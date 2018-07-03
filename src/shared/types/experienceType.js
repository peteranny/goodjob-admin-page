// @flow
import type {
  Company,
  Salary,
  Archive,
} from './commonType';


export type ExperienceType = {
  _id: string,
  __typename: string,
  company: Company,
  jobTitle: string,
  title: string,
  regeion: string,
  archive: Archive,
  salary: Salary,
};

