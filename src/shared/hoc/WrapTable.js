// @flow
import * as React from 'react';

import {
  withState,
  withHandlers,
  lifecycle,
  compose,
  type HOC,
} from 'recompose';

type Row = {
  title: string,
  dataIndex: string,
  key: string,
  searchable?: boolean,
  showSearchValue?: string,
  filterVisible?: boolean,
  sortable?: boolean,
  width?: string,
};

type Props = {
  _columns: Array<Row>,
  setSearchObj: ({
    columnKey: string,
    value: string,
  }) => any,
  renderProps: ({
    columns: Array<Row>,
    changeColumnSearchValue: (e: Event) => (key: string) => any,
    setFilterVisible: (columnKey: string, filterVisible: boolean) => any,
    submitSearchObj: (columnKey: string, submitValue: ?string) => any,
  }) => React.Node,
};

type PropsFromHOC = {
  columns: Array<Row>,
  changeColumnSearchValue: (e: Event) => (key: string) => any,
  setFilterVisible: (columnKey: string, filterVisible: boolean) => any,
  submitSearchObj: (columnKey: string, submitValue: ?string) => any,
};

const WrapTable = ({
  columns,
  changeColumnSearchValue,
  setFilterVisible,
  submitSearchObj,
  renderProps,
}: Props & PropsFromHOC) => (
  <React.Fragment>
    {
      renderProps({
        columns,
        changeColumnSearchValue,
        setFilterVisible,
        submitSearchObj,
      })
    }
  </React.Fragment>
);

const hoc: HOC<*, Props> = compose(
  withState('columns', 'setColumns', []),
  withHandlers({
    changeColumnSearchValue: props => (e: Event) => (columnKey) => {
      const {
        columns,
        setColumns,
      } = props;

      const updatedColumns = columns.map((column) => {
        if (column.searchable && column.key !== columnKey) {
          return {
            ...column,
            showSearchValue: '',
          };
        } else if (column.key === columnKey) {
          return {
            ...column,
            showSearchValue: (e.target: window.HTMLInputElement).value,
          };
        }

        return column;
      });

      setColumns(updatedColumns);
    },
    setFilterVisible: props => (columnKey) => {
      const {
        columns,
        setColumns,
      } = props;

      const targetColumn = columns.filter(column => column.key === columnKey)[0];
      const { filterVisible } = targetColumn;
      const updatedColumns = columns.map((column) => {
        if (column.key === columnKey) {
          return {
            ...column,
            filterVisible: !filterVisible,
          };
        }

        return column;
      });

      setColumns(updatedColumns);
    },
    submitSearchObj: props => (columnKey, submitValue) => {
      const searchObj = {
        columnKey,
        value: submitValue,
      };

      props.setSearchObj(searchObj);
    },
  }),
  lifecycle({
    componentDidMount() {
      const {
        _columns,
        setColumns,
      } = this.props;

      const columnWithWidthSetting = {
        id: '250px',
        company: '200px',
      };
      const _columnsWithWidth = _columns.map((column) => {
        if (column.key in columnWithWidthSetting) {
          return Object.assign({}, column, { width: columnWithWidthSetting[column.key] });
        }

        return column;
      });

      setColumns(_columnsWithWidth);
    },
  }),
);

export default hoc(WrapTable);
