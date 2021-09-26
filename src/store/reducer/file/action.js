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

export const deleteUploadFileItem = fileId => ({
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

export const updateUploadProgress = (fileId, loaded) => ({
    type: Actions.updateUploadProgress,
    fileId,
    loaded
});