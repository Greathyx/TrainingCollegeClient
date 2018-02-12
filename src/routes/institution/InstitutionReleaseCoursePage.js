import React from 'react';
import {connect} from 'dva';
import {Form, Input, InputNumber, Tooltip, Icon, Button, Select, DatePicker, message} from 'antd';
import styles from '../css/InstitutionReleaseCoursePage.css';


const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;
const types = ["外语", "考研", "奥数", "编程", "前端交互"];

/**
 *
 * 检查学员人数是否符合要求
 *
 * @param value
 * @returns {*}
 */
function validateTraineeAmount(value) {
  if (value >= 1 && value <= 200) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '课程人数须在1～200人之间！',
  };
}

/**
 *
 * 检查每周课时是否符合要求
 *
 * @param value
 * @returns {*}
 */
function validatePeriodPerWeek(value) {
  if (value >= 1 && value <= 10) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '每周课时须在1～10课时之间！',
  };
}

/**
 *
 * 检查总周数是否符合要求
 *
 * @param value
 * @returns {*}
 */
function validateTotalWeeks(value) {
  if (value >= 1 && value <= 20) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '课程总周数须在1～20周之间！',
  };
}

/**
 *
 * 检查总金额是否符合要求
 *
 * @param value
 * @returns {*}
 */
function validatePrice(value) {
  if (value >= 0) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '课程总金额须大于或等于0！',
  };
}

class InstitutionReleaseCourseForm extends React.Component {

  state = {
    trainee_amount: {
      value: 1 // 初始值
    },
    period_per_week: {
      value: 1
    },
    total_weeks: {
      value: 1
    },
    price: {
      value: 0
    },
  };

  handleTraineeAmount = (value) => {
    this.setState({
      trainee_amount: {
        ...validateTraineeAmount(value),
        value,
      },
    });
  };

  handlePeriodPerWeek = (value) => {
    this.setState({
      period_per_week: {
        ...validatePeriodPerWeek(value),
        value,
      },
    });
  };

  handleTotalWeeks = (value) => {
    this.setState({
      total_weeks: {
        ...validateTotalWeeks(value),
        value,
      },
    });
  };

  handlePrice = (value) => {
    this.setState({
      price: {
        ...validatePrice(value),
        value,
      },
    });
  };

  // 检查是否选择了课程类型
  handleCheckType = (rule, value, callback) => {
    if (value && value === '请选择课程类型') {
      callback('请选择课程类型！')
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (!err) {
        if (this.props.institution.institution_id === undefined ||
          this.props.institution.institution_id === null) {
          message.error("登陆过时，请重新登陆！");
          return;
        }
        const fieldsValue = {
          ...values,
          'publisher': this.props.institution.institution_id,
          'trainee_amount': this.state.trainee_amount.value,
          'periods_per_week': this.state.period_per_week.value,
          'total_weeks': this.state.total_weeks.value,
          'price': this.state.price.value,
          'start_date': values['start_date'].format('YYYY-MM-DD'),
        };
        this.props.dispatch({
          type: 'institution/releaseCourse',
          payload: {
            ...fieldsValue,
          },
        });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    const trainee_amount = this.state.trainee_amount;
    const period_per_week = this.state.period_per_week;
    const total_weeks = this.state.total_weeks;
    const price = this.state.price;

    const trainee_amount_tips = '课程人数须在1～200人之间';
    const period_per_week_tips = '每周课时须在1～10课时之间';
    const total_weeks_tips = '课程总周数须在1～20周之间';
    const price_tips = '课程总金额须大于或等于0';

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
            发布课程计划&nbsp;
            <Tooltip title="课程计划一经发布无法修改">
              <Icon type="exclamation-circle-o"/>
            </Tooltip>
          </p>
          <FormItem
            {...formItemLayout}
            label="课程名称"
          >
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入课程名称！', whitespace: true}],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程人数"
            validateStatus={trainee_amount.validateStatus}
            help={trainee_amount.errorMsg || trainee_amount_tips}
          >
            <InputNumber
              min={1}
              max={200}
              value={trainee_amount.value}
              onChange={this.handleTraineeAmount}
              style={{width: '100%'}}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课时／周"
            validateStatus={period_per_week.validateStatus}
            help={period_per_week.errorMsg || period_per_week_tips}
          >
            <InputNumber
              min={1}
              max={10}
              value={period_per_week.value}
              onChange={this.handlePeriodPerWeek}
              style={{width: '100%'}}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="总周数"
            validateStatus={total_weeks.validateStatus}
            help={total_weeks.errorMsg || total_weeks_tips}
          >
            <InputNumber
              min={1}
              max={20}
              value={total_weeks.value}
              onChange={this.handleTotalWeeks}
              style={{width: '100%'}}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程类型"
          >
            {getFieldDecorator('type', {
              initialValue: "请选择课程类型",
              rules: [{required: true, message: '请选择课程类型！'}, {validator: this.handleCheckType}],
            })(
              <Select style={{width: '100%'}}>
                {
                  types.map(type => (
                    <Option value={type} key={type}>{type}</Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="总金额(¥)"
            validateStatus={price.validateStatus}
            help={price.errorMsg || price_tips}
          >
            <InputNumber
              min={0}
              value={price.value}
              onChange={this.handlePrice}
              style={{width: '100%'}}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="开课日期"
          >
            {getFieldDecorator('start_date', {
              rules: [{type: 'object', required: true, message: '请选择开课日期！'}],
            })(
              <DatePicker placeholder="请选择开课日期"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="授课教师"
          >
            {getFieldDecorator('teacher', {
              rules: [{required: true, message: '请输入课程授课教师介绍！'}],
            })(
              <TextArea rows={4}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程简介"
          >
            {getFieldDecorator('introduction', {
              rules: [{required: true, message: '请输入您的课程简介'}],
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

const InstitutionReleaseCoursePage = Form.create()(InstitutionReleaseCourseForm);

function mapStateToProps({institution}) {
  return {
    institution,
  };
}

export default connect(mapStateToProps)(InstitutionReleaseCoursePage);
