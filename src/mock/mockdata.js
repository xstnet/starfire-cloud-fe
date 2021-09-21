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