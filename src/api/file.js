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

export const getFileList = parentId => {
	let result =  Http.get('/filemanager/file', {parent_id: parentId});
    return result;
}

export const mkdir = (parentId, name) => {
	let result =  Http.post('/filemanager/mkdir', {parent_id: parentId, name});
    return result;
}

export const upload = (formData, callbackConfig) => {
    return Http.upload('/upload/file', formData, callbackConfig);
}