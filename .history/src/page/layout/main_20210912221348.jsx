import React from 'react';
import { Layout, Menu, Breadcrumb,Dropdown,Avatar  } from 'antd';
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
  state = {
    collapsed: false,
  };


  render() {
    const { collapsed } = this.state;
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
                <div>
                    <Dropdown overlay={menu}>
                    <Avatar size={50} icon={<UserOutlined />} />
                    醉丶春风 <DownOutlined />
                    </Dropdown>
                </div>
              </div>
              <div className="clearboth"></div>
            
          </Header>
          <Breadcrumb className="bread-crumb">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="content">
            <div  style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;