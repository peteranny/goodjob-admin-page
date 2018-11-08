// @flow
import { defaultProps, withState, compose, type HOC } from 'recompose';

type Props = {
  pageSize?: number
};

const withPagination: HOC<*, Props> = compose(
  defaultProps({
    pageSize: 10
  }),
  withState('page', 'setPage', 1)
);

export default withPagination;
