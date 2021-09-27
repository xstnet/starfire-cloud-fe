// import { addTodo } from '@/api/Api.js'
import * as Actions from '../../Actions';

const initState = {
	uploadTaskQueue: [],
	// uploadViewCollapsed: true,
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
				uploadViewCollapsed: true,
				uploadTaskQueue: [...state.uploadTaskQueue, action.item],
			}
		// case Actions.toggleUploadViewShow:
		// 	return {
		// 		...state,
		// 		uploadViewCollapsed: !state.uploadViewCollapsed,
		// 	}

		case Actions.deleteUploadFileQueue:
			return {
				...state,
				uploadTaskQueue: state.uploadTaskQueue.filter(item => item.file.uid !== action.fileId),
			}
		case Actions.updateUploadProgress:
			let index = state.uploadTaskQueue.findIndex(v => v.file.uid === action.fileId);
			if (index === -1) {
				return state;
			}
			state.uploadTaskQueue[index].loaded = action.loaded;
			return {
				...state,
			}
		default:
			return state;
	}
}

export default File;