// import { addTodo } from '@/api/Api.js'
import * as Actions from '../../Actions';

const initState = {
    // 所有上传文件的列表
    uploadFileList: [],
    mapFileIdToIndex: {},
    uploadFlag: 0,
    // 上传队列
    uploadTaskQueue: [],
};

const File = (state = initState, action) => {
    switch (action.type) {
        // case Actions.loadUploadFileQueue:
        // 	return {
        // 		...state,
        // 		uploadTaskQueue: Cache.getUploadFileQueue(),
        // 	}
        case Actions.addUploadFileItem:
            return {
                ...state,
                uploadFileList: [...state.uploadFileList, action.item],
                uploadTaskQueue: [...state.uploadTaskQueue, action.item.file.uid],

                mapFileIdToIndex: { ...state.mapFileIdToIndex, [action.item.file.uid]: state.uploadFileList.length },
            }
        // case Actions.toggleUploadViewShow:
        // 	return {
        // 		...state,
        // 		uploadViewCollapsed: !state.uploadViewCollapsed,
        // 	}

        // 删除上传列表的文件
        case Actions.delUploadFileItem:
            // get Index
            let fileIndex = state.mapFileIdToIndex[action.fileId];
            if (!fileIndex) {
                return state;
            }
            // 更新其他的file index
            for (var k in state.mapFileIdToIndex[action.fileId]) {
                if (state.mapFileIdToIndex[k] > findIndex) {
                    state.mapFileIdToIndex[k] = findIndex - 1;
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

        // 更新上传进度条
        case Actions.updateUploadProgress:
            // get Index
            let fileIndex = state.mapFileIdToIndex[action.fileId];
            if (!fileIndex) {
                return state;
            }

            state.uploadFileList[index].loaded = action.loaded;
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default File;