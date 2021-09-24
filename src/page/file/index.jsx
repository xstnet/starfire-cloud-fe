import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Dropdown, Table, Button, Space, Upload, Menu, Row, Col } from 'antd';
import { Modal, Form, Input, Radio } from 'antd';
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
    fileList: [],
    loading: true,
    hasMore: 0,
    showMkdirModal: false,
    dirStack: [
      {
        name: '全部文件',
        id: 0,
      }
    ],

  }

  componentDidMount() {
    this.loadData(0);
  }

  onMkdirClick() {
    console.log(this.state);
    this.setState({showMkdirModal: true});
  }

  handleMkdir = values => {
      console.log(values);
  }

  loadData = parentId => {
    this.setState({loading: true});
    getFileList(0).then(response => {
      this.setState({fileList: response.data.list, selectedRowKeys:[], loading:false, hasMore: response.data.more})
    })
  }

  onFileClick = (event, rowData) => {
    stopEventBubble(event);
      console.log(rowData);

      if (rowData.is_dir) {
        this.pushDirStack(rowData.id, rowData.name);
        this.loadData(rowData.id);
        return ;
      }

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
        let index = this.state.selectedRowKeys.indexOf(record.id);
        if (index >= 0) {
          this.state.selectedRowKeys.splice(index, 1)
        } else {
          this.state.selectedRowKeys.push(record.id)
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
    this.setState({ dirStack: [...this.state.dirStack, { id, name }] });
  }

  popDirStack = id => {
    let index = this.state.dirStack.findIndex(v => v.id === id);
    if (index === -1) {
      return;
    }

    this.loadData(id);

    this.setState({ dirStack: this.state.dirStack.slice(0, index + 1) });
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
    return this.renderDirStack()
  }

  renderTableSummaryTip() {
    if (this.state.loading) {
      return '正在加载中...';
    }
    if (this.state.hasMore) {
      return `已加载${this.state.fileList.length}条数据`;
    }

    return `共${this.state.fileList.length}条数据，已全部加载`;
  }


  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const columns = [
      {
        title: () => {
          if (this.state.selectedRowKeys.length > 0) {
            return <span>已选择{this.state.selectedRowKeys.length}个文件/文件夹</span>
          }
          return <span>名称</span>;
        },
        dataIndex: 'name',
        width: '30%',
        render: (text, record) => {
          let ext = record.is_dir ? 'dir' : (record.file.ext || 'txt');
          return (
            <span>
              <span className="file-list-icon">
                <svg class={`icon icon-${ext}`} aria-hidden="true">
                  <use xlinkHref={`#icon-${ext}`}></use>
                </svg>
              </span>
              <a className="file-list-title" href="javascript:void(0)" onClick={e => this.onFileClick(e,record)}>{text}</a>
            </span>

          )
        }
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
          <Button type="primary" onClick={() => this.onMkdirClick()} icon={<FolderAddOutlined />} size="middle">
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
      <Row>
        <Col span={20}>
          <Breadcrumb className="bread-crumb">
            {this.renderBreadCrumb()}
          </Breadcrumb>
        </Col>
        <Col span={4}>
          <div className="table-summary-tip">
              {this.renderTableSummaryTip()}
          </div>
        </Col>
      </Row>
      
      {/* {this.props.children} */}
      <Table rowKey='id' onRow={this.onRow} size="middle" pagination={false} rowSelection={rowSelection} columns={columns} dataSource={this.state.fileList} />

      <Modal
      visible={this.state.showMkdirModal}
      title="创建新文件夹"
      okText="创建"
      onFinish={this.handleMkdir}
      cancelText="取消"
      onCancel={() => this.setState({showMkdirModal: false})}
      
    >
      <Form
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="名称"
          label="名称"
          rules={[{ required: true, message: '请输入文件夹名称!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => ({
  file: state.File,
  user: state.User,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // getFileList: () => dispatch(getFileList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);
