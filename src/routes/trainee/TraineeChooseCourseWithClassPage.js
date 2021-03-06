import React from 'react';
import {connect} from 'dva';
import {Form, Modal, Input, InputNumber, Table, Button, Icon, Tooltip} from 'antd';
import styles from '../css/TraineeChooseCourseWithClassPage.css';


const FormItem = Form.Item;
const {TextArea} = Input;

const types = [
  {text: '外语', value: '外语',},
  {text: '考研', value: '考研',},
  {text: '奥数', value: '奥数',},
  {text: '文学', value: '文学',},
  {text: '物化', value: '物化',},
  {text: '编程', value: '编程',},
  {text: '前端交互', value: '前端交互',},
  {text: '摄影', value: '摄影',},
  {text: '健身', value: '健身',},
  {text: '棋类', value: '棋类',},
  {text: '烹饪', value: '烹饪',},
];

/**
 *
 * 检查学员人数是否符合要求
 *
 * @param value
 * @returns {*}
 */
function validateTraineeAmount(value) {
  if (value >= 1 && value <= 3) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '订课人数须至少1人且限额3人！',
  };
}

/**
 *
 * 检查使用抵用金额是否符合要求
 *
 * @param param
 * @returns {*}
 */
function validateCreditAmount(param) {
  if (param.credit >= 0 && param.credit <= param.max_credit) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '抵用金额超出可用金额！',
  };
}

const PaymentCreateForm = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form, book_info, onAmountChange, trainee_amount, use_credit, onCreditChange} = props;
    const {getFieldDecorator} = form;
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

    return (
      <Modal
        visible={visible}
        title="请您确认订单信息"
        okText="确认"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical" style={{width: '100%', marginTop: 20, marginLeft: 30}}>
          <FormItem
            {...formItemLayout} label="课程价格"
          >
            <span>{book_info.price * book_info.book_amount + "元"}</span>
          </FormItem>
          <FormItem
            {...formItemLayout} label="会员折扣"
          >
            <span>{book_info.discount === "1" ? "暂无可使用优惠折扣" : book_info.discount + "折"}</span>
          </FormItem>
          <FormItem
            {...formItemLayout} label="可用积分"
          >
            <span>{book_info.max_credit + "元"}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="抵用积分"
            validateStatus={use_credit.validateStatus}
            help={use_credit.errorMsg || "抵用金额超出可用金额！"}
          >
            {getFieldDecorator('use_credit', {
              initialValue: 1,
              rules: [{required: true, message: '请输入抵用积分！'}],
            })(
              <InputNumber
                min={0}
                max={book_info.max_credit}
                onChange={onCreditChange}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout} label="最终支付"
          >
            <span>{book_info.price * book_info.book_amount * book_info.discount - use_credit.value + "元"}</span>
          </FormItem>
          <FormItem
            {...formItemLayout} label="可获积分"
          >
            <span>{Math.floor((book_info.price * book_info.book_amount * book_info.discount) / 100) * 5 + "分"}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="订课人数"
            validateStatus={trainee_amount.validateStatus}
            help={trainee_amount.errorMsg || "订课人数须至少1人且限额3人！"}
          >
            {getFieldDecorator('amount', {
              initialValue: 1,
              rules: [{required: true, message: '请输入订课人数！'}],
            })(
              <InputNumber
                min={1}
                max={3}
                onChange={onAmountChange}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="联系方式">
            <Tooltip title="请留下您的联系方式，若您为他人订购课程，请再留下他们的姓名及联系方式">
              {getFieldDecorator('description', {
                rules: [{required: true, message: '请输入联系方式！'}],
              })(
                <TextArea rows={3}/>
              )}
            </Tooltip>
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class TraineeChooseCourseWithClassPage extends React.Component {

  state = {
    filterDropdownVisible: false,
    data: [],
    searchText: '',
    filtered: false,
    visible: false,
    trainee_amount: {
      value: 1 // 初始值
    },
    use_credit: {
      value: 0 // 初始值
    },
    book_info: {
      price: -1,
      course_id: -1,
      institution_id: -1,
      discount: -1,
      book_amount: 1,
      max_credit: -1,
    },
  };

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.trainee.hasLoggedIn) {
      this.props.history.push("/TraineeLogin");
    }
    else {
      this.props.dispatch({
        type: 'trainee/getTraineeVipInfo',
        payload: {
          trainee_id: this.props.trainee.trainee_id
        },
      });
      this.props.dispatch({
        type: 'trainee/getAllCourses',
        payload: {},
      }).then(() => {
        this.setState({
          data: this.props.trainee.courses
        });
      });
    }
  }

  // 处理订课人数变换，改变订单总价
  onAmountChange = (value) => {
    this.setState({
      book_info: {
        ...this.state.book_info,
        book_amount: value
      },
      trainee_amount: {
        ...validateTraineeAmount(value),
        value,
      },
    })
  };

  // 处理积分使用变换，改变订单总价
  onCreditChange = (value) => {
    const param = {
      credit: value,
      max_credit: this.state.book_info.max_credit
    };

    this.setState({
      book_info: {
        ...this.state.book_info,
        use_credit: value
      },
      use_credit: {
        ...validateCreditAmount(param),
        value,
      },
    })
  };

  // 打开确认订单对话框
  showModal = (book_info) => {
    // 更新会员折扣优惠
    this.props.dispatch({
      type: 'trainee/getTraineeVipInfo',
      payload: {
        trainee_id: this.props.trainee.trainee_id
      },
    });
    this.setState({
      visible: true,
      book_info: book_info
    });
  };

  // 取消订购方法
  handleCancel = () => {
    this.setState({visible: false});
  };

  // 确认订单
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const param = {
        ...values,
        payment: this.state.book_info.price * this.state.book_info.book_amount * this.state.book_info.discount - this.state.use_credit.value,
        traineeID: this.props.trainee.trainee_id,
        courseID: this.state.book_info.course_id,
        institutionID: this.state.book_info.institution_id,
      };
      this.props.dispatch({
        type: 'trainee/generateOrder',
        payload: {
          ...param,
        },
      });
      form.resetFields();
      this.setState({visible: false});
    });
  };

  saveFormRef = (form) => {
    this.form = form;
  };

  onInputChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  // 按名字搜索
  onSearch = () => {
    const {searchText} = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      // 这里一定要用this.props.trainee.courses来调用map函数
      // 如果使用this.state.data来调用，则第二次搜索会报错
      data: this.props.trainee.courses.map((record) => {
        const match = record.institution_name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          institution_name: (
            <span>
              {record.institution_name.split(reg).map((text, i) => (
                i > 0 ? [<span key={record.key} className={styles.highlight}>{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };

  render() {

    const columns = [{
      title: '机构名称',
      dataIndex: 'institution_name',
      key: 'institution_name',
      width: 150,
      fixed: 'left',
      filterDropdown: (
        <div className={styles.custom_filter_dropdown}>
          <Tooltip title="清空搜索内容再按搜索键，可显示全部课程">
            <Icon type="exclamation-circle-o" style={{marginRight: 8}}/>
          </Tooltip>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="搜索机构名称"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>搜索</Button>
        </div>
      ),
      filterIcon: <Icon type="smile-o" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    }, {
      title: '课程名称',
      dataIndex: 'course_name',
      key: 'course_name',
      width: 200,
    }, {
      title: '课程类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      filters: types,
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    }, {
      title: '已报名额／课程名额',
      dataIndex: 'amount',
      key: 'amount',
      width: 160,
    }, {
      title: '报名截止日期',
      dataIndex: 'book_due_date',
      key: 'book_due_date',
      width: 150,
    }, {
      title: '开课日期',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 150,
    }, {
      title: '课时／周',
      dataIndex: 'periods_per_week',
      key: 'periods_per_week',
      width: 100,
    }, {
      title: '总周数',
      dataIndex: 'total_weeks',
      key: 'total_weeks',
      width: 100,
    }, {
      title: '班级数目',
      dataIndex: 'class_amount',
      key: 'class_amount',
      width: 100,
    }, {
      title: '授课教师',
      dataIndex: 'teacher',
      key: 'teacher',
    }, {
      title: '课程简介',
      dataIndex: 'course_introduction',
      key: 'course_introduction',
    }, {
      title: '总金额(¥)',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      fixed: 'right',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    }, {
      title: '预定课程',
      dataIndex: 'book',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            disabled={record.trainee_amount <= record.booked_amount}
            onClick={() => {
              const param = {
                price: record.price,
                course_id: record.course_id,
                institution_id: record.institution_id,
                discount: this.props.trainee.discount,
                book_amount: 1,
                max_credit: this.props.trainee.credit
              };
              this.showModal(param)
            }}
          >
            预定
          </Button>
        </span>)
    }];

    const trainee_amount = this.state.trainee_amount;
    const use_credit = this.state.use_credit;

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 5}}
          columns={columns}
          dataSource={this.state.data}
          scroll={{x: 2400}}
        />
        <PaymentCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          book_info={this.state.book_info}
          onAmountChange={this.onAmountChange}
          trainee_amount={trainee_amount}
          use_credit={use_credit}
          onCreditChange={this.onCreditChange}
        />
      </div>
    )
  }
}

function mapStateToProps({trainee}) {
  return {
    trainee,
  };
}

export default connect(mapStateToProps)(TraineeChooseCourseWithClassPage);
