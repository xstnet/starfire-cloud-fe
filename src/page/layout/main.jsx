import React from 'react';
import {connect} from 'react-redux';
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Table, Button, Space, Upload, Radio } from 'antd';
import moment from 'moment'; 
import { saveUserInfo } from '../../store/reducer/user/action';
import { getFileList } from '../../api/file';
import { stopEventBubble } from '../../util/util';
import Cache from '../../util/cache';
import {
  PieChartOutlined,
  UserOutlined,
  DownOutlined,
  UploadOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  FolderAddOutlined,
  DeleteOutlined,
  StarFilled,
  StarOutlined,
  EditOutlined,
} from '@ant-design/icons';
import './main.less';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Column, ColumnGroup } = Table;

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

const fileOperation = (
  <Menu>
    <Menu.Item key="move">移动</Menu.Item>
    <Menu.Item key="delete">删除</Menu.Item>
    <Menu.Item key="rename">重命名</Menu.Item>
    <Menu.Item key="favorite">收藏</Menu.Item>
  </Menu>
)

class MainLayout extends React.Component {
  state = {
    selectedRowKeys: [],
    dirStack: [
      {
        name: '文件夹1',
        id: 1,
      },
      {
        name: '文件夹2',
        id: 1,
      },
      {
        name: '文件夹3',
        id: 1,
      }
    ],
  };

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

  componentDidMount() {
    this.props.getFileList();
  }

  start = () => {
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
      });
    }, 1000);
  };

  test() {
    console.log('test');
  }



  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  onRow = record => {
    return {
      onClick: e => {
        console.log(e);
        console.log(record);
        let index = this.state.selectedRowKeys.indexOf(record.key);
        if (index >= 0) {
          this.state.selectedRowKeys.splice(index, 1)
        } else {
          this.state.selectedRowKeys.push(record.key)
        }
        this.setState({ selectedRowKeys: [...this.state.selectedRowKeys] })
      },
      onMouseEnter: e => {
        console.log(323)
      }
    }
  }

  // onRow={record => {
  //   return {
  //     onClick: event => {}, // 点击行
  //     onDoubleClick: event => {},
  //     onContextMenu: event => {},
  //     onMouseEnter: event => {}, // 鼠标移入行
  //     onMouseLeave: event => {},
  //   };
  // }}

  renderDirStack() {
    return [
      <Breadcrumb.Item key='all'>全部文件</Breadcrumb.Item>,
      ...this.state.dirStack.map(item => {
        return <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
      })
    ]
  }

  renderBreadCrumb() {
    console.log('keylen:', this.state.selectedRowKeys.length);
    if (this.state.selectedRowKeys.length > 0) {
      console.log(222);
      return <Breadcrumb.Item key='selected'>已选择{this.state.selectedRowKeys.length}个文件/文件夹 </Breadcrumb.Item>
    }

    console.log(1111);

    return this.renderDirStack()
  }


  render() {
    console.log(this.props);
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '大小',
        dataIndex: 'file.size',
        render: (text, record) => {
          if (record.is_dir === 1) {
            return '-';
          }
          return record.file.size;
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => {
          return <span onClick={e => stopEventBubble(e)}>
            <Space>
              <a onClick={e => stopEventBubble(e)} title="分享" href="22"><ShareAltOutlined /></a>
              <a onClick={e => stopEventBubble(e)} title="下载" href="22"><DownloadOutlined /></a>
              <Dropdown overlay={fileOperation} trigger={['click']}>
                <a title="更多" className="ant-dropdown-link" onClick={e => stopEventBubble(e)}>
                  <EllipsisOutlined />
                </a>
              </Dropdown>
            </Space>
          </span>
        },
      },
      {
        title: '修改时间',
        dataIndex: 'updated_at',
        render: text => {
          return moment(text*1000).format('YYYY-MM-DD HH:mm');
        }
      },
    ];

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

          <div className="action-bar">
            <Space>
              <Upload>
                <Button type="primary" icon={<UploadOutlined />} size="middle">
                  上传
                </Button>
              </Upload>

              <Button type="primary" icon={<FolderAddOutlined />} size="middle">
                新建
              </Button>

              <div className={`action-file-bar ${this.state.selectedRowKeys.length > 0 ? '' : 'hide'}`}>
                <Button className={`${this.state.selectedRowKeys.length === 1 ? '' : 'hide'}`} type="primary" icon={<DownloadOutlined />} size="middle">下载 </Button>
                <Button className={`${this.state.selectedRowKeys.length > 1 ? '' : 'hide'}`} type="primary" icon={<DownloadOutlined />} size="middle">打包下载 </Button>
                <Button className={`${this.state.selectedRowKeys.length === 1 ? '' : 'hide'}`} type="primary" icon={<ShareAltOutlined />} size="middle">分享 </Button>
                <Button type="primary" icon={<DeleteOutlined />} size="middle">删除 </Button>
                <Button className={`${this.state.selectedRowKeys.length === 1 ? '' : 'hide'}`} type="primary" icon={<EditOutlined />} size="middle">重命名 </Button>
                <Button type="primary" icon={<FolderAddOutlined />} size="middle">移动 </Button>
                <Button type="primary" icon={<StarOutlined />} size="middle">收藏 </Button>
              </div>
            </Space>
          </div>

          <Breadcrumb className="bread-crumb">
            {this.renderBreadCrumb()}
          </Breadcrumb>

          <Content className="content">
            <div>
              <div>
                <Table rowKey='id' onRow={this.onRow} size="middle" pagination={false} rowSelection={rowSelection} columns={columns} dataSource={this.props.file.fileList} />
              </div>
            </div>
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
  getFileList: () => dispatch(getFileList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
