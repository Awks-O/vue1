const routers = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
}];
import Login from './components/Login';

const dashboard = resolve => require(['./views/index.vue'], resolve);
//使用了vue-routerd的[Lazy Loading Routes

//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: (resolve) => require(['./views/index.vue'], resolve),
    redirect: '/dashboard',
    name: '首页',
    children: [{ path: 'dashboard', component: dashboard }]
  },
]

//实例化vue的时候只挂载constantRouter
// export default new Router({
//   routes: constantRouterMap
// });

//异步挂载的路由
//动态需要根据权限加载的路由表 
// export const asyncRouterMap = [
//   {
//     path: '/permission',
//     component: Layout,
//     name: '权限测试',
//     meta: { role: ['admin','super_editor'] }, //页面需要的权限
//     children: [
//     { 
//       path: 'index',
//       component: Permission,
//       name: '权限测试页',
//       meta: { role: ['admin','super_editor'] }  //页面需要的权限
//     }]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ];
export default constantRouterMap;