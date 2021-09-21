import Http from '../util/http';
import Cache from '../util/cache';
import * as Actions from '../store/Actions';

// 登录
export const login1 =  params => {
	try {
		console.log(params, 'aaaa');
		let result =  Http.post('/login', params, {message: '登录中。。。'});
		console.log(result, 444);
        // result
		if (result && result.code === 0) {
			Cache.set('token', result.data.token);
			Cache.set('homeId', result.data.home_id);
			Cache.set('isLogin', 1);
			return result;
		}
		if (!result) {
			throw '系统错误！';
		}

		throw result.message;
	} catch (err) {
		console.log(err);
	}
}

export const login =  params => {
    return Http.post('/login', params, {showMsg:false});
}