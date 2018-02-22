import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {Input, Table, Tabs, Button, Tooltip, Icon, Modal, Form, DatePicker, TimePicker} from 'antd';
import styles from '../css/TraineeChooseCourseWithClassPage.css';


const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

// 将今天及之前的日期设置为不可选
function disabledDateBeforeToday(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

const RegistrationForm = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form} = props;
    const {getFieldDecorator} = form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };

    return (
      <Modal
        visible={visible}
        title="登记听课日期"
        okText="确认"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical" style={{width: '100%', marginTop: 20, marginLeft: 30}}>
          <FormItem {...formItemLayout} label="登记日期">
            {getFieldDecorator('registration_date', {
              initialValue: moment(new Date(), 'YY-mm-dd'),
              rules: [{required: true, message: '请输入听课登记日期！'}],
            })(
              <DatePicker
                disabledDate={disabledDateBeforeToday}
                placeholder="请选择日期"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="登记时间">
            {getFieldDecorator('registration_time', {
              initialValue: moment(new Date(), 'HH:mm:ss'),
              rules: [{required: true, message: '请输入听课登记时间！'}],
            })(
              <TimePicker
                placeholder="请选择时间"
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);


class InstitutionCourseRegistrationPage extends React.Component {

  state = {
    filterDropdownVisible: false,
    data: [],
    searchText: '',
    filtered: false,
    visible: false,
    registration_info: {
      traineeID: null,
      courseID: null,
      traineeName: null,
      courseName: null,
      institutionName: null,
    },
    filterDropdownVisible_record: false,
    data_record: [],
    searchText_record: '',
    filtered_record: false,
  };

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.institution.hasLoggedIn) {
      this.props.history.push("/InstitutionLogin");
    }
    this.props.dispatch({
      type: 'institution/getAllBookedOrders',
      payload: {
        institutionID: this.props.institution.institution_id,
        status: "paid"
      },
    }).then(() => {
      this.setState({
        data: this.props.institution.booked_courses
      });
    });
  }

  // 点击tab标签的监听
  tab_callback = (key) => {
    if (key === "1" && this.props.institution.booked_courses.length === 0) {
      this.props.dispatch({
        type: 'institution/getAllBookedOrders',
        payload: {
          institutionID: this.props.institution.institution_id,
          status: "paid"
        },
      }).then(() => {
        this.setState({
          data: this.props.institution.booked_courses
        });
      });
    }
    if (key === "2" && this.props.institution.registration_list.length === 0) {
      this.props.dispatch({
        type: 'institution/getAllRegistrationInfo',
        payload: {
          institutionID: this.props.institution.institution_id,
        },
      }).then(() => {
        this.setState({
          data_record: this.props.institution.registration_list
        });
      });
    }
  };

  // 打开听课登记对话框
  showRegistrationModal = (param) => {
    this.setState({
      visible: true,
      registration_info: param,
    });
  };

  // 取消登记时间，关闭对话框
  handleCancel = () => {
    this.setState({visible: false});
  };

  // 提交听课登记时间
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const param = {
        traineeID: this.state.registration_info.traineeID,
        courseID: this.state.registration_info.courseID,
        traineeName: this.state.registration_info.traineeName,
        courseName: this.state.registration_info.courseName,
        institutionName: this.state.registration_info.institutionName,
        institutionID: this.props.institution.institution_id,
        registration_date: values['registration_date'].format('YYYY-MM-DD') + " " + values['registration_time'].format('HH:mm:ss'),
      };
      this.props.dispatch({
        type: 'institution/courseRegistration',
        payload: {
          ...param,
        },
      });
      // 更新听课登记表
      this.props.dispatch({
        type: 'institution/getAllRegistrationInfo',
        payload: {
          institutionID: this.props.institution.institution_id,
        },
      }).then(value => {
        if (value) {
          this.setState({
            data_record: this.props.institution.registration_list
          });
        }
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

  // 按名字搜索学员以便登记该学员听课日期
  onSearch = () => {
    const {searchText} = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.props.institution.booked_courses.map((record) => {
        const match = record.trainee_name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          trainee_name: (
            <span>
              {record.trainee_name.split(reg).map((text, i) => (
                i > 0 ? [<span key={record.key} className={styles.highlight}>{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };

  onInputChange_record = (e) => {
    this.setState({searchText_record: e.target.value});
  };

  // 按名字搜索学员以便查看该学员听课登记记录
  onSearch_record = () => {
    const {searchText_record} = this.state;
    const reg = new RegExp(searchText_record, 'gi');
    this.setState({
      filterDropdownVisible_record: false,
      filtered: !!searchText_record,
      data_record: this.props.institution.registration_list.map((record) => {
        const match = record.trainee_name2.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          trainee_name2: (
            <span>
              {record.trainee_name2.split(reg).map((text, i) => (
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
      title: '学员名字',
      dataIndex: 'trainee_name',
      filterDropdown: (
        <div className={styles.custom_filter_dropdown}>
          <Tooltip title="清空搜索内容再按搜索键，可显示所有学员列表">
            <Icon type="exclamation-circle-o" style={{marginRight: 8}}/>
          </Tooltip>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="搜索学员姓名"
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
    }, {
      title: '听课登记',
      dataIndex: 'registration',
      render: (text, record) => (
        <span>
      <Button
        type="primary"
        onClick={() => {
          const param = {
            traineeID: record.traineeID,
            courseID: record.courseID,
            traineeName: record.trainee_name,
            courseName: record.course_name,
            institutionName: record.institution_name
          };
          this.showRegistrationModal(param)
        }}
      >
        登记时间
      </Button>
    </span>
      ),
    }];

    const columns2 = [{
      title: '学员名字',
      dataIndex: 'trainee_name2',
      filterDropdown: (
        <div className={styles.custom_filter_dropdown}>
          <Tooltip title="清空搜索内容再按搜索键，可显示所有学员列表">
            <Icon type="exclamation-circle-o" style={{marginRight: 8}}/>
          </Tooltip>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="搜索学员姓名"
            value={this.state.searchText_record}
            onChange={this.onInputChange_record}
            onPressEnter={this.onSearch_record}
          />
          <Button type="primary" onClick={this.onSearch_record}>搜索</Button>
        </div>
      ),
      filterIcon: <Icon type="smile-o" style={{color: this.state.filtered_record ? '#108ee9' : '#aaa'}}/>,
      filterDropdownVisible: this.state.filterDropdownVisible_record,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible_record: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    }, {
      title: '课程名称',
      dataIndex: 'course_name2',
    }, {
      title: '登记时间',
      dataIndex: 'registration_date',
    }];

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Tabs defaultActiveKey="1" onChange={this.tab_callback}>
          <TabPane tab="听课登记" key="1">
            <Table
              pagination={{defaultPageSize: 10}}
              columns={columns}
              dataSource={this.state.data}
              style={{marginTop: 20}}
            />
            <RegistrationForm
              ref={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
          </TabPane>
          <TabPane tab="查看登记表" key="2">
            <Table
              pagination={{defaultPageSize: 10}}
              columns={columns2}
              dataSource={this.state.data_record}
              style={{marginTop: 20}}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }

}

function mapStateToProps({institution}) {
  return {
    institution,
  };
}

export default connect(mapStateToProps)(InstitutionCourseRegistrationPage);
