// @flow
import gql from 'graphql-tag';

export const getWorkExpQL = gql`
  query GetWorkExpQL($queryExp: QueryExperiencesInput!) {
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
          is_archived
          reason
        }
        sections {
          id
          subtitle
          content
        }
        created_at
      }
    }
  }
`;

export const updateWorkExpQL = gql`
  mutation UpdateExperiencesQL($mutationExp: UpdateExperiencesInput!) {
    update_experiences(input: $mutationExp) {
      experiences {
        _id
        archive {
          is_archived
          reason
        }
      }
    }
  }
`;
