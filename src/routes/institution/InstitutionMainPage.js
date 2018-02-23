import React from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Layout, Menu, Icon} from 'antd';
import styles from '../css/SupervisorMainPage.css';


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
    if (window.location.hash === "#/Institution/CourseInfo") {
      this.setState({
        defaultSelectedKeys: ['7'],
      })
    }
    else if (window.location.hash === "#/Institution/CourseRegistration") {
      this.setState({
        defaultSelectedKeys: ['5'],
      })
    }
    else if (window.location.hash === "#/Institution/ScoresRegistration") {
      this.setState({
        defaultSelectedKeys: ['11'],
      })
    }
    else if (window.location.hash === "#/Institution/ConfirmPayment") {
      this.setState({
        defaultSelectedKeys: ['6'],
      })
    }
    else if (window.location.hash === "#/Institution/ReleaseCourse") {
      this.setState({
        defaultSelectedKeys: ['4'],
      })
    }
    else if (window.location.hash === "#/Institution/BookedCourses") {
      this.setState({
        defaultSelectedKeys: ['8'],
      })
    }
    else if (window.location.hash === "#/Institution/UnsubscribeCourses") {
      this.setState({
        defaultSelectedKeys: ['9'],
      })
    }else if (window.location.hash === "#/Institution/EarningStatistics") {
      this.setState({
        defaultSelectedKeys: ['10'],
      })
    }

    else if (window.location.hash === "#/Institution/EditInfo") {
      this.setState({
        defaultSelectedKeys: ['3'],
      })
    }
  }

  handleClickMenu = (e) => {
    // 退出登录
    if (e.key === "12") {
      this.props.dispatch({
        type: 'institution/logout',
        payload: {},
      });
    }
    // 用reducers更新state，使页面重新渲染，以达到跳转目的；
    // 否则只有路由改变而页面未重新渲染，需要手动刷新才可获取新的界面
    this.props.dispatch({
      type: 'institution/changeSelectedKey',
      payload: {
        selectedKey: e.key
      },
    });
  };

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
            defaultOpenKeys={['1', '2']}
            defaultSelectedKeys={this.state.defaultSelectedKeys}
            onClick={this.handleClickMenu}
          >
            <SubMenu key="1" title={<span><Icon type="file-text"/><span>办公</span></span>}>
              <Menu.Item key="4"><Link to="/Institution/ReleaseCourse">课程发布</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/Institution/CourseRegistration">听课登记</Link></Menu.Item>
              <Menu.Item key="11"><Link to="/Institution/ScoresRegistration">成绩登记</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/Institution/ConfirmPayment">缴费确认</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="2" title={<span><Icon type="file-text"/><span>统计信息</span></span>}>
              <Menu.Item key="7"><Link to="/Institution/CourseInfo">课程信息</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/Institution/BookedCourses">订课信息</Link></Menu.Item>
              <Menu.Item key="9"><Link to="/Institution/UnsubscribeCourses">退课信息</Link></Menu.Item>
              <Menu.Item key="10"><Link to="/Institution/EarningStatistics">财务信息</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="3">
              <Link to="/Institution/EditInfo">
                <Icon type="edit"/>
                <span>修改信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="12">
              <Link to="/homepage">
                <Icon type="export"/>
                <span>退出登录</span>
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

function mapStateToProps({institution}) {
  return {
    institution,
  };
}

export default connect(mapStateToProps)(InstitutionMainPage);
