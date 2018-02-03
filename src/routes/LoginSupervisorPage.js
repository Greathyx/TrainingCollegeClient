import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import styles from './css/LoginSupervisorPage.css';

const FormItem = Form.Item;


class SupervisorLoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
            {getFieldDecorator('userName', {
              rules: [{required: true, message: '请输入您的用户名'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
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

export default LoginSupervisorPage;
