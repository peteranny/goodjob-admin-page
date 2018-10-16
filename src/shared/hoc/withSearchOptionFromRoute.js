// @flow
import { compose, withHandlers, withProps, type HOC } from 'recompose';
import { withRouter, type Location, type RouterHistory } from 'react-router-dom';

import * as R from 'ramda';
import qs from 'qs';

type Props = {
  location: Location,
  history: RouterHistory
};

const locationToQuery = R.compose(
  qs.parse,
  search => {
    if (search[0] === '?') {
      return R.tail(search);
    }
    return search;
  },
  R.prop('search')
);

const withSearchOptionFromRoute: HOC<*, Props> = compose(
  withRouter,
  withProps(({ location }) => {
    let { columnKey, value } = locationToQuery(location);
    if (typeof columnKey === 'undefined' || columnKey === '') {
      columnKey = 'COMPANY';
    }
    if (typeof value === 'undefined') {
      value = '';
    }
    return { searchObj: { columnKey, value } };
  }),
  withHandlers({
    submitSearchObj: ({ history, location }) => (columnKey, submitValue) => {
      history.push({
        search: qs.stringify({
          ...locationToQuery(location),
          columnKey,
          value: submitValue
        })
      });
    }
  })
);

export default withSearchOptionFromRoute;
