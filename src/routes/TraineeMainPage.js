import React from 'react';
import {Link} from 'dva/router';
import {Layout, Menu, Icon} from 'antd';
import styles from './css/SupervisorMainPage.css';


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
    if (window.location.hash === "#/Trainee/EditInfo") {
      this.setState({
        defaultSelectedKeys: ['4'],
      })
    }
    // else if (window.location.hash === "#/Supervisor/CheckModify"){
    //   this.setState({
    //     defaultSelectedKeys: ['5'],
    //   })
    // }
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
            defaultOpenKeys={['1', '3']}
            defaultSelectedKeys={this.state.defaultSelectedKeys}
          >
            <SubMenu key="1" title={<span><Icon type="file-text"/><span>预定课程</span></span>}>
              <Menu.Item key="5">选班级</Menu.Item>
              <Menu.Item key="6">不选班级</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <Icon type="export"/>
              <span>退定课程</span>
            </Menu.Item>
            <SubMenu key="3" title={<span><Icon type="area-chart"/><span>统计信息</span></span>}>
              <Menu.Item key="7">订单状态</Menu.Item>
              <Menu.Item key="8">个人成绩</Menu.Item>
              <Menu.Item key="9">会员信息</Menu.Item>
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

export default TraineeMainPage;