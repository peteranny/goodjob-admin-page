import createHistory from 'history/createBrowserHistory';
import qhistory from 'qhistory';
import { parse, stringify } from 'qs';
import { BASENAME } from '../shared/constants';

const history = qhistory(
  createHistory({
    basename: BASENAME
  }),
  stringify,
  parse
);

export default history;
