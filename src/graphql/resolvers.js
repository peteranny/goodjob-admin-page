// @flow
import { type ApolloClient } from 'apollo-client';
import { getLoginStatusGQL } from '../graphql/loginStatus';
import { type LoginStatus } from '../shared/constants';

type ChangeLoginStatus = (_: any, { loginStatus: LoginStatus }, ApolloClient<*>) => null;

const changeLoginStatus: ChangeLoginStatus = (_, { loginStatus }, { cache }) => {
  cache.writeQuery({
    query: getLoginStatusGQL,
    data: { loginStatus }
  });

  return null;
};

const resolvers = {
  Mutation: {
    changeLoginStatus
  }
};

export default resolvers;
