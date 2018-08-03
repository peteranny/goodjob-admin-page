// @flow
import gql from 'graphql-tag';

export const getInterviewExpQL = gql`
  query GetInterviewExpQL($queryExp: QueryExperiencesIput!) {
    interview_experiences(input: $queryExp) {
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
