import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import styles from '../css/SupervisorLoginPage.css';


const FormItem = Form.Item;

class InstitutionLoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error("请输入登陆码和密码！");
      }
      else {
        const param = {
          code: values['code'],
          password: values['password'],
        };

        // 判断id是否为数字和(或)字母(的组合)
        const regex = /^[A-Za-z0-9]*$/;
        if (regex.test(param.code)) {
          this.props.dispatch({
            type: 'institution/login',
            payload: {
              ...param,
            },
          }).then(value => {
            // 如果登陆成功则跳转页面
            if(value){
              this.props.history.push("/Institution/CourseInfo");
            }
          });
        }
        else {
          message.error("登陆码或密码错误！");
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
            机构登陆
          </p>
          <FormItem>
            {getFieldDecorator('code', {
              rules: [{required: true, message: '请输入您的机构登陆码'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="登陆码"/>
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

const InstitutionLoginPage = Form.create()(InstitutionLoginForm);

function mapStateToProps({institution}) {
  return {
    institution,
  };
}

export default connect(mapStateToProps)(InstitutionLoginPage);
