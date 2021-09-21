import React from 'react';
import { Form, Input, Button, Checkbox,message } from 'antd';
import Cache from '../../util/cache'
import './index.less';


class Login extends React.Component {

    state = {
        submitDisabled: false,
    }

    handleSubmit = (values) => {
        console.log(this.props);
        console.log('Success:', values);
        this.setState({submitDisabled: true});
        setTimeout(() => {
            this.setState({submitDisabled: false})
        }, 2000);

        message.loading({ content: '登录中...', key:'logining' });
        setTimeout(() => {
          message.success({ content: '登录成功!', key:'logining', duration: 2 });
            Cache.set('isLogin', 1);
            this.props.history.replace('/');
        }, 2000);
    };

    render() {
        return (
            <div className="login">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 6 }}
                    initialValues={{ remember: true }}
                    onFinish={this.handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 6 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 6 }}>
                        <Button disabled={this.state.submitDisabled} type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;