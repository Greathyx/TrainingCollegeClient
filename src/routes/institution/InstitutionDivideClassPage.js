import React from 'react';
import {connect} from 'dva';
import {Modal, Form, Table, Button, InputNumber} from 'antd';


const FormItem = Form.Item;

const DivideClassForm = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form, class_amount_now, max_amount} = props;
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
        title="分班确认"
        okText="确认"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical" style={{width: '100%', marginTop: 20, marginLeft: 30}}>
          <FormItem {...formItemLayout} label="分班数目">
            {getFieldDecorator('class_amount', {
              initialValue: class_amount_now,
              rules: [{required: true, message: '请输入分班数目！'}],
            })(
              <InputNumber min={1} max={max_amount}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class InstitutionDivideClassPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.institution.hasLoggedIn) {
      this.props.history.push("/InstitutionLogin");
    }
    else {
      this.props.dispatch({
        type: 'institution/getToDivideClassList',
        payload: {
          institutionID: this.props.institution.institution_id
        },
      });
    }
  }

  state = {
    visible: false,
    courseID: null,
    max_amount: null,
    class_amount_now: 1,
  };

  showConfirmDivideModal = (courseID, class_amount_now, max_amount) => {
    this.setState({
      visible: true,
      courseID: courseID,
      class_amount_now: class_amount_now,
      max_amount: max_amount
    });
  };

  // 取消分班，关闭对话框
  handleCancel = () => {
    this.setState({visible: false});
  };

  // 分班方法
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const param = {
        ...values,
        courseID: this.state.courseID,
      };
      this.props.dispatch({
        type: 'institution/divideClasses',
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
    const columns = [{
      title: '课程名称',
      dataIndex: 'courseName',
    }, {
      title: '已报名额／课程名额',
      dataIndex: 'trainee_amount',
    }, {
      title: '报名截止日期',
      dataIndex: 'book_due_date',
    }, {
      title: '开课日期',
      dataIndex: 'start_date',
    }, {
      title: '分班数目',
      dataIndex: 'class_amount',
    }, {
      title: '分配班级',
      dataIndex: 'divide',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            disabled={!record.canDivide}
            onClick={() => {
              this.showConfirmDivideModal(record.courseID, record.class_amount, record.max_amount)
            }}
          >
            分班
          </Button>
        </span>)
    }];

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 10}}
          columns={columns}
          dataSource={this.props.institution.toDivideClasses}
          // scroll={{x: 2000}}
        />
        <DivideClassForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          class_amount_now={this.state.class_amount_now}
          max_amount={this.state.max_amount}
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

export default connect(mapStateToProps)(InstitutionDivideClassPage);
