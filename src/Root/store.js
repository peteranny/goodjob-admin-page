// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import reducers from '../reducers';
import {
  DEVELOPMENT,
  NODE_ENV,
} from '../shared/constants';

import history from './history';

const routerMiddelware = routerMiddleware(history);

const isDevelopment = NODE_ENV === DEVELOPMENT;

let store = null; // eslint-disable-line import/no-mutable-exports

if (isDevelopment) {
  store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(
        routerMiddelware,
        thunk,
      ),
    ),
  );
} else {
  store = createStore(
    reducers,
    compose(
      applyMiddleware(
        routerMiddelware,
        thunk,
      ),
    ),
  );
}

export default store;
