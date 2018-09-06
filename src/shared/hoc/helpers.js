// @flow
import { branch, renderNothing } from 'recompose';

export const hideIf = (logicFunc: () => boolean) => branch(logicFunc, renderNothing);
