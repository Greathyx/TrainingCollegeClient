import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import styles from './css/LoginSupervisorPage.css';

const FormItem = Form.Item;


class SupervisorLoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error("请输入ID和密码！");
      }
      else {
        const param = {
          supervisor_id: values['userId'],
          password: values['password'],
        };

        // 判断id是否仅有数字
        const regex = /^[0-9]+.?[0-9]*$/;
        if (regex.test(param.supervisor_id)) {
          this.props.dispatch({
            type: 'supervisor/login',
            payload: {
              ...param,
            },
          });
        }
        else {
          message.error("用户名或密码错误！");
        }
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={styles.wrapper}>
        <Form onSubmit={this.handleSubmit} className={styles.login_form}>
          <p className={styles.welcome}>
            欢迎登陆
          </p>
          <FormItem>
            {getFieldDecorator('userId', {
              rules: [{required: true, message: '请输入您的用户ID'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户ID"/>
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
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            <a className={styles.login_form_forgot} href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className={styles.login_form_button}>
              登陆
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const LoginSupervisorPage = Form.create()(SupervisorLoginForm);

function mapStateToProps({supervisor}) {
  return {
    supervisor,
  };
}

export default connect(mapStateToProps)(LoginSupervisorPage);
