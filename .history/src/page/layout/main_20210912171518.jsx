import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './main.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };


  render() {
    const { collapsed } = this.state;
    return (
      <Layout className="main" style={{ minHeight: '100vh' }}>
        <Sider className="side-left" theme="light" >
          <div className="logo">
              logo logo
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
          <Header className="header"/>
          <Breadcrumb className="bread-crumb">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="content">
            <div  style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;