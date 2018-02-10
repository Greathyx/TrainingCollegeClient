import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button, message} from 'antd';
import styles from './css/InstitutionRegisterPage.css';


const FormItem = Form.Item;
const { TextArea } = Input;

class InstitutionRegisterForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error("请完整填写表单！");
      }
      else {
        const param = {
          email: values['email'],
          name: values['name'],
          password: values['password'],
          location: values['location'],
          faculty: values['faculty'],
          introduction: values['introduction']
        };

        this.props.dispatch({
          type: 'institution/register',
          payload: {
            ...param,
          },
        });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className={styles.wrapper}>
        <Form onSubmit={this.handleSubmit} className={styles.register_form}>
          <p className={styles.welcome}>
            机构注册
          </p>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{required: true, message: '请输入您的邮箱地址'}],
            })(
              <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="邮箱"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入您的机构名称'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="机构名称"/>
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
            {getFieldDecorator('location', {
              rules: [{required: true, message: '请输入您的机构地址'}],
            })(
              <Input prefix={<Icon type="environment-o" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="地址"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('faculty', {
              rules: [{required: true, message: '请输入您的师资介绍'}],
            })(
              <TextArea rows={4} placeholder="师资介绍"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('introduction', {
              rules: [{required: true, message: '请输入您的机构简介'}],
            })(
              <TextArea rows={4} placeholder="机构简介"/>
            )}
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

const InstitutionRegisterPage = Form.create()(InstitutionRegisterForm);

function mapStateToProps({institution}) {
  return {
    institution,
  };
}

export default connect(mapStateToProps)(InstitutionRegisterPage);
