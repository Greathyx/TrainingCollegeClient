import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import styles from './css/TraineeChooseCourseWithClassPage.css';

const data = [{
  key: '1',
  institution_name: '你',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  institution_name: '你',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  institution_name: '他',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  institution_name: '他',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

class TestPage extends React.Component {
  state = {
    filterDropdownVisible: false,
    data,
    searchText: '',
    filtered: false,
  };
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: data.map((record) => {
        const match = record.institution_name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          institution_name: (
            <span>
              {record.institution_name.split(reg).map((text, i) => (
                i > 0 ? [<span className={styles.highlight}>{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'institution_name',
      key: 'institution_name',
      filterDropdown: (
        <div className={styles.custom_filter_dropdown}>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [{
        text: 'London',
        value: 'London',
      }, {
        text: 'New York',
        value: 'New York',
      }],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    }];
    return <Table columns={columns} dataSource={this.state.data} />;
  }
}

export default TestPage;
