import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Dropdown, Table, Button, Space, Upload, Menu } from 'antd';
import moment from 'moment';
import { stopEventBubble, renderSize } from '../../util/util';
import { getFileList } from '../../api/file';
import './index.less';
import {
  UploadOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  FolderAddOutlined,
  DeleteOutlined,
  StarOutlined,
  EditOutlined,
} from '@ant-design/icons';

const fileOperation = (
  <Menu>
    <Menu.Item key="move">移动</Menu.Item>
    <Menu.Item key="delete">删除</Menu.Item>
    <Menu.Item key="rename">重命名</Menu.Item>
    <Menu.Item key="favorite">收藏</Menu.Item>
  </Menu>
)


class FileList extends React.Component {

  state = {
    selectedRowKeys: [],
    dirStack: [
      {
        name: '全部文件',
        id: 0,
      }
    ],

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

  onBreadCrumbClick = id => {
    this.popDirStack(id);
  }

  pushDirStack = (id, name) => {
    this.setState({dirStack: [...this.state.dirStack, {id, name}]});
  }

  popDirStack = id => {
    let index = this.state.dirStack.findIndex(v => v.id === id);
    if (index === -1) {
      return;
    }

    this.setState({dirStack: this.state.dirStack.slice(0, index+1)});
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
    return this.state.dirStack.map(item => {
      // return <Breadcrumb.Item key={item.id}><a href="javascript:void(0)" onClick={this.onBreadCrumbClick.bind(this,item.id)}>{item.name}</a></Breadcrumb.Item>
      return <Breadcrumb.Item key={item.id}><a href="javascript:void(0)" onClick={() => this.onBreadCrumbClick(item.id)}>{item.name}</a></Breadcrumb.Item>
    })
  }

  renderBreadCrumb() {
    console.log('keylen:', this.state.selectedRowKeys.length);
    if (this.state.selectedRowKeys.length > 0) {
      return <Breadcrumb.Item key='selected'>已选择{this.state.selectedRowKeys.length}个文件/文件夹 </Breadcrumb.Item>
    }


    return this.renderDirStack()
  }

  render() {
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
          if (record.is_dir === 1 || record.file.id === 0) {
            return '-';
          }
          return renderSize(record.file.size);
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
          return moment(text * 1000).format('YYYY-MM-DD HH:mm');
        }
      },
    ];
    return (<div>
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
      {/* {this.props.children} */}
      <Table rowKey='id' onRow={this.onRow} size="middle" pagination={false} rowSelection={rowSelection} columns={columns} dataSource={this.props.file.fileList} />
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => ({
  file: state.File,
  user: state.User,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getFileList: () => dispatch(getFileList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);
