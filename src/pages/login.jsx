import React, { Component } from 'react';
import { Button, Input, Form, Icon, CheckBox } from 'antd';

class Login extends Component {
	render() {
		return (
			<div className="login-page">
				<div class="title">UmiJs</div>
				<Input size="small" placeholder="请输入账号" />
				<Input size="small" placeholder="请输入密码" />
				<Button>登录</Button>
			</div>
		);
	}
}
export default Login;
