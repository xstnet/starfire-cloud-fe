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

Mock.mock(RegExp('/api/v1/filemanager/file'), "get", (options) => {
    let result = {
        "code": 0,
        "message": "ok",
        "data": {
            "list": [
                {
                    "created_at": 1630816207,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 47,
                    "is_dir": 0,
                    "name": "新建文本文档..._20210905_123007.TXT",
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816207,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 48,
                    "is_dir": 0,
                    "name": "新建文本文档..._20210905_123007.TXT",
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816207,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 49,
                    "is_dir": 0,
                    "name": "新建文本文档..._20210905_123007.TXT",
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816207,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 50,
                    "is_dir": 0,
                    "name": "新建文本文档..._20210905_123007.TXT",
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816207,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 51,
                    "is_dir": 0,
                    "name": "新建文本文档..._20210905_123007.TXT",
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816206,
                    "file": {
                        "id": 0
                    },
                    "file_id": 1,
                    "id": 45,
                    "is_dir": 1,
                    "name": "新文件夹",
                    "parent_id": 0,
                    "updated_at": 1630816206
                },
                {
                    "created_at": 1630773632,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 40,
                    "is_dir": 0,
                    "name": "新建文本文档..._20210905_004032.TXT",
                    "parent_id": 0,
                    "updated_at": 1630773632
                },
                {
                    "created_at": 1630773618,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 39,
                    "is_dir": 0,
                    "name": "新建文本文档..._20210905_004018.TXT",
                    "parent_id": 0,
                    "updated_at": 1630773618
                },
                {
                    "created_at": 1630772949,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 38,
                    "is_dir": 0,
                    "name": "新建文本文档....TXT_20210905_002909",
                    "parent_id": 0,
                    "updated_at": 1630772949
                },
                {
                    "created_at": 1630772907,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 37,
                    "is_dir": 0,
                    "name": "新建文本文档....TXT",
                    "parent_id": 0,
                    "updated_at": 1630772907
                },
                {
                    "created_at": 1630772744,
                    "file": {
                        "ext": "txt",
                        "id": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size": 2
                    },
                    "file_id": 1,
                    "id": 36,
                    "is_dir": 0,
                    "name": "新建文本文档....TXT",
                    "parent_id": 0,
                    "updated_at": 1630772744
                },
                {
                    "created_at": 1630332444,
                    "file": {
                        "id": 0
                    },
                    "file_id": 0,
                    "id": 1,
                    "is_dir": 0,
                    "name": "first",
                    "parent_id": 0,
                    "updated_at": 1630332444
                }
            ],
            "more": 0
        },
        "cost": "2.3853ms"
    }

	return Mock.mock(result);
});