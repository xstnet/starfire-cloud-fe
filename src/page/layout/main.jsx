import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { saveUserInfo } from '../../store/reducer/user/action';
import Cache from '../../util/cache';
import FileList from '../file/index';
import {
  PieChartOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import './main.less';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;


const menu = (
  <Menu >
    <Menu.Item key="1">
      本地存储
    </Menu.Item>
    <Menu.Item key="2">
      阿里云OSS
    </Menu.Item>
    <Menu.Item key="3">
      腾讯云OSS
    </Menu.Item>
  </Menu>
);

class MainLayout extends React.Component {
  state = {};

  componentWillMount() {
    console.log('componentWillMount');
    // 未登录，跳转到登录页面
    if (parseInt(Cache.get('isLogin')) !== 1) {
      this.props.history.replace('/login');
      return false;
    }

    let userInfo = Cache.getJson('userInfo');
    if (!userInfo || !userInfo.id) {
      this.props.history.replace('/login');
      return false;
    }
    // 加载用户信息

    this.props.saveUserInfo(userInfo);
  }



  render() {

    return (
      <Layout className="main" style={{ minHeight: '100vh' }}>
        <Sider className="side-left" theme="light" >
          <div className="logo">
            星火云盘
          </div>
          <Menu defaultSelectedKeys={['all']} defaultOpenKeys={["my-file"]} mode="inline">
            <SubMenu key="my-file" icon={<UserOutlined />} title="我的文件">
              <Menu.Item key="all">全部文件</Menu.Item>
              <Menu.Item key="doc">文档</Menu.Item>
              <Menu.Item key="imgage">图片</Menu.Item>
              <Menu.Item key="audio">音频</Menu.Item>
              <Menu.Item key="video">视频</Menu.Item>
              <Menu.Item key="other">其他</Menu.Item>
            </SubMenu>
            <Menu.Item key="favorite" icon={<PieChartOutlined />}>
              收藏夹
            </Menu.Item>
            <Menu.Item key="share" icon={<PieChartOutlined />}>
              我的分享
            </Menu.Item>
            <Menu.Item key="recycle" icon={<PieChartOutlined />}>
              回收站
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="side-right">
          <Header className="header">
            <div className="header-left fl">
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link2" onClick={e => e.preventDefault()}>
                  本地存储 <DownOutlined />
                </a>
              </Dropdown>

            </div>
            <div className="header-right fr">
              <ul>
                <li className="fl">
                  <Dropdown overlay={menu}>
                    <div>
                      <Avatar size={50} icon={<UserOutlined />} />
                      {/* 醉丶春风 <DownOutlined /> */}
                      {this.props.user.userInfo.nickname} <DownOutlined />
                    </div>
                  </Dropdown>
                </li>
              </ul>
            </div>
            <div className="clearboth"></div>

          </Header>
          <Content className="content">
            <Switch>
              {/* <Route path='/favorite' component={Favorite}/> */}
              {/* <Route path='/recycle/bin' component={RecycleBinList}/> */}
              {/* <Route path='/share' component={Share}/> */}
              <Route path='/' component={FileList} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  file: state.File,
  user: state.User,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
