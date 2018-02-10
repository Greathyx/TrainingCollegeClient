import React from 'react';
import {Link} from 'dva/router';
import {Layout, Menu, Icon} from 'antd';
import styles from './css/SupervisorMainPage.css';


const {Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;

class InstitutionMainPage extends React.Component {

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
    if (window.location.hash === "#/Institution/EditInfo") {
      this.setState({
        defaultSelectedKeys: ['3'],
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
          style={{overflow: 'auto', height: '100vh', left: 0}}
        >
          <div className={styles.logo}/>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={['1']}
            defaultSelectedKeys={this.state.defaultSelectedKeys}
          >
            <SubMenu key="1" title={<span><Icon type="file-text"/><span>机构审核</span></span>}>
              <Menu.Item key="4">审核注册信息</Menu.Item>
              <Menu.Item key="5">审核修改信息</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <Icon type="pay-circle"/>
              <span>结算金额</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/Institution/EditInfo">
                <Icon type="edit"/>
                <span>修改机构信息</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
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

export default InstitutionMainPage;
