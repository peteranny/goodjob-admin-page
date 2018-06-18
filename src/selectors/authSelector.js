// @flow
import {
  prop,
  compose,
} from 'ramda';

import type {
  AllState,
} from '../reducers';

import type {
  Profile,
  Token,
  LoginStatus,
} from '../shared/types/authTypes';

const fromAuth: AllState => any = prop('auth');

type GetToken = AllState => Token;
export const getToken: GetToken = compose(
  prop('token'),
  fromAuth,
);

type GetProfile = AllState => Profile;
export const getProfile: GetProfile = compose(
  prop('profile'),
  fromAuth,
);

type GetUserId = AllState => $PropertyType <Profile, 'id'>
export const getUserId: GetUserId = compose(
  prop('id'),
  getProfile,
);

type GetTryToLoadToken = AllState => boolean;
export const getTryToLoadToken: GetTryToLoadToken = compose(
  prop('tryToLoadToken'),
  fromAuth,
);

type GetLoginStatus = AllState => LoginStatus;
export const getLoginStatus: GetLoginStatus = compose(
  prop('loginStatus'),
  fromAuth,
);
