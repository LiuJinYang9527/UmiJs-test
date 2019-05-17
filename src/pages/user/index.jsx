import React, { Component } from 'react';
import { Table, Pagination } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import ModalForm from './components/Modal';
class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
					render: (text) => <a href="javascript:;">{text}</a>
				},
				{
					title: '电子邮箱',
					dataIndex: 'email',
					key: 'email'
				},
				{
					title: '个人主页',
					dataIndex: 'website',
					key: 'website'
				},
				{
					title: '操作',
					dataIndex: 'operation',
					key: 'operation',
					render: (text, item) => {
						return (
							<div>
								<ModalForm
									columns={this.state.formRules}
									data={item}
									okHandle={this.updateUserInfo.bind(null, item.id)}
								>
									<a href="javascript:;;">编辑</a>
								</ModalForm>
								&nbsp;
								<a href="javascript:;;">删除</a>
							</div>
						);
					}
				}
			],
			formRules: [
				{
					key: 'name',
					required: true,
					type: 'Input'
				},
				{
					key: 'email',
					required: true,
					type: 'Input'
				},
				{
					key: 'website',
					required: true,
					type: 'Input'
				}
			]
		};
	}
	/**
   * @method 改变页码
   * @param {Number} page
   * @param {Number}  pageSize
   */
	onPageChange = (page, pageSize) => {
		let { dispatch } = this.props;
		//routerRedux配合dva中subscriptions中监听路由变化使用
		dispatch(
			routerRedux.push({
				path: '/users',
				query: {
					page
				}
			})
		);
	};
	/**
   * @method 修改用户信息
   * @param {Number} id
   * @param {Object} values
   */
	updateUserInfo = (id, values) => {
		let { dispatch } = this.props;
		dispatch({
			type: 'users/patch',
			payload: {
				id,
				values
			}
		});
	};
	componentDidMount() {}
	render() {
		let { columns } = this.state;
		let { list, page, total, loading } = this.props;
		return (
			<div className="user-page">
				<Table
					columns={columns}
					dataSource={list}
					pagination={false}
					rowKey={(item) => item.id}
					loading={loading}
				/>
				<Pagination current={page} total={total} onChange={this.onPageChange} pageSize={3} />
			</div>
		);
	}
}
//将user model connect到当前组件上
const mapStateToProps = (state) => {
	let { page, total, list } = state.users;
	//dva内置dva-loading插件 会根据请求情况自动设置l状态内得loading为true或false;
	let loading = state.loading.models.users;
	return {
		page,
		total,
		list,
		loading
	};
};
export default connect(mapStateToProps)(User);
