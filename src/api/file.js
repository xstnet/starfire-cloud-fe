import Http from '../util/http';
import * as Actions from '../store/Actions';


// 获取文件列表
// export  function getFileList () {
// 	return  dispatch => {
//         const result =  Http.get('/filemanager/file');
//         result.then(response => {
//             dispatch({
//                 type: Actions.getFileList,
//                 fileList: response.data.list,
//             })
//         })
//     }
// }

// 获取文件列表
export const getFileList = parentId => {
	let result =  Http.get('/filemanager/file', {parent_id: parentId});
    return result;
}

// 创建文件夹
export const mkdir = (parentId, name) => {
	return Http.post('/filemanager/mkdir', {parent_id: parentId, name});
}

// 上传文件
export const upload = (formData, onProgress) => {
    return Http.upload('/upload/file', formData, onProgress);
}

// 秒传
export const instant = (md5, target_id, name) => {
    return Http.post('/upload/instant', {md5, target_id, name}, {showMsg: false});
}

// 预上传
export const preUpload = md5 => {
    return Http.post('/upload/pre-upload', {md5}, {showMsg: false});
}