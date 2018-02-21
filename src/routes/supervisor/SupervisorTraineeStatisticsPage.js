import React from 'react';
import {connect} from 'dva';
import {Table} from 'antd';


class SupervisorTraineeStatisticsPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // this.props.dispatch({
    //   type: 'supervisor/getInstitutionStatistics',
    //   payload: {},
    // });
  }

  render() {
    const columns = [{
      title: '学员姓名',
      dataIndex: 'traineeName',
    }, {
      title: '学员邮箱',
      dataIndex: 'email',
    }, {
      title: '总支出(¥)',
      dataIndex: 'total_expense',
    }, {
      title: '本年支出(¥)',
      dataIndex: 'this_year_expense',
    }, {
      title: '总订课程数',
      dataIndex: 'total_course_amount',
    }, {
      title: '本年订课数',
      dataIndex: 'this_year_paid_amount',
    }, {
      title: '本年退课数',
      dataIndex: 'this_year_unsubscribe_amount',
    }, {
      title: '会员等级',
      dataIndex: 'level',
    }, {
      title: '会员积分',
      dataIndex: 'credit',
    }, {
      title: '会员状态',
      dataIndex: 'is_active',
    }];

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 10}}
          columns={columns}
          // dataSource={this.props.supervisor.institution_statistics}
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
