import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const artInfo = r => require.ensure([], () => r(require('../page/artInfo/artInfo')), 'artInfo');
const editArt = r => require.ensure([], () => r(require('../page/editArt/editArt')), 'editArt');



export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //首页
    {
      path: '/home',
      component: home
    },
    //文章详情
    {
      path: '/artInfo',
      component: artInfo
    },
    //新建文章
    {
      path: '/editArt',
      component: editArt
    },
  ]
}]