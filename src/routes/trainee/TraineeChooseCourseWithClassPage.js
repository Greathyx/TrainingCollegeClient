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
    errorMsg: '课程人数须至少1人且限额3人！',
  };
}

const CollectionCreateForm = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form, book_info, onAmountChange, trainee_amount} = props;
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
            <span>{book_info.discount + "折"}</span>
          </FormItem>
          <FormItem
            {...formItemLayout} label="最终支付"
          >
            <span>{book_info.price * book_info.book_amount * book_info.discount + "元"}</span>
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
            help={trainee_amount.errorMsg || "课程人数须至少1人且限额3人！"}
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
          <FormItem {...formItemLayout} label="学员信息">
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
    book_info: {
      price: -1,
      course_id: -1,
      institution_id: -1,
      discount: -1,
      book_amount: 1,
    },
  };

  // React组件初始化时自动调用的方法
  componentWillMount() {
    this.props.dispatch({
      type: 'trainee/getAllCourses',
      payload: {},
    }).then(() => {
      this.setState({
        data: this.props.trainee.courses
      });
    });
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

  // 打开确认订单对话框
  showModal = (book_info) => {
    // 已获取会员折扣后就不会再去后端申请获取数据
    if (this.props.trainee.discount === null) {
      this.props.dispatch({
        type: 'trainee/getTraineeVipInfo',
        payload: {
          trainee_id: this.props.trainee.trainee_id
        },
      });
      return;
    }
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
        payment: this.state.book_info.price * this.state.book_info.book_amount * this.state.book_info.discount,
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
              };
              this.showModal(param)
            }}
          >
            预定
          </Button>
        </span>)
    }];

    const trainee_amount = this.state.trainee_amount;

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 5}}
          columns={columns}
          dataSource={this.state.data}
          scroll={{x: 2400}}
        />
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          book_info={this.state.book_info}
          onAmountChange={this.onAmountChange}
          trainee_amount={trainee_amount}
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
