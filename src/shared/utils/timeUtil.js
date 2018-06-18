// @flow
import {
  compose,
  split,
} from 'ramda';

import type Moment from 'moment';
import moment from 'moment';

export const timeStrToSec: string => number = compose(
  a => (Number(a[0]) * 60 * 60) + ((Number(a[1]) * 60) + Number(a[2])),
  split(':'),
);


export const getYesterday = (): Moment => moment().subtract(1, 'days');

export const getUTCYesterday = (): number => moment().subtract(1, 'days').valueOf();

export const timeInvalid = (t: moment): boolean => !moment(t).isValid();

export const utcToDate = (utcTime: number): Moment => moment(utcTime);

export const momentToMilliTS = (momentDate: Moment): number => moment(momentDate).valueOf();

export const momentToSecondTS = (momentDate: Moment): number => moment(momentDate).unix();
