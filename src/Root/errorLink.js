// @flow
import { onError } from 'apollo-link-error';

import { getLoginStatusGQL } from '../graphql/loginStatus';

import { LOGIN_STATUS } from '../shared/constants';

const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
    // ignore graphql errors w(though type is invalid, but render anyway )
    response.errors = null;
  }

  if (networkError) {
    const { cache } = operation.getContext();

    if (networkError.statusCode === 403) {
      cache.writeQuery({
        query: getLoginStatusGQL,
        data: { loginStatus: LOGIN_STATUS.LOGIN_FAIL }
      });
    }
    console.error(`[Network error]: ${networkError}`);
  }
  return null;
});

export default errorLink;
