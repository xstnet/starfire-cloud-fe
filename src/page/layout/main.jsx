import React from 'react';
import { Layout, Menu, Breadcrumb,Dropdown,Avatar,Table,Button,Space,Upload  } from 'antd';
import {
  PieChartOutlined,
  UserOutlined,
  DownOutlined,
  UploadOutlined,
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

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '大小',
      dataIndex: 'size',
    },
    {
      title: '修改时间',
      dataIndex: 'updateAt',
    },
  ];

  const data = [
      {
        key: 1,
        updateAt: "2021-09-13 23:35",
        size: "25.0KB",
        name: "readme.md",
        
      },
      {
        key: 2,
        updateAt: "2021-09-13 23:35",
        size: "-",
        name: "音乐",
      },
      {
        key: 3,
        updateAt: "2021-09-13 23:35",
        size: "35.0MB",
        name: "参考文档.doc",
      }
  ];

class MainLayout extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  start = () => {
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };


  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

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
                <Space>
                  <Upload>
                  <Button type="primary" icon={<UploadOutlined />} size="middle">
                  上传
                </Button>
                  </Upload>
                
                <Button type="primary" icon={<UploadOutlined />} size="middle">
                  创建文件夹
                </Button>
                </Space>
                
              </div>
              <div className="header-right fr">
                <ul>
                  <li className="fl">
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link2" onClick={e => e.preventDefault()}>
                    本地存储 <DownOutlined />
                    </a>
                </Dropdown>
                  </li>
                  <li className="fl">
                  <Dropdown overlay={menu}>
                      <div>
                          <Avatar size={50} icon={<UserOutlined />} />
                          醉丶春风 <DownOutlined />
                      </div>
                  </Dropdown>
                  </li>
                </ul>
              
               
                
              </div>
              <div className="clearboth"></div>
            
          </Header>
          <Breadcrumb className="bread-crumb">
              <Breadcrumb.Item>全部文件</Breadcrumb.Item>
              <Breadcrumb.Item>文件夹1</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="content">
            <div>
              <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;