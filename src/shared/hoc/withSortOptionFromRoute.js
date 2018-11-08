// @flow
import { compose, withHandlers, withProps, type HOC } from 'recompose';
import { withRouter, type Location, type RouterHistory } from 'react-router-dom';

import qs from 'qs';

type Props = {
  location: Location,
  history: RouterHistory
};

const withSortOptionFromRoute: HOC<*, Props> = compose(
  withRouter,
  withProps(({ location: { query: { sortField, orderBy } } }) => ({
    sortObj: { sortField: sortField || '', orderBy: orderBy || '' }
  })),
  withHandlers({
    submitSortObj: ({ history, location: { query } }) => ({ sortField, orderBy }) => {
      history.push({ search: qs.stringify({ ...query, sortField, orderBy }) });
    }
  })
);

export default withSortOptionFromRoute;
