import React from 'react';
import {connect} from 'dva';
import {Table} from 'antd';


class InstitutionCourseInfoPage extends React.Component {

  constructor(props) {
    super(props);

    this.columns = [{
      title: '课程名称',
      dataIndex: 'name',
      width: 150,
      fixed: 'left'
    }, {
      title: '已报名额／课程名额',
      width: 160,
      dataIndex: 'trainee_amount',
    }, {
      title: '班级数目',
      width: 100,
      dataIndex: 'class_amount',
    }, {
      title: '课时／周',
      width: 100,
      dataIndex: 'periods_per_week',
    }, {
      title: '总周数',
      width: 100,
      dataIndex: 'total_weeks',
    }, {
      title: '课程类型',
      width: 100,
      dataIndex: 'type',
    }, {
      title: '报名截止日期',
      width: 150,
      dataIndex: 'book_due_date',
    }, {
      title: '开课日期',
      width: 150,
      dataIndex: 'start_date',
    }, {
      title: '授课教师',
      dataIndex: 'teacher',
    }, {
      title: '课程简介',
      dataIndex: 'introduction',
    }, {
      title: '总金额(¥)',
      dataIndex: 'price',
      width: 100,
      fixed: 'right',
    }];
  }

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.institution.hasLoggedIn) {
      this.props.history.push("/InstitutionLogin");
    }
    else {
      this.props.dispatch({
        type: 'institution/getCourseInfo',
        payload: {
          publisher: this.props.institution.institution_id
        },
      });
    }
  }

  render() {
    const columns = this.columns;
    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 5}}
          columns={columns}
          dataSource={this.props.institution.courseData}
          scroll={{x: 2000}}
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

export default connect(mapStateToProps)(InstitutionCourseInfoPage);
