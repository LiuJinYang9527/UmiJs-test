import * as usersService from '../services/users';

export default {
	//命名空间
	namespace: 'users',
	//model数据
	state: {
		list: [],
		total: 0,
		page: 0
	},
	//主要用来处理同步请求
	reducers: {
		save(state, { payload: { data: list, total, page } }) {
			return { ...state, list, total, page };
		}
	},
	//主要用来处理异步请求
	effects: {
		/**
     * @method 请求用户列表
     */
		*fetch({ payload: { page = 1 } }, { call, put }) {
			const { data, headers } = yield call(usersService.fetch, { page });
			yield put({
				type: 'save',
				payload: {
					data,
					total: parseInt(headers['x-total-count'], 10),
					page: parseInt(page, 10)
				}
			});
		},
		/**
     * @method 修改用户信息
     */
		*patch({ payload: { id, values } }, { call, put, select }) {
			yield call(usersService.patch, id, values);
			const page = yield select((state) => state.users.page);
			yield put({
				type: 'fetch',
				payload: {
					page
				}
			});
		},
		/**
		 * @method 删除对应用户信息
		 * @param {Number} id
		 */
		*deleteUser({ payload: { id } }, { call, put, select }) {
			yield call(usersService.remove, id);
			const page = yield select((state) => state.users.page);
			yield put({
				type: 'fetch',
				payload: {
					page
				}
			});
		},
		/**
		 * @method 添加用户
		 * @param {Object} values
		 */
		*addUser({ payload: values }, { call, put, select }) {
			let data = yield call(usersService.create, values);
			const page = yield select((state) => state.users.page);
			yield put({
				type: 'fetch',
				payload: {
					page
				}
			});
			return data;
		}
	},
	subscriptions: {
		//监听路由变化
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/user') {
					dispatch({ type: 'fetch', payload: query });
				}
			});
		}
	}
};
