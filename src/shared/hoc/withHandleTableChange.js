import { withHandlers, type HOC } from 'recompose';

const withHandleTableChange: HOC<*, Props> = withHandlers({
  handleTableChange: ({ setPage }) => nextPagination => {
    setPage(nextPagination.current);
  }
});

export default withHandleTableChange;
