// @flow
import { withHandlers, type HOC } from 'recompose';
import { isEmpty } from 'ramda';

import { type OrderBy } from '../constants';
import type { ExperienceType } from '../types/experienceType';

type Props = {
  setPage: number => void,
  setSortObj: ({
    sortField: string,
    orderBy: OrderBy
  }) => void,
  page: number,
  pageSize: number,
  searchObj: {
    columnKey: string,
    value: string
  },
  sortObj: {
    sortField: string,
    orderBy: OrderBy
  },
  setSearchObj: ({
    columnKey: string,
    value: string
  }) => void,
  expData: Array<ExperienceType>
};

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
