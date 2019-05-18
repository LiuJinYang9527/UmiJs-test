# UmiJs

![截图](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/bomb/images/umi-dva_1558167824634.gif)
参考[官方模板](https://github.com/sorrycc/blog/issues/62),使用内置约定式目录并结合DvaJs状态管理API实现的Demo.

[官方文档](https://umijs.org/zh/guide/)

## 运行
```
安装依赖
yarn

运行
yarn start

打包
yarn build
```
## 项目目录

```
|--dist/                       //默认打包输出目录
|--mock/                       //mock文件目录 基于express 可用于模拟数据
|__src/
    |--layouts/index.jsx       //全局布局 在路由最外层套的一层路由
    |--models/                 //全局model目录
        |--global.js           //全局model
    |--pages/                  //页面目录
        |--.umi/               //dev 临时目录，需添加到 .gitignore
        |--.umi--production    //build 临时目录，会自动删除
        |--document.ejs        //HTML模板
        |--404.jsx             //404页面
        |--page1.js            //页面1 会生成对应的/page1 路由
    |--global.css              //全局样式 会自动引入
    |--global.js               //会在入口文件前自动引入 可做初始化操作
|--utils                       //utils目录
|--.umirc.js                   //umi配置  详情:https://umijs.org/zh/config/
|--.env                        //环境变量
....
```
[目录及约定](https://umijs.org/zh/guide/app-structure.html#es6-%E8%AF%AD%E6%B3%95)

[约定式路由](https://umijs.org/zh/guide/router.html#%E7%BA%A6%E5%AE%9A%E5%BC%8F%E8%B7%AF%E7%94%B1)

## 内置状态管理
UmiJs内部可以直接使用DvaJs数据流管理框架来进行状态管理。具体运用详见```/src/pages/user/model```目录,建议先了解DvaJs框架基础用法。

DvaJs中内置了dva-loading插件，此插件会根据异步请求的情况自动设置数据中的loading状态为true/false,可通过mapStateToProps将此loading状态绑定到对应的组件中，例如:
```javascript
// src/pages/user/index.jsx

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


```

[UmiJs with DvaJs](https://umijs.org/zh/guide/with-dva.html)

[DvaJs官方文档](https://dvajs.com/guide/)

## 其他
+ 在组件中如果要使用路由相关信息，可通过内置 umi/withRouter高阶组件包裹该组件即可

```javascript
// src/pages/user/components/Modal.jsx
import withRouter from "umi/withRouter"
class ModalForm extends Component {
  ....
}
export default Form.create({ name: "userForm'" })(withRouter(ModalForm));

```




