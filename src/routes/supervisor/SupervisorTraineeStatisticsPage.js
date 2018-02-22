import React from 'react';
import {connect} from 'dva';
import {Table, Tooltip, Input, Icon, Button} from 'antd';
import styles from '../css/TraineeChooseCourseWithClassPage.css';


class SupervisorTraineeStatisticsPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.supervisor.hasLoggedIn) {
      this.props.history.push("/SupervisorLogin");
    }
    this.props.dispatch({
      type: 'supervisor/getTraineeStatistics',
      payload: {},
    }).then(() => {
      this.setState({
        data: this.props.supervisor.trainee_statistics
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
      data: this.props.supervisor.trainee_statistics.map((record) => {
        const match = record.traineeName.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          traineeName: (
            <span>
              {record.traineeName.split(reg).map((text, i) => (
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
      title: '会员姓名',
      dataIndex: 'traineeName',
      fixed: 'left',
      width: 150,
      filterDropdown: (
        <div className={styles.custom_filter_dropdown}>
          <Tooltip title="清空搜索内容再按搜索键，可显示全部会员列表">
            <Icon type="exclamation-circle-o" style={{marginRight: 8}}/>
          </Tooltip>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="搜索会员姓名"
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
      title: '会员邮箱',
      dataIndex: 'email',
    }, {
      title: '总支出(¥)',
      dataIndex: 'total_expense',
      sorter: (a, b) => a.total_expense - b.total_expense,
    }, {
      title: '本年支出(¥)',
      dataIndex: 'this_year_expense',
      sorter: (a, b) => a.this_year_expense - b.this_year_expense,
    }, {
      title: '总订课程数',
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
    }, {
      title: '会员等级',
      dataIndex: 'level',
      sorter: (a, b) => a.level - b.level,
    }, {
      title: '会员积分',
      dataIndex: 'credit',
      sorter: (a, b) => a.credit - b.credit,
    }, {
      title: '会员状态',
      dataIndex: 'is_active',
    }];

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 10}}
          columns={columns}
          dataSource={this.state.data}
          scroll={{x: 1500}}
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

export default connect(mapStateToProps)(SupervisorTraineeStatisticsPage);
