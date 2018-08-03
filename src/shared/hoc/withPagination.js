// @flow
import {
  defaultProps,
  withState,
  withHandlers,
  compose,
  type HOC,
} from 'recompose';

type Props = {
  pageSize?: number,
};

const withPagination: HOC<*, Props> = compose(
  defaultProps({
    pageSize: 10,
  }),
  withState('page', 'setPage', 1),
  withHandlers({
    handleTableChange: ({ setPage }) => (nextPagination) => {
      setPage(nextPagination.current);
    },
  }),
);

export default withPagination;
