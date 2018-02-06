import React from 'react';
import { Link } from 'dva/router';
import {Layout, Button, Dropdown, Menu, Icon} from 'antd';
import styles from './css/HomePage.css';

const {Sider, Content} = Layout;

/**
 * 学员菜单
 * @type {XML}
 */
const menu_trainee = (
  <Menu>
    <Menu.Item key="1"><Link to="/TraineeLogin">登陆</Link></Menu.Item>
    <Menu.Item key="2"><Link to="/TraineeRegister">注册</Link></Menu.Item>
  </Menu>
);

/**
 * 机构菜单
 * @type {XML}
 */
const menu_institution = (
  <Menu>
    <Menu.Item key="1">登陆</Menu.Item>
    <Menu.Item key="2">注册</Menu.Item>
  </Menu>
);

/**
 * 管理者菜单
 * @type {XML}
 */
const menu_supervisor = (
  <Menu>
    <Menu.Item key="1"><Link to="/SupervisorLogin">登陆</Link></Menu.Item>
  </Menu>
);


class HomePage extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user"/>
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera"/>
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload"/>
              <span>nav 3</span>
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
            <p className={styles.text}>
              若水教育
            </p>
            <div className={styles.buttons}>
              <Dropdown overlay={menu_trainee}>
                <Button type="primary" className={styles.singleButton}>
                  学员 <Icon type="down"/>
                </Button>
              </Dropdown>
              <Dropdown overlay={menu_institution}>
                <Button type="primary" className={styles.singleButton}>
                  机构 <Icon type="down"/>
                </Button>
              </Dropdown>
              <Dropdown overlay={menu_supervisor}>
                <Button type="primary" className={styles.singleButton}>
                  管理员 <Icon type="down"/>
                </Button>
              </Dropdown>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default HomePage;
