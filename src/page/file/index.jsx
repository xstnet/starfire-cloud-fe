import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Dropdown, Table, Button, Space, Upload, Menu, Row, Col} from 'antd';
import { Modal, Form, Input } from 'antd';
import moment from 'moment';
import { stopEventBubble, renderSize, processFileExt } from '../../util/util';
import { md5File } from '../../util/md5';
import { getFileList, mkdir, upload } from '../../api/file';
import Svg from '../../component/svg';
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

class FileList extends React.Component {

  state = {
    selectedRowKeys: [],
    fileList: [],
    loading: true,
    hasMore: 0,
    page: 1,
    showMkdirModal: false,
    tableWrapRef: null,

    dirStack: [
      {
        name: '全部文件',
        id: 0,
      }
    ],

  }

  componentDidMount() {
    this.loadData(0);
    this.props.setChildFileListRef(this, 'init');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.props.setChildFileListRef(false, 'remove');
  }

  onUpload = (data) => {
    this.props.onUpload(data, this.getCurrentTargetDir());
  }


  onMkdirClick() {
    this.setState({ showMkdirModal: true });
  }

  handleMkdir = values => {
    let parentId = this.getCurrentTargetDir().id;
    mkdir(parentId, values.name).then(response => {
      this.setState({ showMkdirModal: false, fileList: [response.data, ...this.state.fileList] });
    })
  }

  appendFile = (fileItem) => {
    let currentDir = this.getCurrentTargetDir();
    // 只有属于当前目录的才能追加进去
    if (currentDir.id !== fileItem.parent_id) {
      return;
    }
    this.setState({fileList: [...this.state.fileList, fileItem]});
  }

  // 加载文件列表
  loadData = (parentId, nextPage = false) => {
    this.setState({ loading: true });

    let params = {
      parent_id: parentId,
      page: nextPage ? this.state.page : 1, // 如果是加载新目录，页码等于1
    }

    let result = getFileList(params);
    result.then(response => {
      // 设置当前页码，如果还有下一页就加1，否则就重置为1
      let page = response.data.more ? this.state.page + 1 : 1;

      // 设置当前文件列表，如果是加载下一页就合并元素，否则就直接使用接口返回数据
      let fileList = nextPage ? [...this.state.fileList, ...response.data.list] : response.data.list;
      this.setState({ fileList, selectedRowKeys: [], loading: false, hasMore: response.data.more, page })
    }).catch(res => {
      this.setState({ loading: false});
    })
    return result;
  }

  onFilenameClick = (event, rowData) => {
    stopEventBubble(event);
    if (rowData.is_dir) {
      this.loadData(rowData.id).then(() => this.pushDirStack(rowData.id, rowData.name));
      return;
    }

  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onRow = record => {
    return {
      onClick: e => {
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

  onBreadCrumbClick = (event, id) => {
    stopEventBubble(event);
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

    this.loadData(id).then(() => this.setState({ dirStack: this.state.dirStack.slice(0, index + 1) }));
  }

  getCurrentTargetDir = () => {
    return this.state.dirStack[this.state.dirStack.length - 1];
  }

  getFileIndexById = id => {
    return this.state.fileList.findIndex(v => v.id === id);
  }

  onRenameClick = id => {
    console.log(id);

    setTimeout(() => {
      let index = this.getFileIndexById(id);

      this.state.fileList[index].name = 'rename........ success' + id;
      this.setState({ fileList: [...this.state.fileList] });
    }, 500);
  }

  handleRename = id => {
    console.log(id);
  }

  onShareClick = id => {
    console.log(id);
  }

  handleShare = id => {
    console.log(id);
  }

  onDeleteClick = ids => {
    console.log(ids);

    setTimeout(() => {
      this.setState({
        fileList: this.state.fileList.filter(v => ids.indexOf(v.id) === -1),
        selectedRowKeys: this.state.selectedRowKeys.filter(v => ids.indexOf(v) === -1),
      });
    }, 500);
  }

  handleDelete = ids => {
    console.log(ids);
  }

  onMoveClick = ids => {
    console.log(ids);
  }

  handleMove = ids => {
    console.log(ids);
  }

  onScrollEvent = () => {
    if (this.state.tableWrapRef.scrollTop + this.state.tableWrapRef.clientHeight + 100 >= this.state.tableWrapRef.scrollHeight) {
      if (this.state.hasMore === 0 || this.state.loading) {
        return;
      }
      console.log(9999, this.state.tableWrapRef);
      this.setState({ loading: true }, () => {
        let parentId = this.getCurrentTargetDir().id;
        this.loadData(parentId, true);
      });
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
    return this.state.dirStack.map(item => {
      return <Breadcrumb.Item key={item.id}><a onClick={(e) => this.onBreadCrumbClick(e, item.id)}>{item.name}</a></Breadcrumb.Item>
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

    const MkdirForm = () => {
      const [form] = Form.useForm();
      return (
        <Modal
          visible={this.state.showMkdirModal}
          title="创建新文件夹"
          okText="创建"
          cancelText="取消"
          onCancel={() => this.setState({ showMkdirModal: false })}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                this.handleMkdir(values);
              })
              .catch((info) => {
              });
          }}
        >
          <Form
            form={form}
            layout="horizontal"
            name="form_in_modal"
          >
            <Form.Item
              name="name"
              label="名称"
              rules={[
                {
                  required: true,
                  message: '请输入文件夹名称!',
                },
              ]}
            >
              <Input />
            </Form.Item>

          </Form>
        </Modal>
      );
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
          let ext = record.is_dir ? 'dir' : (record.file?.ext || 'txt');
          ext = processFileExt(ext);
          return (
            <span>
              <span className="file-list-icon">
                <Svg name={ext} />
              </span>
              <a className="file-list-title" onClick={e => this.onFilenameClick(e, record)}>{text}</a>
            </span>

          )
        }
      },
      {
        title: '大小',
        dataIndex: 'file.size',
        render: (text, record) => {
          if (record.is_dir === 1 || record.file?.id === 0) {
            return '-';
          }
          return renderSize(record.file?.size);
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '200px',
        render: (text, record) => {
          return <span className="table-filelist-action" onClick={e => stopEventBubble(e)}>
            <Space>
              <a onClick={() => this.onShareClick(record.id)} title="分享" href="22"><ShareAltOutlined /></a>
              <a onClick={e => stopEventBubble(e)} title="下载" href="22"><DownloadOutlined /></a>
              <Dropdown overlay={<FileOperation id={record.id} />} trigger={['click']}>
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

    const FileOperation = (prop) => (
      <Menu className="file-operation-wrap">
        <Menu.Item onClick={this.onMoveClick.bind(this, [prop.id])} key="move">移动</Menu.Item>
        <Menu.Item onClick={this.onDeleteClick.bind(this, [prop.id])} key="delete">删除</Menu.Item>
        <Menu.Item onClick={this.onRenameClick.bind(this, prop.id)} key="rename">重命名</Menu.Item>
        <Menu.Item key="favorite">收藏</Menu.Item>
      </Menu>
    )

    const menu1 = (
      <Menu>
        <Menu.Item key="1">
          <Upload multiple={true} showUploadList={false} customRequest={this.onUpload.bind(this)}>
            上传文件
          </Upload>
        </Menu.Item>
        <Menu.Item key="2">
          <Upload directory showUploadList={false} customRequest={this.onUpload.bind(this)}>
            上传文件夹
          </Upload>
        </Menu.Item>
      </Menu>
    );

    return (
    <div>
      <div className="action-bar">
        <Space>
          
        <Dropdown.Button type="primary" overlay={menu1}>
            <Upload multiple={true} showUploadList={false} customRequest={this.onUpload.bind(this)}>
              {/* <Button type="primary" icon={<UploadOutlined />} size="middle">
                上传
              </Button> */}
              <span className="color-white"><UploadOutlined /> 上传</span> 
            </Upload>
        </Dropdown.Button>
          
          <Button type="primary" onClick={() => this.onMkdirClick()} icon={<FolderAddOutlined />} size="middle">
            新建
          </Button>

          <div className={`action-file-bar ${this.state.selectedRowKeys.length > 0 ? '' : 'hide'}`}>
            <Button className={`${this.state.selectedRowKeys.length === 1 ? '' : 'hide'}`} type="primary" icon={<DownloadOutlined />} size="middle">下载 </Button>
            <Button className={`${this.state.selectedRowKeys.length > 1 ? '' : 'hide'}`} type="primary" icon={<DownloadOutlined />} size="middle">打包下载 </Button>
            <Button className={`${this.state.selectedRowKeys.length === 1 ? '' : 'hide'}`} type="primary" icon={<ShareAltOutlined />} onClick={() => this.onShareClick(this.state.selectedRowKeys[0])} size="middle">分享 </Button>
            <Button type="primary" icon={<DeleteOutlined />} size="middle" onClick={() => this.onDeleteClick(this.state.selectedRowKeys)}>删除 </Button>
            <Button className={`${this.state.selectedRowKeys.length === 1 ? '' : 'hide'}`} onClick={() => this.onRenameClick(this.state.selectedRowKeys[0])} type="primary" icon={<EditOutlined />} size="middle">重命名 </Button>
            <Button type="primary" icon={<FolderAddOutlined />} size="middle" onClick={() => this.onMoveClick(this.state.selectedRowKeys)}>移动 </Button>
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

      <div className="file-list-wrap" ref={ref => this.state.tableWrapRef = ref} onScroll={this.onScrollEvent}>
        <Table rowKey='id' loading={this.state.loading} onRow={this.onRow} size="middle" pagination={false} rowSelection={rowSelection} columns={columns} dataSource={this.state.fileList} />
      </div>

      <MkdirForm />

      
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => ({
  file: state.File,
  user: state.User,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);
