import * as usersService from '../services/users';

export default {
	namespace: 'users',
	state: {
		list: [],
		total: 0,
		page: 0
	},
	reducers: {
		save(state, { payload: { data: list, total, page } }) {
			return { ...state, list, total, page };
		}
	},
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
    *patch({payload:{id,values}},{call,put,select}){
      yield call(usersService.patch,id, values);
      const page = select(state=>state.page);
      yield put({
        type:'fetch',
        payload:{
          page
        }
      })
    }
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/user') {
					dispatch({ type: 'fetch', payload: query });
				}
			});
		}
	}
};
