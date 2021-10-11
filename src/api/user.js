import Http from '../util/http';
import Cache from '../util/cache';
import * as Actions from '../store/Actions';

// 登录
export const login =  params => {
    let result = Http.post('/login', params, {showMsg:false});
	result.then(response => {
		Cache.set('isLogin', 1);
		Cache.set('token', response.data.token);
		Cache.setJson('userInfo', response.data.profile);
	});

	return result;
}