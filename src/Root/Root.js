// @flow
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { I18nextProvider } from 'react-i18next';
import { Router } from 'react-router-dom';

import i18nInstance from './i18next';

import AppRoute from '../AppRoute';

import history from './history';
import graphqlClient from './graphqlClient';

const Root = () => (
  <ApolloProvider client={graphqlClient}>
    <I18nextProvider i18n={i18nInstance}>
      <Router history={history}>
        <AppRoute />
      </Router>
    </I18nextProvider>
  </ApolloProvider>
);

export default Root;
