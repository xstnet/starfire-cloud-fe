import axios from 'axios';
import Config from '../config/config';
import Cache from './cache';
import { message } from 'antd';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cache.getToken();
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.baseURL = Config.BASE_URL;

class Http {
	static get(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
				params: params,
				// headers: {
				// 	Authorization: 'Bearer ' + Cache.getToken(),
				// }
			}, ).then(res => {
                if (res.data.code === Config.CODE_RELOGIN) {
					Cache.remove('token');
					Cache.remove('userInfo');
					Cache.set('isLogin', false);
					message.error(res.data.message, 1.5);
					// Control.go('/login');
					throw res.data.message;
				}
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	}

	static post(url, params = {}, tips={showMsg:true, loading: true}) {
		return new Promise((resolve, reject) => {
			axios.post(url, qs.stringify(params), {
					headers: {
						Authorization: 'Bearer ' + Cache.getToken(),
					}
				}
			).then(res => {
				if (res.data.code === Config.CODE_NEED_LOGIN) {
					Cache.remove('token');
					Cache.remove('userInfo');
					Cache.set('isLogin', false);
					message.error(res.data.message, 1.5).then(Control.go('/login'));
					throw res.data.message;
				}
				switch (res.data.code) {
					case Config.CODE_OK:
						if (tips.showMsg) {
							message.success(res.data.message);
						}
						break;
					default:
						if (tips.showMsg) {
							message.error(res.data.message);
						}
						return Promise.reject('Action Error')
				}
				resolve(res.data)
			}).catch(err => {
				if (tips.loading) {
					message.destroy();
				}
				reject(err)
			})
		})
	}
}

export default Http;