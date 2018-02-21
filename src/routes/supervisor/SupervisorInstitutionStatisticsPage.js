import React from 'react';
import {connect} from 'dva';
import {Table, Tooltip, Input, Icon, Button} from 'antd';
import styles from '../css/TraineeChooseCourseWithClassPage.css';


class SupervisorInstitutionStatisticsPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    this.props.dispatch({
      type: 'supervisor/getInstitutionStatistics',
      payload: {},
    }).then(() => {
      this.setState({
        data: this.props.supervisor.institution_statistics
      });
    });
  }

  state = {
    filterDropdownVisible: false,
    data: [],
    searchText: '',
    filtered: false,
  };

  onInputChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  // 按名字搜索
  onSearch = () => {
    const {searchText} = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.props.supervisor.institution_statistics.map((record) => {
        const match = record.institutionName.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          institutionName: (
            <span>
              {record.institutionName.split(reg).map((text, i) => (
                i > 0 ? [<span key={record.key} className={styles.highlight}>{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };

  render() {
    const columns = [{
      title: '机构名称',
      dataIndex: 'institutionName',
      filterDropdown: (
        <div className={styles.custom_filter_dropdown}>
          <Tooltip title="清空搜索内容再按搜索键，可显示全部机构列表">
            <Icon type="exclamation-circle-o" style={{marginRight: 8}}/>
          </Tooltip>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="搜索机构名称"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>搜索</Button>
        </div>
      ),
      filterIcon: <Icon type="smile-o" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    }, {
      title: '总盈利(¥)',
      dataIndex: 'total_earning',
      sorter: (a, b) => a.total_earning - b.total_earning,
    }, {
      title: '本年盈利(¥)',
      dataIndex: 'this_year_earning',
      sorter: (a, b) => a.this_year_earning - b.this_year_earning,
    }, {
      title: '总课程数',
      dataIndex: 'total_course_amount',
      sorter: (a, b) => a.total_course_amount - b.total_course_amount,
    }, {
      title: '本年订课数',
      dataIndex: 'this_year_paid_amount',
      sorter: (a, b) => a.this_year_paid_amount - b.this_year_paid_amount,
    }, {
      title: '本年退课数',
      dataIndex: 'this_year_unsubscribe_amount',
      sorter: (a, b) => a.this_year_unsubscribe_amount - b.this_year_unsubscribe_amount,
    }];

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 10}}
          columns={columns}
          dataSource={this.state.data}
        />
      </div>
    )
  }
}

function mapStateToProps({supervisor}) {
  return {
    supervisor,
  };
}

export default connect(mapStateToProps)(SupervisorInstitutionStatisticsPage);
