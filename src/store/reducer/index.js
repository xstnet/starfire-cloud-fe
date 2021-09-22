import { combineReducers } from 'redux';
import File from './file/index';
import User from './user/index'

export default combineReducers({
	File,
	User,
})