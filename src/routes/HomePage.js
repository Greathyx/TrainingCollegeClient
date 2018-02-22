import React from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
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
    <Menu.Item key="1"><Link to="/InstitutionLogin">登陆</Link></Menu.Item>
    <Menu.Item key="2"><Link to="/InstitutionRegister">注册</Link></Menu.Item>
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

  handleClickSideMenu = (e) => {
    if (e.key === "1") {
      if (this.props.trainee.hasLoggedIn) {
        this.props.history.push("/Trainee/ChooseCourseWithClass");
      }
      else {
        this.props.history.push("/TraineeLogin");
      }
    }
    else if (e.key === "2") {
      if (this.props.institution.hasLoggedIn) {
        this.props.history.push("/Institution/CourseInfo");
      }
      else {
        this.props.history.push("/InstitutionLogin");
      }
    }
    else if (e.key === "3") {
      if (this.props.supervisor.hasLoggedIn) {
        this.props.history.push("/Supervisor/CheckRegister");
      }
      else {
        this.props.history.push("/SupervisorLogin");
      }
    }
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
          <Menu theme="dark" mode="inline" onClick={this.handleClickSideMenu}>
            <Menu.Item key="1">
              <Icon type="user"/><span>会员</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="shop"/><span>机构</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="safety"/><span>管理员</span>
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
                  会员 <Icon type="down"/>
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

function mapStateToProps({trainee, institution, supervisor}) {
  return {
    trainee, institution, supervisor,
  };
}

export default connect(mapStateToProps)(HomePage);
