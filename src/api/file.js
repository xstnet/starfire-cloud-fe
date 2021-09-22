import Http from '../util/http';
import * as Actions from '../store/Actions';


// 获取文件列表
export  function getFileList () {
	return  dispatch => {
        const result =  Http.get('/filemanager/file');
        result.then(response => {
            dispatch({
                type: Actions.getFileList,
                fileList: response.data.list,
            })
        })
    }
}