import React from 'react';
import {connect} from 'dva';
import {Table, Button, Modal} from 'antd';


class TraineePaidPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      course_order_id: -1,
    };

    this.columns = [{
      title: '课程名称',
      dataIndex: 'course_name',
      width: 150,
      fixed: 'left'
    }, {
      title: '机构名称',
      // width: 150,
      dataIndex: 'institution_name',
    }, {
      title: '订购学员',
      // width: 100,
      dataIndex: 'trainee_name',
    }, {
      title: '订购人数',
      // width: 100,
      dataIndex: 'amount',
    }, {
      title: '班级编号',
      // width: 100,
      dataIndex: 'classID',
    }, {
      title: '订单状态',
      // width: 100,
      dataIndex: 'status',
    }, {
      title: '订课日期',
      // width: 120,
      dataIndex: 'book_time',
    }, {
      title: '联系方式',
      // width: 200,
      dataIndex: 'description',
    }, {
      title: '总金额(¥)',
      dataIndex: 'payment',
      width: 100,
      fixed: 'right',
    }, {
      title: '已获积分',
      dataIndex: 'add_credits',
      width: 100,
      fixed: 'right',
    }, {
      title: '退课',
      dataIndex: 'unsubscribe',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <span>
      <Button
        type="primary"
        onClick={() => {
          this.showUnsubscribeModal(record.course_order_id, this.unsubscribeCourse)
        }}
      >
        退课
      </Button>
    </span>
      ),
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
        type: 'trainee/getAllPaidOrders',
        payload: {
          traineeID: this.props.trainee.trainee_id,
          status: "paid"
        },
      });
    }
  }

  // 打开确认取退课对话框
  showUnsubscribeModal = (course_order_id, unsubscribeCourse) => {
    this.setState({
      course_order_id: course_order_id,
    });

    Modal.confirm({
      title: '您确认退订此课程吗？',
      content: (
        <div>
          <p>
            退订规则：<br/>
            若您在开课前1周内退课，则退还原付款的1/4；<br/>
            若您在开课前2周内退课，则退还原付款的1/2；<br/>
            若您在开课前3周内退课，则退还原付款的3/4。<br/>
          </p>
        </div>
      ),
      okText: '确认',
      cancelText: "取消",
      onOk: unsubscribeCourse,
    });
  };

  // 退课方法
  unsubscribeCourse = () => {
    const param = {
      course_order_id: this.state.course_order_id,
    };
    this.props.dispatch({
      type: 'trainee/unsubscribe',
      payload: {
        ...param,
      },
    });
    // 1s后刷新本页面
    this.timer = setInterval(() => {
      window.location.reload(true);
    }, 1000);
  };

  render() {
    const columns = this.columns;
    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 5}}
          columns={columns}
          dataSource={this.props.trainee.paidOrders}
          scroll={{x: 1500}}
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

export default connect(mapStateToProps)(TraineePaidPage);
