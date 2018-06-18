// @flow
import * as R from 'ramda';
import React from 'react';
import { Table, Input, Button, Icon } from 'antd';

import styles from './App.m.css';

type Data = {[string]:any}

type Column = {
  title: string,
  dataIndex: string,
  key: string,
  sortable?: boolean,
}

type Props = {
  dataSource: Array<Data>,
  columns: Array<Column>,
}

type State = {
  searchId: string,
  filtered: boolean,
  filterDropdownVisible: boolean,
  displayedData: Array<Data>,
  selectedRowKeys: Array<string>
}

class FunctionalTable extends React.Component<Props, State> {
  state = {
    searchId: '',
    filtered: false,
    filterDropdownVisible: false,
    displayedData: this.props.dataSource,
    selectedRowKeys: [],
  }

  onIdSearch = () => {
    const { searchId } = this.state;
    const reg = new RegExp(searchId, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchId,
      displayedData: this.props.dataSource.filter(dataRow => dataRow.id.match(reg)),
    });
  }

  onSelectChange = (selectedRowKeys: Array<string>) => {
    this.setState({ selectedRowKeys });
  }

  onIdInputChange = (e: Event) => {
    this.setState({
      searchId: (e.target: window.HTMLInputElement).value,
    });
  }

  onIdSearch = () => {
    const { searchId } = this.state;
    const reg = new RegExp(searchId, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchId,
      displayedData: this.props.dataSource.filter(dataRow => dataRow.id.match(reg)),
    });
  }

  searchInput: ?HTMLInputElement;

  makeIdColumnSearchable = ([idColumn, ...restColumns]: Array<Column>) => [
    {
      ...idColumn,
      filterDropdown: (
        <div className={styles['custom-filter-dropdown']}>
          <Input
            ref={(ele) => { this.searchInput = ele; }}
            placeholder="Search ID"
            value={this.state.searchId}
            onChange={this.onIdInputChange}
            onPressEnter={this.onIdSearch}
          />
          <Button type="primary" onClick={this.onIdSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (filterDropdownVisible: boolean) => {
        this.setState(
          { filterDropdownVisible },
          () => { this.searchInput && this.searchInput.focus(); },
        );
      },
    },
    ...restColumns,
  ]

  makeColumnsSortable = (columns: Array<Column>) => (columns.map(column => (column.sortable ? ({
    ...column,
    sorter: (dataRowA, dataRowB) => dataRowB[column.dataIndex] - dataRowA[column.dataIndex],
  }) : column)): Array<Column>)

  processColumns = R.pipe(
    this.makeIdColumnSearchable,
    this.makeColumnsSortable,
  )

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Table
        rowSelection={rowSelection}
        dataSource={this.state.displayedData}
        columns={this.processColumns(this.props.columns)}
        scroll={{ x: 1300 }}
      />
    );
  }
}

export default FunctionalTable;
