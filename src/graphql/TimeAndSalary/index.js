// @flow
import gql from 'graphql-tag';

export const getTimeSalaryQL = gql`
  query GetTimeSalaryQL($queryExp: QueryWorkingsIput!) {
    workings(input: $queryExp) {
      total
      data {
        _id
        company {
          name
        }
        job_title
        salary {
          type
          amount
        }
        estimated_hourly_wage
        week_work_time
        archive {
          is_archive
          reason
        }
      }
    }
  }
`;
