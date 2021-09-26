import axios from 'axios';
import Config from '../config/config';
import Cache from './cache';
import { message } from 'antd';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cache.getToken();
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.baseURL = Config.BASE_URL;

axios.interceptors.response.use(response => {
    if (response.headers['Authorization']) {
        Cache.set('token', response.headers['Authorization']);
    }
    if (response.data.code === Config.CODE_RELOGIN) {
        source.cancel();
        Cache.remove('token');
        Cache.remove('userInfo');
        Cache.set('isLogin', false);
        // todo go login page
    }
    return response;
}, error => {
    message.error('系统错误');
    return Promise.reject(error);
})

class Http {
    static get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params,
                cancelToken: source.token
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    static post(url, params = {}, tips = { showMsg: true }) {
        return new Promise((resolve, reject) => {
            axios.post(url, JSON.stringify(params), { cancelToken: source.token }).then(res => {
                if (tips.showMsg) {
                    if (res.data.code === Config.CODE_OK) {
                        message.success(res.data.message);
                    } else {
                        message.error(res.data.message);
                    }
                }
                if (res.data.code === Config.CODE_RELOGIN) {
                    // message.error(res.data.message, 1.5).then(Control.go('/login'));
                    reject(res.data);
                    return;
                }
                if (res.data.code !== Config.CODE_OK) {
                    reject(res.data)
                    return;
                }
                resolve(res.data)
            }).catch(err => {
                reject(err);
            })
        })
    }

    static upload(url, formData, callbackConfig) {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method: 'post',
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
                    console.log('progressEvent', progressEvent);
                    if (progressEvent.lengthComputable) {
						console.log(callbackConfig)
                        //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                        //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
						callbackConfig.callback(callbackConfig.params, progressEvent)
                    }
                },
                data: formData
            }).then(res => {
                if (res.data.code === Config.CODE_RELOGIN) {
                    // message.error(res.data.message, 1.5).then(Control.go('/login'));
                    reject(res.data);
                    return;
                }
                if (res.data.code !== Config.CODE_OK) {
                    reject(res.data)
                    return;
                }
                resolve(res.data)
            }).catch(err => {
                reject(err);
            })

        })
    }
}

export default Http;