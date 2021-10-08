import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Dropdown, Avatar, Row, Col, Alert,Tag,Progress, Upload } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { saveUserInfo } from '../../store/reducer/user/action';
import { stopEventBubble, renderSize, processFileExt } from '../../util/util';
import Cache from '../../util/cache';
import FileList from '../file/index';
import Svg from '../../component/svg';
import {UploadStatus} from '../../config/config';
import { addUploadFileItem, deleteUploadFileItem, updateUploadProgress, updateUploadStatus, setInstant, deleteUploadFileQueue} from '../../store/reducer/file/action';
import { upload } from '../../api/file';
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
      target: target,
      file: data.file,
    };

    this.props.addUploadFileItem(item);

    // 如果已经在上传了, 不做操作
    if (this.state.uploadFlag) {
      return;
    }
    this.handleUpload();
  }

  // 真正上传文件的处理
  handleUpload = () => {
    console.log('fffff', this.props.file.uploadTaskQueue);
    // 如果上传队列没有数据,延时一会看看
    if (this.props.file.uploadTaskQueue.length <= 0) {
        console.log('ddddd', this.props.file.uploadTaskQueue);
        setTimeout(() => this.handleUpload(), 20);
        return;
    }
    this.setUploadFlag(1);
    let fileIndex = this.props.file.mapFileIdToIndex[this.props.file.uploadTaskQueue[0]];
    let uploadItem = this.props.file.uploadFileList[fileIndex];
    console.log(fileIndex, uploadItem);
    if (!uploadItem) {
      this.props.deleteUploadFileQueue(this.props.file.uploadTaskQueue[0]);
      return;
    }
    let fileId = uploadItem.file.uid;

    // todo 秒传

    let formData = new FormData();
    formData.append('target_id', uploadItem.target.id);
    formData.append('file', uploadItem.file);
    
    // 修改状态,准备上传
    this.props.updateUploadStatus(fileId, UploadStatus.UPLOADING);

    upload(formData, progressEvent => {
      this.props.updateUploadProgress(fileId, progressEvent.loaded);
    })
      .then(res => this.uploadSuccess(res, uploadItem.file))
      .catch(err => {console.log(err);this.uploadFailed('系统错误', uploadItem.file)});
  }

  uploadSuccess = (res, file) => {
    if (!res || res.code === undefined) {
      this.uploadFailed('系统错误', file);
      return;
    }
    if (res.code !== 0) {
      this.uploadFailed(res.message, file);
    }
    
    this.props.deleteUploadFileQueue(file.uid);
    this.props.updateUploadStatus(file.uid, UploadStatus.SUCCESS);
    setTimeout(() => {
      if (this.props.file.uploadTaskQueue.length <= 0) {
        this.setUploadFlag(0);
        return;
      }
      this.handleUpload();
    }, 20);
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
    }, 20);
  }

  renderUploadTask() {
    return this.props.file.uploadFileList.map((item, index) => {
      let progress = '';
      switch (item.status) {
        case UploadStatus.WAIT_UPLOAD:
          progress = '等待上传';
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
          progress = <span>失败: {item.message} <CloseOutlined /></span>
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
      <Layout className="main" style={{ minHeight: '100vh' }}>
        {/* <Sider className="side-left" theme="light" >
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
        </Sider> */}
        <Layout className="side-right">
          <Header className="header">
            <div className="header-left fl">
              {/* <Dropdown overlay={menu}>
                <a className="ant-dropdown-link2" onClick={e => e.preventDefault()}>
                  本地存储 <DownOutlined />
                </a>
              </Dropdown> */}

            </div>
            <div className="header-right fr">
              <ul>
                <li className="fl">
                  {/* <Dropdown overlay={menu}>
                    <div>
                      <Avatar size={50} icon={<UserOutlined />} />
                      {this.props.user.userInfo.nickname} <DownOutlined />
                    </div>
                  </Dropdown> */}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
