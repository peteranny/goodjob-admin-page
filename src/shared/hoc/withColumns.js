// @flow
import { withState, withHandlers, lifecycle, compose, type HOC } from 'recompose';

export type Column = {
  title: string,
  dataIndex: string,
  key: string,
  searchable?: boolean,
  showSearchValue?: string,
  filterVisible?: boolean,
  sortable?: boolean,
  width?: string
};

type Props = {
  _columns: Array<Column>,
  columns: Array<Column>,
  setColumns: (columns: Array<Column>) => void
};

const withColumns: HOC<*, Props> = compose(
  withState('columns', 'setColumns', []),
  withHandlers({
    changeColumnSearchValue: props => (e: Event) => columnKey => {
      const { columns, setColumns } = props;

      const updatedColumns = columns.map(column => {
        if (column.searchable && column.key !== columnKey) {
          return {
            ...column,
            showSearchValue: ''
          };
        } else if (column.key === columnKey) {
          return {
            ...column,
            showSearchValue: (e.target: window.HTMLInputElement).value
          };
        }

        return column;
      });

      setColumns(updatedColumns);
    },
    toggleFilterVisible: props => columnKey => {
      const { columns, setColumns } = props;

      const targetColumn = columns.filter(column => column.key === columnKey)[0];
      const { filterVisible } = targetColumn;
      const updatedColumns = columns.map(column => {
        if (column.key === columnKey) {
          return {
            ...column,
            filterVisible: !filterVisible
          };
        }

        return column;
      });

      setColumns(updatedColumns);
    }
  }),
  lifecycle({
    componentDidMount() {
      const { _columns, setColumns } = this.props;

      const columnWithWidthSetting = {
        id: '250px',
        company: '200px'
      };
      const _columnsWithWidth = _columns.map(column => {
        if (column.key in columnWithWidthSetting) {
          return Object.assign({}, column, { width: columnWithWidthSetting[column.key] });
        }

        return column;
      });

      setColumns(_columnsWithWidth);
    }
  })
);

export default withColumns;
