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
    sortObj: { sortField: sortField || 'CREATED_AT', orderBy: orderBy || 'ASCENDING' }
  })),
  withHandlers({
    setSortObj: ({ history, location: { query } }) => ({
      sortField,
      orderBy
    }: {
      sortField: string,
      orderBy: string
    }) => {
      let nextOrderBy;
      switch (orderBy) {
        case 'ascend':
          nextOrderBy = 'ASCENDING';
          break;
        case 'descend':
          nextOrderBy = 'DESCENDING';
          break;
        default:
          nextOrderBy = '';
          break;
      }
      history.push({
        search: qs.stringify({
          ...query,
          sortField: sortField.toUpperCase(),
          orderBy: nextOrderBy
        })
      });
    }
  })
);

export default withSortOptionFromRoute;
