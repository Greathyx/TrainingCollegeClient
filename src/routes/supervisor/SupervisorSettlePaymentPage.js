import React from 'react';
import {connect} from 'dva';
import {Table, Button, Modal} from 'antd';


/**
 * 精度准确的减法
 *
 * @param arg1 被减数
 * @param arg2 减数
 * @returns {string} 结果
 */
function accSub(arg1, arg2) {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

class SupervisorSettlePaymentPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      payment_info: {
        institutionID: null,
        course_earning: null,
        actual_earning: null,
      }
    };

    this.columns = [{
      title: '机构名称',
      dataIndex: 'institutionName',
    }, {
      title: '累计盈利金额(¥)',
      dataIndex: 'institution_earning',
      // fixed: 'right',
    }, {
      title: '待结算金额(¥)',
      dataIndex: 'course_earning',
      // fixed: 'right',
    }, {
      title: '结算',
      dataIndex: 'settle',
      render: (text, record) => (
        <span>
      <Button
        type="primary"
        onClick={() => {
          const param = {
            institutionID: record.institutionID,
            course_earning: record.course_earning,
            actual_earning: record.actual_earning,
          };
          this.showSettleModal(param, this.settlePayment)
        }}
      >
        结算
      </Button>
    </span>
      ),
    }];
  }

  // React组件初始化时自动调用的方法
  componentWillMount() {
    this.props.dispatch({
      type: 'supervisor/getToSettleList',
      payload: {},
    });
  }

  // 打开确认结算对话框
  showSettleModal = (payment_info, settlePayment) => {
    this.setState({
      payment_info: payment_info,
    });

    Modal.confirm({
      title: '金额结算确认',
      content: (
        <div>
          <p>将结算金额(¥)：{payment_info.actual_earning}</p>
          <p>"若水"教育所得金额(¥)：{accSub(payment_info.course_earning, payment_info.actual_earning)}</p>
        </div>
      ),
      okText: '确认',
      cancelText: "取消",
      onOk: settlePayment,
    });
  };

  // 结算金额方法
  settlePayment = () => {
    this.props.dispatch({
      type: 'supervisor/settlePayment',
      payload: {
        institutionID: this.state.payment_info.institutionID,
        course_earning: this.state.payment_info.course_earning
      },
    });
    // 1s后刷新本页面
    this.timer = setInterval(() => {
      window.location.reload(true);
    }, 1000);
  };

  render() {
    const columns = this.columns;
    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 10}}
          columns={columns}
          dataSource={this.props.supervisor.toSettleList}
        />
      </div>
    )
  }

}

function mapStateToProps({supervisor}) {
  return {
    supervisor,
  };
}

export default connect(mapStateToProps)(SupervisorSettlePaymentPage);
