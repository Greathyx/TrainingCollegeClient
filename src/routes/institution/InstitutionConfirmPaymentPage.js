import React from 'react';
import {connect} from 'dva';
import {Input, Table, Icon, Tooltip} from 'antd';


const Search = Input.Search;

class InstitutionConfirmPaymentPage extends React.Component {

  // React组件初始化时自动调用的方法
  componentWillMount() {
    // 如果未登录，则跳转到登陆界面
    if (!this.props.institution.hasLoggedIn) {
      this.props.history.push("/InstitutionLogin");
    }
    this.props.dispatch({
      type: 'institution/getAllTraineeInfo',
      payload: {
        institutionID: this.props.institution.institution_id,
        status: "paid"
      },
    }).then(() => {
      this.setState({
        data: this.props.institution.trainee_all_discount_info
      });
    });
  }

  state = {
    data: [],
  };

  getTraineeInfoByName = (name) => {
    if (name === "") {
      this.setState({
        data: this.props.institution.trainee_all_discount_info
      });
      return;
    }

    this.props.dispatch({
      type: 'institution/getTraineeInfoByName',
      payload: {
        name: name
      },
    }).then(() => {
      this.setState({
        data: this.props.institution.trainee_discount_info
      })
    });
  };

  render() {

    const columns = [{
      title: '学员名字',
      dataIndex: 'trainee_name',
      // width: 150,
      // fixed: 'left'
    }, {
      title: '学员邮箱',
      // width: 160,
      dataIndex: 'email',
    }, {
      title: '学员等级',
      // width: 160,
      dataIndex: 'level',
    }, {
      title: '优惠折扣',
      // width: 100,
      dataIndex: 'discount',
    }];

    return (
      <div style={{padding: '0 50px 20px 50px', backgroundColor: 'white'}}>
        <Tooltip
          placement="bottomLeft"
          title={
            <div>
              <p>1. 本搜索范围为所有在"若水"教育网站上注册过的会员</p>
              <p>2. 清空搜索内容再按搜索键，可显示全部在本机构订过课程的学员的优惠信息</p>
            </div>
          }
        >
          <Icon type="exclamation-circle-o" style={{marginRight: 8}}/>
        </Tooltip>
        <Search
          placeholder="请输入学员姓名"
          onSearch={value => {
            this.getTraineeInfoByName(value)
          }}
          enterButton
          style={{width: 300}}
        />
        <Table
          pagination={{defaultPageSize: 10}}
          columns={columns}
          dataSource={this.state.data}
          style={{marginTop: 20}}
          // scroll={{x: 2000}}
        />
      </div>
    )
  }

}

function mapStateToProps({institution}) {
  return {
    institution,
  };
}

export default connect(mapStateToProps)(InstitutionConfirmPaymentPage);
