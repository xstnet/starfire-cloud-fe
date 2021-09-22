import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { login } from '../../api/user';
import { saveUserInfo } from '../../store/reducer/user/action';
import Cache from '../../util/cache'
import './index.less';


class Login extends React.Component {

    state = {
        submitDisabled: false,
    }

    handleSubmit = (values) => {
        this.setState({ submitDisabled: true });
        message.loading({ content: '登录中...', key: 'logining' });


        let result = login(values);

        result.then(response => {
            console.log('succccccc', response);

            this.setState({ submitDisabled: false });
            message.success({ content: '登录成功...', key: 'logining', duration: 2 });
            Cache.set('isLogin', 1);
            this.props.saveUserInfo(response.data.profile);
            this.props.history.replace('/');
        }, err => {
            this.setState({ submitDisabled: false });
            message.error({ content: err.message, key: 'logining', duration: 2 });

            console.log('eeeeee', err)
        });
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

const mapStateToProps = (state, ownProps) => ({
    // home: state.Home,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
