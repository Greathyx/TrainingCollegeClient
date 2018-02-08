import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button, Row, Col, message} from 'antd';
import styles from './css/TraineeRegisterPage.css';


const FormItem = Form.Item;

class RegisterTraineeForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error("请输入邮箱和密码！");
      }
      else {
        const param = {
          email: values['email'],
          password: values['password'],
          verificationCode: values['verification']
        };

        if (param.email.toString().length > 40) {
          message.warning("邮箱地址长度不能超过40位！");
        }
        else if (param.password.toString().length > 40) {
          message.warning("密码长度不能超过40位！");
        }
        else {
          this.props.dispatch({
            type: 'trainee/register',
            payload: {
              ...param,
            },
          });
        }
      }
    });
  };

  sendVerificationCode = () => {

    const email = this.props.form.getFieldValue('email');

    if (!email) {
      message.warning('请输入您的邮箱！');
      return;
    }

    const param = {
      email: email,
    };

    if (param.email.toString().length > 40) {
      message.warning("邮箱地址长度不能超过40位！");
      return;
    }

    // 判断输入格式是否为email
    const regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
    if (regex.test(param.email)) {
      message.success("邮箱验证中，请稍等...");
      this.props.dispatch({
        type: 'trainee/sendVerificationCode',
        payload: {
          ...param,
        },
      });
    }
    else {
      message.error("邮箱不存在！");
    }

  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className={styles.wrapper}>
        <Form onSubmit={this.handleSubmit} className={styles.register_form}>
          <p className={styles.welcome}>
            学员注册
          </p>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{required: true, message: '请输入您的邮箱地址'}],
            })(
              <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="邮箱"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入您的密码'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="密码"/>
            )}
          </FormItem>
          <FormItem>
            <Row gutter={12}>
              <Col span={15}>
                {getFieldDecorator('verification', {
                  rules: [{required: true, message: '请输入验证码'}],
                })(
                  <Input prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder="验证码"
                  />
                )}
              </Col>
              <Col span={9}>
                <Button onClick={this.sendVerificationCode}>
                  获取验证码
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.button}>
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const TraineeRegisterPage = Form.create()(RegisterTraineeForm);

function mapStateToProps({trainee}) {
  return {
    trainee,
  };
}

export default connect(mapStateToProps)(TraineeRegisterPage);
