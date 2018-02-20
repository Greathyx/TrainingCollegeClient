import React from 'react';
import {connect} from 'dva';
import {Input, Table, Button, Tooltip, Icon,} from 'antd';
import styles from '../css/TraineeChooseCourseWithClassPage.css';


class TraineeCourseRegistrationPage extends React.Component {

  state = {
    filterDropdownVisible: false,
    data: [],
    searchText: '',
    filtered: false,
  };

  // React组件初始化时自动调用的方法
  componentWillMount() {
    this.props.dispatch({
      type: 'trainee/getAllCoursesRegistration',
      payload: {
        trainee_id: this.props.trainee.trainee_id
      },
    }).then(() => {
      this.setState({
        data: this.props.trainee.courses_registration
      });
    });
  }

  onInputChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  // 按名字搜索学员以便登记该学员听课日期
  onSearch = () => {
    const {searchText} = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.props.trainee.courses_registration.map((record) => {
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
      filterDropdown: (
        <div className={styles.custom_filter_dropdown}>
          <Tooltip title="清空搜索内容再按搜索键，可显示所有课程成绩">
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
      title: '机构名称',
      dataIndex: 'institution_name',
    }, {
      title: '登记日期',
      dataIndex: 'registration_date',
    }];

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 10}}
          columns={columns}
          dataSource={this.state.data}
          style={{marginTop: 20}}
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

export default connect(mapStateToProps)(TraineeCourseRegistrationPage);
