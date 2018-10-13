// @flow
import { LOGIN_STATUS, type LoginStatus } from '../shared/constants';

type DefaultState = {
  loginStatus: LoginStatus
};

const defaultState: DefaultState = {
  loginStatus: LOGIN_STATUS.NOT_LOGIN
};

export default defaultState;
