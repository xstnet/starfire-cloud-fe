// import { addTodo } from '@/api/Api.js'
import * as Actions from '../../Actions';

const initState = {
	tabNavList: [
		{ title: '首页', key: '/', closable: false },
	],
	activeKey: '/',
	menuList: [],
	userInfo: {
	},
};

const File = (state = initState, action) => {
	switch (action.type) {
		// case Actions.getTodos:
		// 	return state;
		// case Actions.addTodo:
		// 	return {
		// 		...state,
		// 		todoList: [
		// 			{
		// 				id: action.id,
		// 				name: action.name,
		// 				status: false
		// 			},
		// 			...state.todoList
		// 		]
		// 	}
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