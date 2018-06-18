// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  isNil,
  compose,
  prop,
  anyPass,
} from 'ramda';

import {
  compose as recompose,
} from 'recompose';

import {
  hideIf,
} from './helpers';

import {
  getToken,
} from '../../selectors/authSelector';

const testToken = compose(
  isNil,
  prop('token'),
);

const testList = [
  testToken,
];

const testContain = anyPass(testList);

const hideIfNotContain = hideIf(testContain);

const mapStateToProps = createStructuredSelector({
  token: getToken,
});

const connectToStore = connect(
  mapStateToProps,
);

const ensureToken = recompose(
  connectToStore,
  hideIfNotContain,
);

export default ensureToken;
