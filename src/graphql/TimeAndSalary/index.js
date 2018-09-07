// @flow
import gql from 'graphql-tag';

export const getTimeSalaryQL = gql`
  query GetTimeSalaryQL($queryExp: QueryWorkingsInput!) {
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
          is_archived
          reason
        }
      }
    }
  }
`;

export const updateTimeSalaryQL = gql`
  mutation UpdateTimeSalaryQL($mutationExp: UpdateWorkingsInput!) {
    update_workings(input: $mutationExp) {
      workings {
        _id
        archive {
          is_archived
          reason
        }
      }
    }
  }
`;
