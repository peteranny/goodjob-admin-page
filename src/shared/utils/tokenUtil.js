// @flow
import type { Token } from '../types/authTypes';

import { TOKEN_KEY } from '../constants';

type SetToken = (token: Token) => void;
export const setToken: SetToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

type GetToken = () => Token | null;
export const getToken: GetToken = () => localStorage.getItem(TOKEN_KEY) || null;

type RemoveToken = () => void;
export const removeToken: RemoveToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
