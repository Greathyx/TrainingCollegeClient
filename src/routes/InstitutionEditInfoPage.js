import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button, Tooltip, message} from 'antd';
import styles from './css/InstitutionEditInfoPage.css';


const FormItem = Form.Item;
const {TextArea} = Input;

class InstitutionEditInfoForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error("请完整填写表单！");
      }
      else {
        const param = {
          code: this.props.institution.institution_code,
          email: this.props.institution.institution_email,
          name: values['name'],
          password_previous: values['password_previous'],
          password_new: values['password_new'],
          location: values['location'],
          faculty: values['faculty'],
          introduction: values['introduction']
        };

        this.props.dispatch({
          type: 'institution/editInfo',
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
        <Form onSubmit={this.handleSubmit} className={styles.edit_form}>
          <p className={styles.welcome}>
            修改机构信息
          </p>
          <FormItem>
            <Tooltip
              trigger={['hover']}
              title="机构登陆码无法修改"
              placement="topLeft"
              overlayClassName="numeric-input"
            >
              <Input
                prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                disabled={true}
                defaultValue={this.props.institution.institution_code}
              />
            </Tooltip>
          </FormItem>
          <FormItem>
            <Tooltip
              trigger={['hover']}
              title="邮箱一经设置无法修改"
              placement="topLeft"
              overlayClassName="numeric-input"
            >
              <Input
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                disabled={true}
                defaultValue={this.props.institution.institution_email}
              />
            </Tooltip>
          </FormItem>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入您的机构名称'}],
              initialValue: this.props.institution.institution_name
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="机构名称"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password_previous', {
              rules: [{required: true, message: '请输入您的原密码'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="原密码"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password_new', {
              rules: [{required: true, message: '请输入您的新密码'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="新密码"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('location', {
              rules: [{required: true, message: '请输入您的机构地址'}],
              initialValue: this.props.institution.institution_location
            })(
              <Input
                prefix={<Icon type="environment-o" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="地址"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('faculty', {
              rules: [{required: true, message: '请输入您的师资介绍'}],
              initialValue: this.props.institution.institution_faculty
            })(
              <TextArea
                rows={4}
                placeholder="师资介绍"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('introduction', {
              rules: [{required: true, message: '请输入您的机构简介'}],
              initialValue: this.props.institution.institution_introduction
            })(
              <TextArea
                rows={4}
                placeholder="机构简介"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.button}>
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const InstitutionEditInfoPage = Form.create()(InstitutionEditInfoForm);

function mapStateToProps({institution}) {
  return {
    institution,
  };
}

export default connect(mapStateToProps)(InstitutionEditInfoPage);
