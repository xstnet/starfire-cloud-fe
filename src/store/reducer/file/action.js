/**
 * Created by Administrator on 2018/4/13.
 */
import * as Actions from '../../Actions';

// export const deleteFiles = ids => ({
//     type: Actions.addTodo,
//     ids,
// });

export const getFileList = fileList => ({
    type: Actions.getFileList,
    fileList,
});

// export const loadUploadFileQueue = () => ({
//     type: Actions.loadUploadFileQueue,
// });

// 删除上传列表,包括上传队列
export const deleteUploadFileItem = fileId => ({
    type: Actions.deleteUploadFileItem,
    fileId,
});

// 删除上传队列
export const deleteUploadFileQueue = fileId => ({
    type: Actions.deleteUploadFileQueue,
    fileId,
});

export const addUploadFileItem = item => ({
    type: Actions.addUploadFileItem,
    item,
});

// export const toggleUploadViewShow = () => ({
//     type: Actions.addUploadFileItem,
// });

// 更新进度条
export const updateUploadProgress = (fileId, loaded) => ({
    type: Actions.updateUploadProgress,
    fileId,
    loaded,
});

// 更新文件md5
export const updateFileMd5 = (fileId, md5) => ({
    type: Actions.updateFileMd5,
    fileId,
    md5,
});

// 更新上传文件状态
export const updateUploadStatus = (fileId, status, message = '') => ({
    type: Actions.updateUploadStatus,
    fileId,
    status,
    message,
});

// 秒传
export const setInstant = (fileId, status) => ({
    type: Actions.setInstant,
    fileId,
    status,
});