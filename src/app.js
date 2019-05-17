export const dva = {
	config: {
		onError(err) {
			err.preventDefault();

			console.error(err);
		}
	},
	//使用dva-logger插件
	// plugins: [ require('dva-logger')() ]
};
