import React from 'react';
import {Link} from 'dva/router';
import {Layout, Menu, Icon} from 'antd';
import styles from '../css/SupervisorMainPage.css';


const {Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;

class SupervisorMainPage extends React.Component {

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
    if (window.location.hash === "#/Supervisor/CheckRegister") {
      this.setState({
        defaultSelectedKeys: ['4'],
      })
    }
    else if (window.location.hash === "#/Supervisor/CheckModify") {
      this.setState({
        defaultSelectedKeys: ['5'],
      })
    }
    else if (window.location.hash === "#/Supervisor/InstitutionsInfo") {
      this.setState({
        defaultSelectedKeys: ['9'],
      })
    }
    else if (window.location.hash === "#/Supervisor/SettlePayment") {
      this.setState({
        defaultSelectedKeys: ['2'],
      })
    }
    else if (window.location.hash === "#/Supervisor/EarningStatistics") {
      this.setState({
        defaultSelectedKeys: ['6'],
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
            defaultOpenKeys={['1', '3']}
            defaultSelectedKeys={this.state.defaultSelectedKeys}
          >
            <SubMenu key="1" title={<span><Icon type="file-text"/><span>机构审核</span></span>}>
              <Menu.Item key="4"><Link to="/Supervisor/CheckRegister">注册信息审核</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/Supervisor/CheckModify">修改信息审核</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/Supervisor/InstitutionsInfo">已注册机构</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <Link to="/Supervisor/SettlePayment">
                <Icon type="pay-circle"/>
                <span>金额结算</span>
              </Link>
            </Menu.Item>
            <SubMenu key="3" title={<span><Icon type="area-chart"/><span>统计信息</span></span>}>
              <Menu.Item key="6"><Link to="/Supervisor/EarningStatistics">若水财务</Link></Menu.Item>
              <Menu.Item key="7"><Link to="">机构统计</Link></Menu.Item>
              <Menu.Item key="8"><Link to="">学员统计</Link></Menu.Item>
            </SubMenu>
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

export default SupervisorMainPage;
