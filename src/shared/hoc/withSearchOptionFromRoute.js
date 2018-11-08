// @flow
import { compose, withHandlers, withProps, type HOC } from 'recompose';
import { withRouter, type Location, type RouterHistory } from 'react-router-dom';

import qs from 'qs';

type Props = {
  location: Location,
  history: RouterHistory
};

const withSearchOptionFromRoute: HOC<*, Props> = compose(
  withRouter,
  withProps(({ location: { query } }) => {
    let { columnKey, value } = query;
    if (typeof columnKey === 'undefined' || columnKey === '') {
      columnKey = 'COMPANY';
    }
    if (typeof value === 'undefined') {
      value = '';
    }
    return { searchObj: { columnKey, value } };
  }),
  withHandlers({
    submitSearchObj: ({ history, location: { query } }) => (columnKey, submitValue) => {
      history.push({
        search: qs.stringify({
          ...query,
          columnKey,
          value: submitValue
        })
      });
    }
  })
);

export default withSearchOptionFromRoute;
