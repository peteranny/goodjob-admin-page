// @flow
import React from 'react';
import { Input, Button, Icon } from 'antd';
import { withProps, type HOC, withState, compose, lifecycle } from 'recompose';
import { equals } from 'ramda';

import styles from './withColumnsEnhanced.m.css';

export type Column = {
  title: string,
  dataIndex: string,
  key: string,
  searchable?: boolean,
  sortable?: boolean,
  width?: string
};

type SearchableColumnProps = {
  _columns: Array<Column>,
  searchObj: { columnKey: string, value: string },
  submitSearchObj: (columnKey: string, submitValue?: string) => void
};

export const withColumnsSearchable: HOC<*, SearchableColumnProps> = compose(
  withState('searchInputObj', 'setSearchInputObj', ({ searchObj }) => ({
    key: searchObj.columnKey,
    value: searchObj.value
  })),
  withState('filterVisibleColumnKey', 'setFilterVisibleColumnKey', null),
  withProps(
    ({
      _columns,
      submitSearchObj,
      filterVisibleColumnKey,
      setFilterVisibleColumnKey,
      searchInputObj,
      setSearchInputObj
    }) => ({
      columns: _columns.map(column => {
        if (column.searchable) {
          const { key, title } = column;
          const { key: searchInputKey, value: searchInputValue } = searchInputObj;
          const showSearchValue = searchInputKey === column.key ? searchInputValue : null;

          const filterVisible = filterVisibleColumnKey === key;

          return {
            ...column,
            filterDropdown: (
              <div className={styles['custom-filter-dropdown']}>
                <Input
                  placeholder={`Search ${title}`}
                  value={showSearchValue}
                  onChange={e =>
                    setSearchInputObj({
                      key,
                      value: e.target.value
                    })
                  }
                  onPressEnter={() => {
                    if (submitSearchObj) {
                      submitSearchObj(key, showSearchValue);
                      setFilterVisibleColumnKey(null);
                    }
                  }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    if (submitSearchObj) {
                      submitSearchObj(key, showSearchValue);
                      setFilterVisibleColumnKey(null);
                    }
                  }}
                >
                  Search
                </Button>
              </div>
            ),
            filterIcon: (
              <Icon type="filter" style={{ color: showSearchValue ? '#108ee9' : '#aaa' }} />
            ),
            filterDropdownVisible: filterVisible,
            onFilterDropdownVisibleChange: (isVisible: boolean) =>
              setFilterVisibleColumnKey(isVisible ? key : null)
          };
        }

        return column;
      })
    })
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { setSearchInputObj, searchObj } = this.props;
      const { searchObj: prevSearchObj } = prevProps;

      if (!equals(prevSearchObj, searchObj)) {
        setSearchInputObj({
          key: searchObj.columnKey,
          value: searchObj.value
        });
      }
    }
  })
);

export const withColumnsSortable = withProps(({ columns }) => ({
  columns: columns.map(column => {
    if (column.sortable) {
      return {
        ...column,
        sorter: (dataRowA, dataRowB) => dataRowB[column.dataIndex] - dataRowA[column.dataIndex]
      };
    }

    return column;
  })
}));

export const withActionColumnAppended = withProps(({ columns, setForm, setEditModalVisible }) => ({
  columns: [
    ...columns,
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: record => (
        <Button
          onClick={() => {
            setForm(record);
            setEditModalVisible(true);
          }}
        >
          <Icon type="edit" />
          Edit
        </Button>
      )
    }
  ]
}));
