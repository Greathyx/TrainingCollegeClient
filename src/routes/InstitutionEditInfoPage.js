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
        let password_previous = values['password_previous'];
        if (password_previous === undefined){
          password_previous = "";
        }

        let password_new = values['password_new'];
        if (password_new === undefined){
          password_new = "";
        }

        if (password_new === "" && password_previous !== "") {
          message.error("新密码不能为空！");
          return
        }

        const param = {
          code: this.props.institution.institution_code,
          email: this.props.institution.institution_email,
          name: values['name'],
          password_previous: password_previous,
          password_new: password_new,
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

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };

    const buttonLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className={styles.wrapper}>
        <Form onSubmit={this.handleSubmit} className={styles.edit_form}>
          <p className={styles.welcome}>
            修改机构信息
          </p>
          <FormItem
            {...formItemLayout}
            label="登陆码"
          >
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
          <FormItem
            {...formItemLayout}
            label="电子邮箱"
          >
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
          <FormItem
            {...formItemLayout}
            label="机构名称"
          >
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入您的机构名称'}],
              initialValue: this.props.institution.institution_name
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="原密码"
          >
            {getFieldDecorator('password_previous', {
              // rules: [{required: true, message: '请输入您的原密码'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('password_new', {
              // rules: [{required: true, message: '请输入您的新密码'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="地址"
          >
            {getFieldDecorator('location', {
              rules: [{required: true, message: '请输入您的机构地址'}],
              initialValue: this.props.institution.institution_location
            })(
              <Input
                prefix={<Icon type="environment-o" style={{color: 'rgba(0,0,0,.25)'}}/>}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="师资介绍"
          >
            {getFieldDecorator('faculty', {
              rules: [{required: true, message: '请输入您的师资介绍'}],
              initialValue: this.props.institution.institution_faculty
            })(
              <TextArea rows={4}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="师资介绍"
          >
            {getFieldDecorator('introduction', {
              rules: [{required: true, message: '请输入您的机构简介'}],
              initialValue: this.props.institution.institution_introduction
            })(
              <TextArea rows={4}/>
            )}
          </FormItem>
          <FormItem
            {...buttonLayout}
          >
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
