// import { addTodo } from '@/api/Api.js'
import * as Actions from '../../Actions';

const initState = {
	fileList: [],
};

const File = (state = initState, action) => {
	switch (action.type) {
		case Actions.getFileList:
			console.log(2222333444,action.fileList);
			return {
				...state,
				fileList: action.fileList,
			}
		// case Actions.toggleTodo:
		// 	return {
		// 		...state,
		// 		todoList: state.todoList.map(
		// 			todo => (todo.id === action.id) ? {...todo, status: todo.status == false ? true : false} : todo
		// 		)
		// 	}
		// case Actions.deleteTodo:
		// 	return state;
		// case Actions.setTodos:
		// 	return {
		// 		...state,
		// 		todoList: action.todolist
		// 	};
		default:
			return state;
	}
}

export default File;