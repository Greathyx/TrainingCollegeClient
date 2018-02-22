import React from 'react';
import {connect} from 'dva';
import {Table, Input, Button, Icon, Tooltip} from 'antd';
import styles from '../css/TraineeChooseCourseWithClassPage.css';


const types = [
  {text: '外语', value: '外语',},
  {text: '考研', value: '考研',},
  {text: '奥数', value: '奥数',},
  {text: '文学', value: '文学',},
  {text: '物化', value: '物化',},
  {text: '编程', value: '编程',},
  {text: '前端交互', value: '前端交互',},
  {text: '摄影', value: '摄影',},
  {text: '健身', value: '健身',},
  {text: '棋类', value: '棋类',},
  {text: '烹饪', value: '烹饪',},
];

class TraineeChooseCourseWithoutClassPage extends React.Component {

  state = {
    filterDropdownVisible: false,
    data: [],
    searchText: '',
    filtered: false,
  };

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.trainee.hasLoggedIn) {
      this.props.history.push("/TraineeLogin");
    }
    this.props.dispatch({
      type: 'trainee/getAllCoursesWithClasses',
      payload: {},
    }).then(() => {
      this.setState({
        data: this.props.trainee.coursesWithoutClasses
      });
    });
  }

  onInputChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  onSearch = () => {
    const {searchText} = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      // 这里一定要用this.props.trainee.courses来调用map函数
      // 如果使用this.state.data来调用，则第二次搜索会报错
      data: this.props.trainee.coursesWithoutClasses.map((record) => {
        const match = record.institution_name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          institution_name: (
            <span>
              {record.institution_name.split(reg).map((text, i) => (
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
      dataIndex: 'institution_name',
      key: 'institution_name',
      width: 150,
      fixed: 'left',
      filterDropdown: (
        <div className={styles.custom_filter_dropdown}>
          <Tooltip title="清空搜索内容再按搜索键，可显示全部课程">
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
      title: '课程名称',
      dataIndex: 'course_name',
      key: 'course_name',
      width: 200,
    }, {
      title: '课程类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      filters: types,
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    }, {
      title: '已报名额／课程名额',
      dataIndex: 'amount',
      key: 'amount',
      width: 160,
    }, {
      title: '报名截止日期',
      dataIndex: 'book_due_date',
      key: 'book_due_date',
      width: 150,
    }, {
      title: '开课日期',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 150,
    }, {
      title: '课时／周',
      dataIndex: 'periods_per_week',
      key: 'periods_per_week',
      width: 100,
    }, {
      title: '总周数',
      dataIndex: 'total_weeks',
      key: 'total_weeks',
      width: 100,
    }, {
      title: '班级数目',
      dataIndex: 'class_amount',
      key: 'class_amount',
      width: 100,
    }, {
      title: '授课教师',
      dataIndex: 'teacher',
      key: 'teacher',
    }, {
      title: '课程简介',
      dataIndex: 'course_introduction',
      key: 'course_introduction',
    }, {
      title: '总金额(¥)',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      fixed: 'right',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    }, {
      title: '预定课程',
      dataIndex: 'book',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            disabled={record.trainee_amount <= record.booked_amount}
            onClick={() => {
              // this.timer = setInterval(() => {
              //   window.location.reload(true);
              // }, 1000);
            }}
          >
            预定
          </Button>
        </span>)
    }];

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 5}}
          columns={columns}
          dataSource={this.state.data}
          scroll={{x: 2400}}
        />
      </div>
    )
  }
}

function mapStateToProps({trainee}) {
  return {
    trainee,
  };
}

export default connect(mapStateToProps)(TraineeChooseCourseWithoutClassPage);
