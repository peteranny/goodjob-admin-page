// @flow
import gql from 'graphql-tag';

export const getWorkExpQL = gql`
  query GetWorkExpQL($queryExp: QueryExperiencesIput!) {
    work_experiences(input: $queryExp) {
      total
      data {
        _id
        company {
          name
        }
        job_title
        type
        title
        region
        archive {
          is_archive
          reason
        }
      }
    }
  }
`;
