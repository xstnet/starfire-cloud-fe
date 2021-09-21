import Mock from 'mockjs';
// const Random = Mock.Random;

Mock.mock(RegExp('/api/v1/user-info' + ".*"), "get", (options) => {
	console.log(options.body);
	let result = {
		code: 0,
		message: '添加成功',
		data: {},
	};

	return Mock.mock(result);
});

Mock.mock(RegExp('/api/v1/login'), "post", (options) => {
    let params = JSON.parse(options.body);
	console.log('mockkkkkk', options.body, params);

    let result = {};
    if (params.username === 'demo' && params.password === 'demo') {
        result = {
            "code": 0,
            "message": "登录成功",
            "data": {
                "profile": {
                    "disk_info": {
                        "total": 499289944064,
                        "used": 412170506240,
                        "free": 87119437824
                    },
                    "email": "777789@qq.com",
                    "id": 15,
                    "nickname": "哈哈哈",
                    "register_time": "2021-08-30 01:53:27",
                    "total_space": 0,
                    "used_space": 0,
                    "username": "test5"
                },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJleHAiOjE2MzIzMjYyMjksImlhdCI6MTYzMjIzOTgyOX0.-Rz7O1lzmVeU5rqtvs2uqBaYCTWSA2WJU1sDs4C9iZU"
            },
            "cost": "76.3664ms"
        }
    } else {
        result = {
            "code": 1,
            "message": "密码错误, 演示账号 demo:demo",
        };
    }

	return Mock.mock(result);
});