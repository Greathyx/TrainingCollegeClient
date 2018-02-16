import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {Form, Input, InputNumber, Tooltip, Icon, Button, Select, DatePicker, Radio, message} from 'antd';
import styles from '../css/InstitutionReleaseCoursePage.css';


const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const types = ["外语", "考研", "奥数", "文学", "物化", "编程",
  "前端交互", "摄影", "健身", "棋类", "烹饪"];

/**
 *
 * 检查学员人数是否符合要求
 *
 * @param value
 * @returns {*}
 */
function validateTraineeAmount(value) {
  if (value >= 1) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '课程人数须至少1人！',
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
  if (value >= 1) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '每周课时须至少1课时！',
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
  if (value >= 1) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '课程总周数须至少1周！',
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

// 将今天及之前的日期设置为不可选
function disabledDateBeforeToday(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
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
    has_classes: 1,
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

  // 设置是否分班变量的值
  onHasClassesChange = (e) => {
    this.setState({
      has_classes: e.target.value,
    });
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
        if(values['start_date']<values['book_due_date']){
          message.error("开课日期须在报名截止日期之后！");
          return;
        }
        const fieldsValue = {
          ...values,
          'publisher': this.props.institution.institution_id,
          'publisher_name': this.props.institution.institution_name,
          'trainee_amount': this.state.trainee_amount.value,
          'periods_per_week': this.state.period_per_week.value,
          'total_weeks': this.state.total_weeks.value,
          'price': this.state.price.value,
          'start_date': values['start_date'].format('YYYY-MM-DD'),
          'book_due_date': values['book_due_date'].format('YYYY-MM-DD'),
          'has_classes': this.state.has_classes === 1 ? "false" : "true",
        };
        this.props.dispatch({
          type: 'institution/releaseCourse',
          payload: {
            ...fieldsValue,
          },
        }).then(value => {
          if (value){
            this.props.form.resetFields();
          }
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

    const trainee_amount_tips = '课程人数须至少1人';
    const period_per_week_tips = '每周课时须至少1课时';
    const total_weeks_tips = '课程总周数须至少1周';
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
            label="课程名额"
            validateStatus={trainee_amount.validateStatus}
            help={trainee_amount.errorMsg || trainee_amount_tips}
          >
            <InputNumber
              min={1}
              value={trainee_amount.value}
              onChange={this.handleTraineeAmount}
              style={{width: '100%'}}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否分班"
          >
            <RadioGroup onChange={this.onHasClassesChange} value={this.state.has_classes}>
              <Radio value={1}>否</Radio>
              <Radio value={2}>是</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课时／周"
            validateStatus={period_per_week.validateStatus}
            help={period_per_week.errorMsg || period_per_week_tips}
          >
            <InputNumber
              min={1}
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
            label="报名截止日期"
          >
            {getFieldDecorator('book_due_date', {
              rules: [{type: 'object', required: true, message: '请选择报名截止日期！'}],
            })(
              <DatePicker style={{width: '100%'}} disabledDate={disabledDateBeforeToday} placeholder="请选择报名截止日期"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="开课日期"
          >
            {getFieldDecorator('start_date', {
              rules: [{type: 'object', required: true, message: '请选择开课日期！'}],
            })(
              <DatePicker style={{width: '100%'}} disabledDate={disabledDateBeforeToday} placeholder="请选择开课日期"/>
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
