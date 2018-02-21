import React from 'react';
// import {connect} from 'dva';
import {Link} from 'dva/router';
// import {Layout, Menu, Icon, Badge} from 'antd';
import {Layout, Menu, Icon} from 'antd';
import styles from '../css/SupervisorMainPage.css';


const {Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;

class TraineeMainPage extends React.Component {

  state = {
    collapsed: false,
    defaultSelectedKeys: ['4'],
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // React组件初始化时自动调用的方法
  componentWillMount() {
    if (window.location.hash === "#/Trainee/ChooseCourseWithClass") {
      this.setState({
        defaultSelectedKeys: ['5'],
      })
    }
    else if (window.location.hash === "#/Trainee/ChooseCourseWithoutClass") {
      this.setState({
        defaultSelectedKeys: ['6'],
      })
    }
    else if (window.location.hash === "#/Trainee/NotPaidOrders") {
      this.setState({
        defaultSelectedKeys: ['11'],
      })
    }
    else if (window.location.hash === "#/Trainee/PaidOrders") {
      this.setState({
        defaultSelectedKeys: ['12'],
      })
    }
    else if (window.location.hash === "#/Trainee/UnsubscribeOrders") {
      this.setState({
        defaultSelectedKeys: ['13'],
      })
    }
    else if (window.location.hash === "#/Trainee/CourseRegistration") {
      this.setState({
        defaultSelectedKeys: ['7'],
      })
    }
    else if (window.location.hash === "#/Trainee/Scores") {
      this.setState({
        defaultSelectedKeys: ['8'],
      })
    }
    else if (window.location.hash === "#/Trainee/ConsumptionStatistics") {
      this.setState({
        defaultSelectedKeys: ['2'],
      })
    }
    else if (window.location.hash === "#/Trainee/VipCenter") {
      this.setState({
        defaultSelectedKeys: ['9'],
      })
    }
    else if (window.location.hash === "#/Trainee/EditInfo") {
      this.setState({
        defaultSelectedKeys: ['4'],
      })
    }
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{overflow: 'auto', minHeight: '100vh', left: 0}}
        >
          <div className={styles.logo}/>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={['1', '3', '10']}
            defaultSelectedKeys={this.state.defaultSelectedKeys}
          >
            <SubMenu key="1" title={<span><Icon type="book"/><span>预定课程</span></span>}>
              <Menu.Item key="5"><Link to="/Trainee/ChooseCourseWithClass">选班级</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/Trainee/ChooseCourseWithoutClass">不选班级</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="10" title={<span><Icon type="file-text"/><span>我的订单</span></span>}>
              <Menu.Item key="11">
                {/*<Badge count={this.props.trainee.notPaidOrders.length} overflowCount={10} offset={[-2,12]}>*/}
                <Link to="/Trainee/NotPaidOrders">未支付订单</Link>
                {/*</Badge>*/}
              </Menu.Item>
              <Menu.Item key="12"><Link to="/Trainee/PaidOrders">已支付订单</Link></Menu.Item>
              <Menu.Item key="13"><Link to="/Trainee/UnsubscribeOrders">已退课订单</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="3" title={<span><Icon type="area-chart"/><span>统计信息</span></span>}>
              <Menu.Item key="7"><Link to="/Trainee/CourseRegistration">听课记录</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/Trainee/Scores">个人成绩</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/Trainee/ConsumptionStatistics">消费统计</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/Trainee/VipCenter">会员中心</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="4">
              <Link to="/Trainee/EditInfo">
                <Icon type="edit"/>
                <span>修改信息</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{backgroundColor: 'white'}}>
          <Content className={styles.content}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            {React.cloneElement(this.props.children)}
          </Content>
        </Layout>
      </Layout>
    );
  }

}

// function mapStateToProps({trainee}) {
//   return {
//     trainee,
//   };
// }

// export default connect(mapStateToProps)(TraineeMainPage);
export default TraineeMainPage;
