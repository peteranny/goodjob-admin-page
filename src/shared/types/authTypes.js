// @flow
export type Profile = {
  updateTime: number,
  lastName: string,
  id: string,
  firstName: string,
  roleId: number,
  pricingPlan: string,
  createTime: number,
  expireTime: null | number,
  nickname: string,
  email: string
};

export type Token = string;

export type LoginStatus = 'NOT_LOGIN' | 'LOGIN_SUCCESS' | 'LOGIN_FAIL';
