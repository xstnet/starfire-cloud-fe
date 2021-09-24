import Mock from 'mockjs';
const Random = Mock.Random;

Mock.mock(RegExp('/mock/api/v1/user-info' + ".*"), "get", (options) => {
    console.log(options.body);
    let result = {
        code: 0,
        message: '添加成功',
        data: {},
    };

    return Mock.mock(result);
});

Mock.mock(RegExp('/mock/api/v1/login'), "post", (options) => {
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
                    "id|1-1111111111": 15,
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
    let filenames = [
        'new.txt',
        'new.doc',
        '神秘视频.avi',
        '发如雪.mp3',
        'react-guide.md',
        'mockdata.js',
        'index.jsx',
        'test.php',
        'caocaocao.cpp',
        'fuckfuck.c',
        '测试文件',
    ];
    let dirnames = [
        '新建文件夹1',
        '音乐',
        '游戏',
        '文档',
        'test',
        'controllers',
        'pages',
        'tools',
        'public',
        '工具箱',
        'react教程',
        'fuck',
        '这是随机的',
        '美国往事',
        '穷啊',
        'code',
        'src',
        'sourcecode',
        'phper',
        'goer',
        'jser',
        '测试文件夹1',
        '歌曲列表',
        '秘密文件',
    ];

    let exts = [
        'jpg', 'png', 'mp3', 'mp4', 'a7z', 'pdf', 'exe', 'apk', 'doc', 'doc', 'txt', 'docx', 'xls', 'ppt', 'php', 'go', 'cpp', 'md', 'xmind', 'dmg', 'xls', 'java', 'js', 'json', 'flac', 'gif', 'zip', 'rar', 'msi', 'iso', 'psd', 'css','html','cs'
    ]
    let result = {
        "code": 0,
        "message": "ok",
        "data": {
            "list|1-4": [
                {
                    "created_at": 1630816207,
                    "file": {
                        "id|1-1111111111": 0,
                    },
                    "file_id": 1,
                    "id|1-1111111111": 47,
                    "is_dir": 1,
                    "name|1": dirnames,
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816207,
                    "file": {
                        "ext|1": exts,
                        "id|1-1111111111": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size|1-100000000": 100000
                    },
                    "file_id": 1,
                    "id|1-1111111111": 48,
                    "is_dir": 0,
                    "name|1": filenames,
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816207,
                    "file": {
                        "ext|1": exts,
                        "id|1-1111111111": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size|1-100000000": 100000
                    },
                    "file_id": 1,
                    "id|1-1111111111": 49,
                    "is_dir": 0,
                    "name|1@cname": filenames,
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816207,
                    "file": {
                        "ext|1": exts,
                        "id|1-1111111111": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size|1-100000000": 100000
                    },
                    "file_id": 1,
                    "id|1-1111111111": 50,
                    "is_dir": 0,
                    "name|1": filenames,
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816207,
                    "file": {
                        "ext|1": exts,
                        "id|1-1111111111": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size|1-100000000": 100000
                    },
                    "file_id": 1,
                    "id|1-1111111111": 51,
                    "is_dir": 0,
                    "name|1": filenames,
                    "parent_id": 0,
                    "updated_at": 1630816207
                },
                {
                    "created_at": 1630816206,
                    "file": {
                        "id|1-1111111111": 0
                    },
                    "file_id": 1,
                    "id|1-1111111111": 45,
                    "is_dir": 1,
                    "name|1": dirnames,
                    "parent_id": 0,
                    "updated_at": 1630816206
                },
                {
                    "created_at": 1630773632,
                    "file": {
                        "ext|1": exts,
                        "id|1-1111111111": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size|1-100000000": 100000
                    },
                    "file_id": 1,
                    "id|1-1111111111": 40,
                    "is_dir": 0,
                    "name|1": filenames,
                    "parent_id": 0,
                    "updated_at": 1630773632
                },
                {
                    "created_at": 1630773618,
                    "file": {
                        "ext|1": exts,
                        "id|1-1111111111": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size|1-100000000": 100000
                    },
                    "file_id": 1,
                    "id|1-1111111111": 39,
                    "is_dir": 0,
                    "name|1": filenames,
                    "parent_id": 0,
                    "updated_at": 1630773618
                },
                {
                    "created_at": 1630772949,
                    "file": {
                        "ext|1": exts,
                        "id|1-1111111111": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size|1-100000000": 100000
                    },
                    "file_id": 1,
                    "id|1-1111111111": 38,
                    "is_dir": 0,
                    "name|1": filenames,
                    "parent_id": 0,
                    "updated_at": 1630772949
                },
                {
                    "created_at": 1630772907,
                    "file": {
                        "ext|1": exts,
                        "id|1-1111111111": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size|1-100000000": 100000
                    },
                    "file_id": 1,
                    "id|1-1111111111": 37,
                    "is_dir": 0,
                    "name|1": filenames,
                    "parent_id": 0,
                    "updated_at": 1630772907
                },
                {
                    "created_at": 1630772744,
                    "file": {
                        "ext|1": exts,
                        "id|1-1111111111": 1,
                        "kind": 1,
                        "md5": "b6d767d2f8ed5d21a44b0e5886680cb9",
                        "size|1-100000000": 100000
                    },
                    "file_id": 1,
                    "id|1-1111111111": 36,
                    "is_dir": 0,
                    "name|1": filenames,
                    "parent_id": 0,
                    "updated_at": 1630772744
                },
                {
                    "created_at": 1630332444,
                    "file": {
                        "id|1-1111111111": 0,
                    },
                    "file_id": 0,
                    "id|1-1111111111": 1,
                    "is_dir": 1,
                    "name|1": dirnames,
                    "parent_id": 0,
                    "updated_at": 1630332444
                }
            ],
            "more|1": [0,1]
        },
        "cost": "2.3853ms"
    }

    return Mock.mock(result);
});


Mock.mock(RegExp('/mock/api/v1/filemanager/mkdir'), "post", (options) => {
    let params = JSON.parse(options.body);

    let result = {
        "code": 0,
        "message": "创建成功",
        "data": {
            "is_dir": 1,
            "name": params.name,
            "parent_id": params.parent_id,
            "updated_at": 1656584589,
            "created_at": 1656584589,
            "id|1000-2252552525": 555555,
            "file":{
                id:0,
                size:0,
            }
        },
        "cost": "1.3664ms"
    }


    return Mock.mock(result);
});