/**
 * Created by Administrator on 2018/4/13.
 */
 import * as Actions from '../Actions';

 export const deleteFiles = ids => ({
    type: Actions.addTodo,
    ids,
});

 export const getFileList = fileList => ({
     type: Actions.getFileList,
     fileList,
 });