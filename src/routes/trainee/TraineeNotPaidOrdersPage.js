import React from 'react';
import {connect} from 'dva';
import {Table, Button, Modal, Form, Input} from 'antd';


const FormItem = Form.Item;

const ConfirmPayForm = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form} = props;
    const {getFieldDecorator} = form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };

    return (
      <Modal
        visible={visible}
        title="确认支付"
        okText="支付"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical" style={{width: '100%', marginTop: 20, marginLeft: 30}}>
          <FormItem {...formItemLayout} label="卡号">
            {getFieldDecorator('identity', {
              rules: [{required: true, message: '请输入您的银行卡号！'}],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入您的银行卡密码！'}],
            })(
              <Input type="password"/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);


class TraineeNotPaidOrdersPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      course_order_id: -1,
    };

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
      title: '订课日期',
      width: 120,
      dataIndex: 'book_time',
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
      title: '取消',
      dataIndex: 'cancel',
      width: 100,
      // fixed: 'right',
      render: (text, record) => (
        <span>
      <Button
        // type="primary"
        onClick={() => {
          this.showCancelModal(record.course_order_id, this.cancelBookedCourse)
        }}
      >
        取消
      </Button>
    </span>
      ),
    }, {
      title: '支付',
      dataIndex: 'pay',
      width: 100,
      // fixed: 'right',
      render: (text, record) => (
        <span>
      <Button
        type="primary"
        disabled={record.status === "invalid"}
        onClick={() => {
          this.showPayModal(record.course_order_id)
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
    // 如果未登录，则跳转到登陆界面
    if (!this.props.trainee.hasLoggedIn) {
      this.props.history.push("/TraineeLogin");
    }
    this.props.dispatch({
      type: 'trainee/getAllNotPaidOrders',
      payload: {
        traineeID: this.props.trainee.trainee_id,
        status: "not_paid"
      },
    });
  }

  // 打开确认取消订单对话框
  showCancelModal = (course_order_id, cancelBookedCourse) => {
    this.setState({
      course_order_id: course_order_id,
    });

    Modal.confirm({
      title: '您确认取消预定此课程吗？',
      content: '您已锁定该课程的名额，若您确认退订此课程，将会失去预定数额的所有名额。',
      okText: '确认',
      cancelText: "取消",
      onOk: cancelBookedCourse,
    });
  };

  // 取消订购课程方法
  cancelBookedCourse = () => {
    const param = {
      course_order_id: this.state.course_order_id,
    };
    this.props.dispatch({
      type: 'trainee/cancelPay',
      payload: {
        ...param,
      },
    });
    // 1s后刷新本页面
    this.timer = setInterval(() => {
      window.location.reload(true);
    }, 1000);
  };

  // 打开支付对话框
  showPayModal = (course_order_id) => {
    this.setState({
      visible: true,
      course_order_id: course_order_id,
    });
  };

  // 取消支付，关闭对话框
  handleCancel = () => {
    this.setState({visible: false});
  };

  // 提交支付方法
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const param = {
        ...values,
        course_order_id: this.state.course_order_id,
      };
      this.props.dispatch({
        type: 'trainee/pay',
        payload: {
          ...param,
        },
      });
      form.resetFields();
      this.setState({visible: false});
      // 更新学员会员信息
      this.props.dispatch({
        type: 'trainee/getTraineeVipInfo',
        payload: {
          trainee_id: this.props.trainee.trainee_id
        },
      });
      // 1s后刷新本页面
      this.timer = setInterval(() => {
        window.location.reload(true);
      }, 1000);
    });
  };

  saveFormRef = (form) => {
    this.form = form;
  };

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
        <ConfirmPayForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
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
