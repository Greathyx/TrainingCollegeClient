import React from 'react';
import {connect} from 'dva';
import {Table} from 'antd';


class SupervisorInstitutionsInfoPage extends React.Component {

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
    }];
  }

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.supervisor.hasLoggedIn) {
      this.props.history.push("/SupervisorLogin");
    }
    this.props.dispatch({
      type: 'supervisor/getInstitutionsInfo',
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
          dataSource={this.props.supervisor.institutions_info}
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

export default connect(mapStateToProps)(SupervisorInstitutionsInfoPage);
