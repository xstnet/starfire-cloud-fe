import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Dropdown, Avatar, Row, Col, Alert,Tag,Progress, Upload } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { saveUserInfo } from '../../store/reducer/user/action';
import { stopEventBubble, renderSize, processFileExt } from '../../util/util';
import { md5File } from '../../util/md5';
import Cache from '../../util/cache';
import FileList from '../file/index';
import Svg from '../../component/svg';
import {UploadStatus} from '../../config/config';
import { addUploadFileItem, deleteUploadFileItem, updateUploadProgress, updateUploadStatus, setInstant, deleteUploadFileQueue, updateFileMd5} from '../../store/reducer/file/action';
import { upload, instant, preUpload } from '../../api/file';
import {
  PieChartOutlined,
  UserOutlined,
  DownOutlined,
  CheckCircleOutlined,
  CloseOutlined,
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
    uploadViewCollapsed: false,
    uploadFlag: 0,
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

  setUploadFlag = flag => {
    // 防止异步操作并发,先改值再说
    this.state.uploadFlag = flag;
    this.setState({uploadFlag: flag});
  }

  // 选择文件上传后的处理
  onUpload = (data, target) => {
    console.log('32333', data);
    let item = {
      status: UploadStatus.WAIT_UPLOAD,
      message: '',
      loaded: 0,
      instant: 0,
      md5: '',
      target: target,
      file: data.file,
    };

    this.props.addUploadFileItem(item);
    // 生成文件md5
    this.generateFileMd5(data.file, data.file.uid);

    // 如果已经在上传了, 不做操作
    if (this.state.uploadFlag) {
      return;
    }
    this.handleUpload();
  }

  // 异步生成文件md5
  generateFileMd5 = (file, fileId) => {
    md5File(file).then(md5 => {
      this.props.updateFileMd5(fileId, md5);
    })
  }

  // 真正上传文件的处理
  handleUpload = () => {
    // 如果上传队列没有数据,延时一会看看
    if (this.props.file.uploadTaskQueue.length <= 0) {
        console.log('ddddd', this.props.file.uploadTaskQueue);
        setTimeout(() => this.handleUpload(), 10);
        return;
    }
    this.setUploadFlag(1);

    // 获取文件索引
    let fileIndex = this.props.file.mapFileIdToIndex[this.props.file.uploadTaskQueue[0]];
    // 获取梁明上传文件
    let uploadItem = this.props.file.uploadFileList[fileIndex];

    if (!uploadItem) {
      this.props.deleteUploadFileQueue(this.props.file.uploadTaskQueue[0]);
      return;
    }
    let fileId = uploadItem.file.uid;

    // 修改状态,准备上传
    if (uploadItem.status !== UploadStatus.PREPARE_UPLOAD) {
      this.props.updateUploadStatus(fileId, UploadStatus.PREPARE_UPLOAD);
    }

    // 确认文件md5是否已生成
    if (uploadItem.md5 === '') {
      // 还没有生成完成，等一会再来
      setTimeout(() => {
        console.log("等待文件md5生成。。。。");
        this.handleUpload();
      }, 1000);
      return;
    }

    // 预上传
    preUpload(uploadItem.md5)
    .then((res) => {
      // 文件已存在，直接进入秒传流程
      if (res.data.exist === 1) {
        this.instantUpload(res.data.md5, uploadItem);
        return;
      }

      // 开始上传
      let formData = new FormData();
      formData.append('target_id', uploadItem.target.id);
      formData.append('file', uploadItem.file);

      // 修改状态，上传中
      this.props.updateUploadStatus(fileId, UploadStatus.UPLOADING);

      upload(formData, progressEvent => {
        console.log('vvvvv', progressEvent.loaded);
        this.props.updateUploadProgress(fileId, progressEvent.loaded);
      })
        .then(res => this.uploadSuccess(res, uploadItem.file))
        .catch(err => { console.log(err); this.uploadFailed('系统错误', uploadItem.file) });

    })
    // 预上传失败
    .catch(res => {
      let message = res.message ?? '上传失败';
      this.uploadFailed(message, uploadItem.file);
      return;
    })
  }

  instantUpload = (md5, uploadItem) => {
    instant(md5, uploadItem.target.id, uploadItem.file.name)
    .then((res) => this.uploadSuccess(res, uploadItem.file, 1))
    .catch(res => this.uploadFailed(res.message ?? '上传失败', uploadItem.file))
    return;
  }

  uploadSuccess = (res, file, instant = 0) => {
    if (!res || res.code === undefined) {
      this.uploadFailed('系统错误', file);
      return;
    }
    if (res.code !== 0) {
      this.uploadFailed(res.message, file);
    }
    
    this.props.deleteUploadFileQueue(file.uid);
    if (instant === 0) {
      // 普通上传
      this.props.updateUploadStatus(file.uid, UploadStatus.SUCCESS);
    } else {
      // 秒传
      this.props.setInstant(file.uid, UploadStatus.SUCCESS);
    }
    setTimeout(() => {
      if (this.props.file.uploadTaskQueue.length <= 0) {
        this.setUploadFlag(0);
        return;
      }
      this.handleUpload();
    }, 1);
  }

  uploadFailed = (message, file) => {
    this.props.updateUploadStatus(file.uid, UploadStatus.FAILURE, message);
    this.props.deleteUploadFileQueue(file.uid);
    
    setTimeout(() => {
      console.log('uploadTaskQueue3',this.props.file.uploadTaskQueue);
      if (this.props.file.uploadTaskQueue.length <= 0) {
        this.setUploadFlag(0);
        console.log('3333334444');
        return;
      }
      this.handleUpload();
    }, 1);
  }

  renderUploadTask() {
    return this.props.file.uploadFileList.map((item, index) => {
      let progress = '';
      switch (item.status) {
        case UploadStatus.WAIT_UPLOAD:
          progress = '等待上传';
          break;
        case UploadStatus.PREPARE_UPLOAD:
          progress = '准备上传...';
          break;
        case UploadStatus.UPLOADING:
          progress = <div>
            <Progress
              strokeColor={{
                from: '#108ee9',
                to: '#87d068',
              }}
              percent={(item.loaded / item.file.size * 100).toFixed(2)}
              status="active"
            />
          </div>;
          break;
        case UploadStatus.SUCCESS:
          progress = <span className="upload-success-icon"><CheckCircleOutlined /></span>
          break;
        case UploadStatus.FAILURE:
          progress = <span>{item.message} <CloseOutlined /></span>
          break;
      }

      if (item.status === 0) {
        progress = '等待上传'
      }
      return <li key={index} className={`upload-status-${item.status}`}>
        <div className="svg-icon"><Svg name={processFileExt(item.file.name.split('.').pop().toLowerCase())} /></div>
        <div className="filename">{item.file.name}</div>
        <div className="size">{renderSize(item.file.size)}</div>
        <div className="target">{item.target.id === 0 ? '/' : item.target.name}</div>
        <div className="progress">{progress} {item.instant === 1 ? <Tag color="green">秒传</Tag> : ''}</div>
        <span style={{clear:"both"}}></span>
      </li>
    })
  }

  render() {

    return (
      <Layout className="main">
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
              <Route path='/' >
                <FileList key="filelist" {...this.props} onUpload={this.onUpload} />
              </Route>
            </Switch>
          </Content>
        </Layout>
        <div className={`upload-task-queue-wrap ${this.props.file.uploadFileList.length > 0 ? '' : 'hide'}`}>
          <div className="upload-task-queue-header">
            <Row>
              <Col span={20}>上传队列 </Col>
              <Col style={{ textAlign: 'right', backgroundColor: '' }} span={4}>
                <a onClick={(e) => { this.setState({ uploadViewCollapsed: !this.state.uploadViewCollapsed }); stopEventBubble(e) }}>
                  {this.state.uploadViewCollapsed ? '查看' : '收起'}
                </a>
              </Col>
            </Row>
          </div>
          <div>
            <Alert
              message={<div className="upload-task-queue-tip">
                <span>上传中(<span>{this.props.file.uploadFileList.filter(v => v.status <= 20).length}</span>) </span>
                <span>已完成(<span>{this.props.file.uploadFileList.filter(v => v.status === 30).length}</span>) </span>
                <span>失败(<span>{this.props.file.uploadFileList.filter(v => v.status >= 90).length}</span>) </span>
              </div>}
            />
          </div>
          <div className={`upload-task-queue-list ${this.state.uploadViewCollapsed ? 'hidden' : ''}`}>
            <ul>
              {this.renderUploadTask()}
            </ul>
          </div>
        </div>
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
  addUploadFileItem: item => dispatch(addUploadFileItem(item)),
  deleteUploadFileItem: fileId => dispatch(deleteUploadFileItem(fileId)),
  updateUploadProgress: (fileId, loaded) => dispatch(updateUploadProgress(fileId, loaded)),
  updateUploadStatus: (fileId, status, message = '') => dispatch(updateUploadStatus(fileId, status, message)),
  setInstant: (fileId, status) => dispatch(setInstant(fileId, status)),
  deleteUploadFileQueue: (fileId) => dispatch(deleteUploadFileQueue(fileId)),
  // 更新文件md5
  updateFileMd5: (fileId, md5) => dispatch(updateFileMd5(fileId, md5)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
