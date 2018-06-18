// @flow
import bowser from 'bowser';
import {
  isNil,
  complement,
} from 'ramda';

const isNotNil : (any) => boolean = complement(isNil);

export const isIE = () => isNotNil(bowser.msie);
