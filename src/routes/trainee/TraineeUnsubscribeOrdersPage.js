import React from 'react';
import {connect} from 'dva';
import {Table} from 'antd';


class TraineeUnsubscribeOrdersPage extends React.Component {

  constructor(props) {
    super(props);

    this.columns = [{
      title: '课程名称',
      dataIndex: 'course_name',
      width: 150,
      // fixed: 'left'
    }, {
      title: '机构名称',
      width: 150,
      dataIndex: 'institution_name',
    }, {
      title: '订购学员',
      width: 100,
      dataIndex: 'trainee_name',
    }, {
      title: '订单状态',
      width: 100,
      dataIndex: 'status',
    }, {
      title: '订课日期',
      width: 120,
      dataIndex: 'book_time',
    }, {
      title: '退课日期',
      width: 120,
      dataIndex: 'unsubscribe_time',
    }, {
      title: '付款金额(¥)',
      dataIndex: 'payment',
      width: 100,
      // fixed: 'right',
    }, {
      title: '获得积分',
      dataIndex: 'add_credits',
      width: 100,
      // fixed: 'right',
    }, {
      title: '退款金额(¥)',
      dataIndex: 'payback',
      width: 100,
      // fixed: 'right',
    }, {
      title: '扣除积分',
      dataIndex: 'minus_credits',
      width: 100,
      // fixed: 'right',
    }];
  }

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.trainee.hasLoggedIn) {
      this.props.history.push("/TraineeLogin");
    }
    else {
      this.props.dispatch({
        type: 'trainee/getAllUnsubscribeAndFailedOrders',
        payload: {
          unsubscribe: {
            traineeID: this.props.trainee.trainee_id,
            status: "unsubscribe"
          },
          failure: {
            traineeID: this.props.trainee.trainee_id,
            status: "failure"
          }
        },
      });
    }
  }

  render() {
    const columns = this.columns;
    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 10}}
          columns={columns}
          dataSource={this.props.trainee.unsubscribeAndFailedOrders}
          // scroll={{x: 1500}}
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

export default connect(mapStateToProps)(TraineeUnsubscribeOrdersPage);
