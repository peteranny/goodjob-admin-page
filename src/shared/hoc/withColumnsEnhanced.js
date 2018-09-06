// @flow
import React from 'react';
import { Input, Button, Icon } from 'antd';
import { withProps, type HOC } from 'recompose';

import { type Column } from './withColumns';
import styles from './withColumnsEnhanced.m.css';

type SearchableColumnProps = {
  columns: Array<Column>,
  changeColumnSearchValue: (e: Event) => (columnKey: string) => void,
  toggleFilterVisible: (columnKey: string) => void,
  submitSearchObj: (columnKey: string, submitValue?: string) => void
};

export const withColumnsSearchable: HOC<*, SearchableColumnProps> = withProps(
  ({ columns, changeColumnSearchValue, toggleFilterVisible, submitSearchObj }) => ({
    columns: columns.map(curColumn => {
      if (curColumn.searchable) {
        const { key, title, filterVisible } = curColumn;

        return {
          ...curColumn,
          filterDropdown: (
            <div className={styles['custom-filter-dropdown']}>
              <Input
                placeholder={`Search ${title}`}
                value={curColumn.showSearchValue}
                onChange={e => {
                  if (changeColumnSearchValue) {
                    changeColumnSearchValue(e)(key);
                  }
                }}
                onPressEnter={() => {
                  if (submitSearchObj) {
                    submitSearchObj(key, curColumn.showSearchValue);
                  }
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  if (submitSearchObj) {
                    submitSearchObj(key, curColumn.showSearchValue);
                  }
                }}
              >
                Search
              </Button>
            </div>
          ),
          filterIcon: (
            <Icon type="filter" style={{ color: curColumn.showSearchValue ? '#108ee9' : '#aaa' }} />
          ),
          filterDropdownVisible: filterVisible,
          onFilterDropdownVisibleChange: () => {
            if (toggleFilterVisible) {
              toggleFilterVisible(key);
            }
          }
        };
      }

      return curColumn;
    })
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
