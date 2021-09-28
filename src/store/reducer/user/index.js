// import { addTodo } from '@/api/Api.js'
import * as Actions from '../../Actions';

const initState = {
	userInfo: {
	},
};

const User = (state = initState, action) => {
	switch (action.type) {
		// case Actions.getTodos:
		// 	return state;
		case Actions.saveUserInfo:
			return {
				...state,
				userInfo: action.userInfo,
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

export default User;