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
        disabled={record.status === "invalid"}
        onClick={() => {
          this.showModal(record.course_order_id)
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
        traineeID: this.props.trainee.trainee_id,
        status: "not_paid"
      },
    });
  }

  showModal = (course_order_id) => {
    this.setState({
      visible: true,
      course_order_id: course_order_id,
    });
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

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
