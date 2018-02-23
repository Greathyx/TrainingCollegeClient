import React from 'react';
import {connect} from 'dva';
import {Table, Input, Button, Icon, Tooltip} from 'antd';
import styles from '../css/TraineeChooseCourseWithClassPage.css';


class InstitutionBookedCoursesPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.institution.hasLoggedIn) {
      this.props.history.push("/InstitutionLogin");
    }
    else {
      this.props.dispatch({
        type: 'institution/getAllBookedOrders',
        payload: {
          institutionID: this.props.institution.institution_id,
          status: "paid"
        },
      }).then(() => {
        this.setState({
          data: this.props.institution.booked_courses
        });
      });
    }
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
      data: this.props.institution.booked_courses.map((record) => {
        const match = record.course_name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          course_name: (
            <span>
              {record.course_name.split(reg).map((text, i) => (
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
      title: '课程名称',
      dataIndex: 'course_name',
      key: 'course_name',
      filterDropdown: (
        <div className={styles.custom_filter_dropdown}>
          <Tooltip title="清空搜索内容再按搜索键，可显示全部课程">
            <Icon type="exclamation-circle-o" style={{marginRight: 8}}/>
          </Tooltip>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="搜索课程名称"
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
      title: '订课学员',
      dataIndex: 'trainee_name',
      key: 'trainee_name',
    }, {
      title: '订课人数',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '实付费用(¥)',
      dataIndex: 'payment',
      key: 'payment',
    }, {
      title: '订课日期',
      dataIndex: 'book_time',
      key: 'book_time',
    }, {
      title: '联系方式',
      dataIndex: 'description',
      key: 'description',
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

function mapStateToProps({institution}) {
  return {
    institution,
  };
}

export default connect(mapStateToProps)(InstitutionBookedCoursesPage);
