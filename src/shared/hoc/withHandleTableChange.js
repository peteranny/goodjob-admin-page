import { withHandlers, type HOC } from 'recompose';
import { isEmpty } from 'ramda';

const withHandleTableChange: HOC<*, Props> = withHandlers({
  handleTableChange: ({ setPage, setSortObj }) => (nextPagination, _, nextSorter) => {
    setPage(nextPagination.current);

    if (!isEmpty(nextSorter)) {
      const { field, order } = nextSorter;
      setSortObj({
        sortField: field,
        orderBy: order
      });
    }
  }
});

export default withHandleTableChange;
