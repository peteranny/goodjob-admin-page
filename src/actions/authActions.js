import {
  // SET_TOKEN,
  // SET_PROFILE,
  SET_TRY_TO_LOAD_TOKEN,
  LOG_OUT_CALLBACK,
  LOG_IN_CALLBACK,
  SET_LOGIN_STATUS,
} from './types';

import {
  setToken as setTokenToStorage,
  getToken as getTokenFromStorage,
  removeToken as removeTokenStorage,
} from '../shared/utils/tokenUtil';

import withTokenAction from '../shared/hof/withTokenAction';

import type {
  Profile,
  Token,
  LoginStatus,
} from '../shared/types/authTypes';

import {
  postLogin,
  getUserSelf,
  patchResetPwd,
  postLogout,
} from '../apis/userApi';

import {
  LOGIN_STATUS,
} from '../shared/constants';

export type SetToken = (token: Token) => {
  type: string,
  payload: Token,
};
// const setToken: SetToken = token => ({
//   type: SET_TOKEN,
//   payload: token,
// });

export type SetProfile = (profile: Profile) => {
  type: string,
  payload: Profile,
}
// const setProfile: SetProfile = profile => ({
//   type: SET_PROFILE,
//   payload: profile,
// });

type SetLoginStatus = (loginStatus: LoginStatus) => {
  type: string,
  payload: LoginStatus,
}
const setLoginStatus: SetLoginStatus = loginStatus => ({
  type: SET_LOGIN_STATUS,
  payload: loginStatus,
});


type SetTryToLoadToken = (tryToLoadToken: boolean) => {
  type: string,
  payload: boolean,
}
const setTryToLoadToken: SetTryToLoadToken = tryToLoadToken => ({
  type: SET_TRY_TO_LOAD_TOKEN,
  payload: tryToLoadToken,
});

type LoginCallback = (token: Token, profile: Profile) => ({
  type: string,
  payload: {
    token: Token,
    profile: Profile,
  },
})
const loginCallback: LoginCallback = (token, profile) => ({
  type: LOG_IN_CALLBACK,
  payload: {
    token,
    profile,
  },
});


type Login = (account: string, password: string) => ({} => mixed) =>
  Promise<*>
export const login: Login = (account, password) => dispatch =>
  postLogin({
    account,
    password,
  })
    .then((resp) => {
      const {
        token,
        userInfo,
      }: {
        token: string,
        userInfo: Profile,
      } = resp.responseData;
      dispatch(loginCallback(token, userInfo));
      return token;
    })
    .then(setTokenToStorage)
    .catch((e) => {
      dispatch(setLoginStatus(LOGIN_STATUS.LOGIN_FAIL));
      throw e;
    });

type LoadToken = () => ({} => mixed) => Promise<*>
export const loadToken: LoadToken = () => (dispatch) => {
  const token = getTokenFromStorage();
  if (token) {
    return getUserSelf(token)
      .then(r => r.responseData)
      .then(profile => dispatch(loginCallback(token, profile)))
      .then(() => dispatch(setTryToLoadToken(true)))
      .catch((e) => {
        removeTokenStorage();
        dispatch(setTryToLoadToken(true));
        throw e;
      });
  }
  removeTokenStorage();
  dispatch(setTryToLoadToken(true));
  return Promise.reject(new Error('Token not exist'));
};

type ResetPwd = (account: string, legacyPassword: string, newPassword: string) =>
  (dispatch: {} => mixed, getState: any, token: Token) => Promise<*>
export const resetPwd: ResetPwd = withTokenAction(
  (account, legacyPassword, newPassword) =>
    (dispatch, getState, token) =>
      patchResetPwd(
        token,
        {
          account,
          password: newPassword,
          old_pwd: legacyPassword,
        },
      ),
);

type LogOutCallback = () => {
  type: string,
}

const logOutCallback: LogOutCallback = () => ({
  type: LOG_OUT_CALLBACK,
});

type LogOut = (userId: string) =>
  (dispatch: {} => mixed, getState: any, token: Token) => Promise<*>

export const logOut: LogOut = withTokenAction(
  userId =>
    (dispatch, getState, token) =>
      postLogout(token, userId)
        .then(() => dispatch(logOutCallback()))
        .then(removeTokenStorage),
);
