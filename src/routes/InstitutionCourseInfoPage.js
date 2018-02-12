import React from 'react';
import {connect} from 'dva';
import {Table} from 'antd';


class InstitutionCourseInfoPage extends React.Component {

  constructor(props) {
    super(props);

    this.columns = [{
      title: '课程名称',
      dataIndex: 'name',
      width: 100,
      fixed: 'left'
    }, {
      title: '课程人数',
      width: 100,
      dataIndex: 'trainee_amount',
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
    this.props.dispatch({
      type: 'institution/getCourseInfo',
      payload: {
        publisher: this.props.institution.institution_id
      },
    });
  }

  render() {
    const columns = this.columns;
    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 10}}
          columns={columns}
          dataSource={this.props.institution.courseData}
          scroll={{x: 1500}}/>
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
