/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl;
//hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
//history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式.
//abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
let routerMode='history';
const imgBaseUrl = 'https://fuss10.elemecdn.com';

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'https://cnodejs.org/';
	//routerMode = 'hash'
}else{
	baseUrl = 'https://mainsite-restapi.ele.me';
	//routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl
}