// ref: https://umijs.org/config/
export default {
	treeShaking: true,
	plugins: [
		// ref: https://umijs.org/plugin/umi-plugin-react.html
		[
			'umi-plugin-react',
			{
				antd: true,
				dva: true,
				dynamicImport: { webpackChunkName: true },
				title: 'UmiJs-Cli2',
				dll: false,

				routes: {
					exclude: [ /models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/, /components\// ]
				}
			}
		]
	],
	//是否禁用css modules
	disableCSSModules:false,
	//打包静态资源后缀
	publicPath: '/',
	//proxy代理
	proxy: {
		'/api': {
			target: 'http://jsonplaceholder.typicode.com/',
			changeOrigin: true,
			pathRewrite: { '^/api': '' }
		}
	}
};
