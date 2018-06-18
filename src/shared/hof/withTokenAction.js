// @flow
import {
  getToken,
} from '../../selectors/authSelector';

import type {
  Token,
} from '../types/authTypes';

type WithTokenAction = (
  func: (...args: any[]) => (dispatch: {} => mixed, getState: () => any, token: Token) => any
) => (...args: any[]) => (dispatch: {} => mixed, getState: () => any) => any
const withTokenAction: WithTokenAction = func => (...args) => (dispatch, getState) => {
  const token = getToken(getState());

  return func(...args)(dispatch, getState, token);
};

export default withTokenAction;
