// import { addTodo } from '@/api/Api.js'
import * as Actions from '../../Actions';

const initState = {
    // 所有上传文件的列表
    uploadFileList: [],
    mapFileIdToIndex: {},
    // 上传队列
    uploadTaskQueue: [],
};

const File = (state = initState, action) => {
    let fileIndex = undefined;
    switch (action.type) {
        // push 上传队列
        case Actions.addUploadFileItem:
            return {
                ...state,
                uploadFileList: [...state.uploadFileList, action.item],
                uploadTaskQueue: [...state.uploadTaskQueue, action.item.file.uid],

                mapFileIdToIndex: { ...state.mapFileIdToIndex, [action.item.file.uid]: state.uploadFileList.length },
            }

        // 删除上传列表的文件, 同时删除上传队列
        case Actions.deleteUploadFileItem:
            // get Index
            fileIndex = state.mapFileIdToIndex[action.fileId];
            if (fileIndex === undefined || fileIndex < 0) {
                return state;
            }
            // 更新其他的file index
            for (var k in state.mapFileIdToIndex[action.fileId]) {
                if (state.mapFileIdToIndex[k] > fileIndex) {
                    state.mapFileIdToIndex[k] = fileIndex - 1;
                }
            }
            // 删除 map 关系
            delete state.mapFileIdToIndex[action.fileId];

            return {
                ...state,
                // 更新上传队列
                uploadTaskQueue: state.uploadTaskQueue.filter(v => v !== action.fileId),
                mapFileIdToIndex: { ...state.mapFileIdToIndex },
                // 从上传文件列表中移除
                uploadFileList: state.uploadFileList.splice(fileIndex, 1),
            }

        // 删除上传队列
        case Actions.deleteUploadFileQueue:
            return {
                ...state,
                // 更新上传队列
                uploadTaskQueue: state.uploadTaskQueue.filter(v => v !== action.fileId),
            }

        // 更新上传文件状态
        case Actions.updateUploadStatus:
            fileIndex = state.mapFileIdToIndex[action.fileId];
            state.uploadFileList[fileIndex].status = action.status;
            state.uploadFileList[fileIndex].message = action.message;
            return {
                ...state,
                // 更新上传队列
                uploadFileList: [...state.uploadFileList],
            }
		// 更新文件md5
		case Actions.updateFileMd5:
			fileIndex = state.mapFileIdToIndex[action.fileId];
			state.uploadFileList[fileIndex].md5 = action.md5;
			return {
				...state,
				uploadFileList: [...state.uploadFileList],
			}
        // 秒传
        case Actions.setInstant:
            fileIndex = state.mapFileIdToIndex[action.fileId];
            state.uploadFileList[fileIndex].status = action.status;
            state.uploadFileList[fileIndex].instant = 1;
            return {
                ...state,
                // 更新上传队列
                uploadTaskQueue: state.uploadTaskQueue.filter(v => v !== action.fileId),
                uploadFileList: [...state.uploadFileList],
            }
        // 更新上传进度条
        case Actions.updateUploadProgress:
            // get Index
            fileIndex = state.mapFileIdToIndex[action.fileId];
            if (fileIndex === undefined || fileIndex < 0) {
                return state;
            }
            state.uploadFileList[fileIndex].loaded = action.loaded;

            return {
                ...state,
                uploadFileList: [...state.uploadFileList],
            }
            // 取消上传
        case Actions.cancleUpload:
            // get Index
            fileIndex = state.mapFileIdToIndex[action.fileId];
            if (fileIndex === undefined || fileIndex < 0) {
                return state;
            }

            state.uploadFileList[fileIndex].loaded = 0;
            state.uploadFileList[fileIndex].status = 3;
            state.uploadFileList[fileIndex].message = '已取消';
            return {
                ...state,
                uploadTaskQueue: state.uploadTaskQueue.filter(v => v !== action.fileId),
            }
        default:
            return state;
    }
}

export default File;