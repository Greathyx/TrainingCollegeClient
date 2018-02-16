import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import styles from '../css/SupervisorLoginPage.css';


const FormItem = Form.Item;

class SupervisorLoginForm extends React.Component {

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
        };

        // 判断输入格式是否为email
        const regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
        if (regex.test(param.email)) {
          this.props.dispatch({
            type: 'trainee/login',
            payload: {
              ...param,
            },
          }).then(value => {
            if(value){
              this.props.history.push("/Trainee/ChooseCourseWithClass");
            }
          });
        }
        else {
          message.error("邮箱格式非法！");
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
            学员登陆
          </p>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{required: true, message: '请输入您的邮箱'}],
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

const LoginTraineePage = Form.create()(SupervisorLoginForm);

function mapStateToProps({trainee}) {
  return {
    trainee,
  };
}

export default connect(mapStateToProps)(LoginTraineePage);
