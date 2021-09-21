/**
 * Created by Administrator on 2018/4/13.
 */
 import * as Actions from '../Actions';

 export const deleteFiles = ids => ({
    type: Actions.addTodo,
    ids,
});

 export const addTodo = (id, name) => ({
     type: Actions.addTodo,
     id,
     name
 });
 
 export const getTodos = () => ({
     type: Actions.getTodos
 })
 
 export const toggleTodo = id => ({
     type: Actions.toggleTodo,
     id
 });
 
 export const setTodos = todolist => ({
     type: Actions.setTodos,
     todolist
 });
 
 export const deleteTodo = id => ({
     type: Actions.deleteTodo,
     id
 })
 