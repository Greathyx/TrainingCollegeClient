import React from 'react';
import {connect} from 'dva';
import {Table, Button} from 'antd';


// const columns = [{
//   title: '机构名称',
//   dataIndex: 'name',
//   width: 100,
//   fixed: 'left'
// }, {
//   title: '联系邮箱',
//   dataIndex: 'email',
//   width: 180,
// }, {
//   title: '地址',
//   width: 200,
//   dataIndex: 'address',
// }, {
//   title: '师资介绍',
//   dataIndex: 'faculty',
// }, {
//   title: '机构简介',
//   dataIndex: 'introduction',
// }, {
//   title: '批准',
//   dataIndex: 'approve',
//   width: 100,
//   fixed: 'right',
//   render: (text, record) => (
//     <span>
//       <Button
//         type="primary"
//         onClick={()=>{
//           console.log(record.email)
//         }}
//       >
//         批准
//       </Button>
//     </span>
//   ),
// }, {
//   title: '驳回',
//   dataIndex: 'reject',
//   width: 100,
//   fixed: 'right',
//   render: (text, record) => (
//     <span>
//       <Button
//         type="primary"
//         onClick={()=>{
//           this.props.dispatch({
//             type: 'supervisor/rejectApply',
//             payload: {
//               institution_apply_id: record.institution_apply_id
//             },
//           });
//           this.props.dispatch({
//             type: 'supervisor/sendReplyMail',
//             payload: {
//               to: record.email,
//               title: "机构注册失败提醒",
//               content: "尊敬的" + record.name +
//               "，我们很抱歉地通知您，贵机构未能成功注册\"若水\"教育。详情请致电我们的客服：012-3456-7878。"
//             },
//           });
//           this.props.dispatch({
//             type: 'supervisor/getAllRegisterApply',
//             payload: {},
//           });
//         }}
//       >
//         驳回
//       </Button>
//     </span>
//   ),
// }];

class SupervisorCheckPage extends React.Component {

  constructor(props) {
    super(props);

    this.columns = [{
      title: '机构名称',
      dataIndex: 'name',
      width: 100,
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

export default connect(mapStateToProps)(SupervisorCheckPage);
