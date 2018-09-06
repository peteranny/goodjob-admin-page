// @flow
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

import defaults from '../graphql/defaultState';
import resolvers from '../graphql/resolvers';

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST || '';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults
});

const uri = `${REACT_APP_API_HOST}/graphql`;

const httpLink = new HttpLink({
  uri
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink])
});

export default client;
