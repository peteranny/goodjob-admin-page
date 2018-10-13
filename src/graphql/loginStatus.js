// @flow
import gql from 'graphql-tag';

export const getLoginStatusGQL = gql`
  query GetLoginStatus {
    loginStatus @client
  }
`;

export const changeLoginStatusGQL = gql`
  mutation ChangeLoginStatus($loginStatus: String) {
    changeLoginStatus(loginStatus: $loginStatus) @client
  }
`;
