import React from 'react';
import {connect} from 'dva';
import {Table, Button} from 'antd';


class TraineeNotPaidOrdersPage extends React.Component {

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
      title: '订购人数',
      width: 100,
      dataIndex: 'amount',
    }, {
      title: '订单状态',
      width: 100,
      dataIndex: 'status',
    }, {
      title: '联系方式',
      width: 200,
      dataIndex: 'description',
    }, {
      title: '总金额(¥)',
      dataIndex: 'payment',
      width: 100,
      // fixed: 'right',
    }, {
      title: '可获积分',
      dataIndex: 'add_credits',
      width: 100,
      // fixed: 'right',
    }, {
      title: '支付',
      dataIndex: 'pay',
      width: 100,
      // fixed: 'right',
      render: (text, record) => (
        <span>
      <Button
        type="primary"
        onClick={() => {
          // this.timer = setInterval(() => {
          //   window.location.reload(true);
          // }, 1000);
        }}
      >
        支付
      </Button>
    </span>
      ),
    }];
  }

  // React组件初始化时自动调用的方法
  componentWillMount() {
    this.props.dispatch({
      type: 'trainee/getAllNotPaidOrders',
      payload: {
        traineeID: this.props.trainee.trainee_id
      },
    });
  }

  render() {
    const columns = this.columns;
    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 5}}
          columns={columns}
          dataSource={this.props.trainee.notPaidOrders}
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

export default connect(mapStateToProps)(TraineeNotPaidOrdersPage);
