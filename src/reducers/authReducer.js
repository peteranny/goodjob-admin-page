// @flow
import {
  SET_TOKEN,
  SET_PROFILE,
  SET_TRY_TO_LOAD_TOKEN,
  LOG_OUT_CALLBACK,
  LOG_IN_CALLBACK,
} from '../actions/types';

import type {
  SetToken,
  SetProfile,
} from '../actions/authActions';

import type {
  Profile,
  Token,
  LoginStatus,
} from '../shared/types/authTypes';

import {
  LOGIN_STATUS,
} from '../shared/constants';

export type State = {
  +token: ?Token,
  +profile: ?Profile,
  +tryToLoadToken: boolean,
  +loginStatus: LoginStatus
};

type Action = SetToken
  | SetProfile;

const initialState = {
  token: null,
  profile: null,
  tryToLoadToken: false,
  loginStatus: LOGIN_STATUS.NOT_LOGIN,
};

type Auth = (State, Action) => State;

const auth: Auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_TRY_TO_LOAD_TOKEN:
      return {
        ...state,
        tryToLoadToken: action.payload,
      };
    case LOG_IN_CALLBACK:
      return {
        ...state,
        token: action.payload.token,
        profile: action.payload.profile,
        loginStatus: LOGIN_STATUS.LOGIN_SUCCESS,
      };
    case LOG_OUT_CALLBACK:
      return {
        ...state,
        tryToLoadToken: true,
        loginStatus: LOGIN_STATUS.NOT_LOGIN,
      };
    default:
      return state;
  }
};

export default auth;
