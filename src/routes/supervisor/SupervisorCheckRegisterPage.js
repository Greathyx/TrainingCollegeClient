import React from 'react';
import {connect} from 'dva';
import {Table, Button} from 'antd';


class SupervisorCheckRegisterPage extends React.Component {

  constructor(props) {
    super(props);

    this.columns = [{
      title: '机构名称',
      dataIndex: 'name',
      width: 150,
      fixed: 'left'
    }, {
      title: '联系邮箱',
      dataIndex: 'email',
      width: 180,
    }, {
      title: '地址',
      width: 200,
      dataIndex: 'address',
    }, {
      title: '师资介绍',
      dataIndex: 'faculty',
    }, {
      title: '机构简介',
      dataIndex: 'introduction',
    }, {
      title: '批准',
      dataIndex: 'approve',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <span>
      <Button
        type="primary"
        onClick={() => {
          this.props.dispatch({
            type: 'supervisor/approveApply',
            payload: {
              type: "approveRegister",
              approve: {
                institution_apply_id: record.institution_apply_id,
              },
              email: {
                to: record.email,
                name: record.name
              }
            },
          });
          this.props.dispatch({
            type: 'supervisor/getAllRegisterApply',
            payload: {},
          });
          this.timer = setInterval(() => {
            window.location.reload(true);
          }, 1000);
        }}
      >
        批准
      </Button>
    </span>
      ),
    }, {
      title: '驳回',
      dataIndex: 'reject',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <span>
      <Button
        type="primary"
        onClick={() => {
          this.props.dispatch({
            type: 'supervisor/rejectApply',
            payload: {
              type: "rejectRegister",
              reject: {
                institution_apply_id: record.institution_apply_id,
              },
              email: {
                to: record.email,
                name: record.name
              }
            },
          });
          this.props.dispatch({
            type: 'supervisor/getAllRegisterApply',
            payload: {},
          });
          this.timer = setInterval(() => {
            window.location.reload(true);
          }, 1000);
        }}
      >
        驳回
      </Button>
    </span>
      ),
    }];
  }

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.supervisor.hasLoggedIn) {
      this.props.history.push("/SupervisorLogin");
    }
    this.props.dispatch({
      type: 'supervisor/getAllRegisterApply',
      payload: {},
    });
  }

  render() {
    const columns = this.columns;
    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Table
          pagination={{defaultPageSize: 5}}
          columns={columns}
          dataSource={this.props.supervisor.registerApplyData}
          scroll={{x: 1500}}/>
      </div>
    )
  }

}

function mapStateToProps({supervisor}) {
  return {
    supervisor,
  };
}

export default connect(mapStateToProps)(SupervisorCheckRegisterPage);
