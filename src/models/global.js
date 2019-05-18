export default {
	namespace: 'global',
	state: [],
	reducers: {
		add(state, { payload: value }) {
			return [ ...state, value ];
		}
	}
};
