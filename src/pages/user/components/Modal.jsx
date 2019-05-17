import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

class ModalForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}
	/**
   * @method 显示modal
   */
	showModal = (e) => {
		console.log(e);
		this.setState({
			visible: true
		});
	};

	/**
   * @method 关闭modal
   */
	closeModal = () => {
		this.props.form.resetFields();
		this.setState({
			visible: false
		});
	};
	/**
   * @method 提交
   */
	handleSubmit = (e) => {
		e.preventDefault();
		const { okHandle } = this.props;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.closeModal();
				okHandle && okHandle(values);
			} else {
				console.log(err);
			}
		});
	};

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
		let { columns, data } = this.props;
		let formItems = '';
		if (columns && columns.length) {
			formItems = columns.map((item, index) => {
				return (
					<Form.Item key={index} label={item.key}>
						{getFieldDecorator(item.key, {
							rules: [
								{
									required: true,
									message: `Please input your ${item.key}!`
								}
							],
							initialValue: data[item.key]
						})(<Input placehoder={item.key} />)}
					</Form.Item>
				);
			});
		}
		return (
			<div className="modal">
				<span onClick={this.showModal}>{this.props.children}</span>
				<Modal centered title="编辑用户信息" visible={this.state.visible} onCancel={this.closeModal} footer={null}>
					<Form onSubmit={this.handleSubmit} layout="horizontal">
						{formItems}
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Form>
				</Modal>
			</div>
		);
	}
}
export default Form.create({ name: "userForm'" })(ModalForm);
