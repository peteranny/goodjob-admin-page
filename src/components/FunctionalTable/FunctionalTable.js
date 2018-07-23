// @flow
import * as R from 'ramda';
import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import { compose, withState, withHandlers } from 'recompose';

import EditModal from './EditModal';
import styles from './FunctionalTable.m.css';

type Data = {[string]:any}

type Column = {
  title: string,
  dataIndex: string,
  key: string,
  searchable?: boolean,
  showSearchValue?: string,
  filterVisible?: boolean,
  sortable?: boolean,
  width?: string,
}

type Props = {
  dataSource: Array<Data>,
  columns: Array<Column>,
  changeColumnSearchValue?: (e: Event) => (key: string) => any,
  setFilterVisible?: (columnKey: string, filterVisible: boolean) => any,
  submitSearchObj?: (columnKey: string, submitValue: ?string) => any,

  isEditModalVisible: boolean,
  setEditModalVisible: boolean => void,
  handleOk: () => void,
  handleCancel: () => void,

  form: Data,
  setForm: (form: Data) => void,
  setFormField: (field: string) => (e: Event) => void,
  displayedFormFields: Array<string>,
}

type State = {
  selectedRowKeys: Array<string>
}

class FunctionalTable extends React.Component<Props, State> {
  state = {
    selectedRowKeys: [],
  }

  onSelectChange = (selectedRowKeys: Array<string>) => {
    this.setState({ selectedRowKeys });
  }

  makeColumnsSearchable = (columns: Array<Column>): Array<any> => columns.map((curColumn) => {
    const {
      changeColumnSearchValue,
      setFilterVisible,
      submitSearchObj,
    } = this.props;

    if (curColumn.searchable) {
      const {
        key,
        title,
        filterVisible,
      } = curColumn;

      return {
        ...curColumn,
        filterDropdown: (
          <div className={styles['custom-filter-dropdown']}>
            <Input
              placeholder={`Search ${title}`}
              value={curColumn.showSearchValue}
              onChange={(e) => {
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
        filterIcon: <Icon type="filter" style={{ color: curColumn.showSearchValue ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible: filterVisible,
        onFilterDropdownVisibleChange: (filterDropdownVisible: boolean) => {
          if (setFilterVisible) {
            setFilterVisible(key, filterDropdownVisible);
          }
        },
      };
    }

    return curColumn;
  })

  makeColumnsSortable = (columns: Array<Column>) => (columns.map(column => (column.sortable ? ({
    ...column,
    sorter: (dataRowA, dataRowB) => dataRowB[column.dataIndex] - dataRowA[column.dataIndex],
  }) : column)): Array<Column>)

  appendActionColumn = columns => [
    ...columns,
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: record => (
        <Button
          onClick={() => {
            this.props.setForm(record);
            this.props.setEditModalVisible(true);
          }}
        >
          <Icon type="edit" />Edit
        </Button>
      ),
    },
  ]

  processColumns = R.pipe(
    this.makeColumnsSearchable,
    this.makeColumnsSortable,
    this.appendActionColumn,
  )

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const {
      dataSource,

      isEditModalVisible,
      handleOk,
      handleCancel,

      form,
      setFormField,
      displayedFormFields,
    } = this.props;

    return (
      <React.Fragment>
        <EditModal
          title="Edit"
          visible={isEditModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          form={form}
          setFormField={setFormField}
          displayedFields={displayedFormFields}
        />
        <Table
          rowSelection={rowSelection}
          dataSource={dataSource}
          columns={this.processColumns(this.props.columns)}
          scroll={{ x: 1300 }}
        />
      </React.Fragment>
    );
  }
}

const withForm = compose(
  withState('form', 'setForm', {}),
  withHandlers({
    setFormField: ({ form, setForm }) => field => (value) => {
      setForm({
        ...form,
        [field]: value,
      });
    },
  }),
);

const withEditModal = compose(
  withState('isEditModalVisible', 'setEditModalVisible', false),
  withHandlers({
    handleOk: ({ form, setEditModalVisible }) => () => {
      console.info(form);
      setEditModalVisible(false);
    },
    handleCancel: ({ setEditModalVisible }) => () => {
      setEditModalVisible(false);
    },
  }),
);

const enhance = compose(
  withForm,
  withEditModal,
);

export default enhance(FunctionalTable);
