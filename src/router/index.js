import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '仪表台', icon: 'dashboard', affix: true }
        }]
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    /* {
        path: '/user',
        component: Layout,
        redirect: '/user/user',
        name: 'User',
        meta: { title: '用户管理', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'userlist',
                name: 'Userlist',
                component: () => import('@/views/userlist/index'),
                meta: { title: '用户列表', icon: 'table' }
            },
            {
                path: 'adminlist',
                name: 'Adminlist',
                component: () => import('@/views/adminlist/index'),
                meta: { title: '管理员列表', icon: 'tree' }
            }
        ]
    },*/
    {
        path: '/goods',
        component: Layout,
        redirect: '/goods/goods',
        name: 'Goods',
        meta: { title: '商品管理', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'goodslist',
                name: 'GoodsList',
                component: () => import('@/views/goods/goodslist/index'),
                meta: { title: '商品列表', icon: 'form' }
            },
            {
                path: 'goodsclass',
                name: 'GoodClass',
                component: () => import('@/views/goods/goodsclass/index'),
                meta: { title: '商品分类', icon: 'form' }
            }
        ]
    }

    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', hidden: true }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [
    // {
    //     path: '/permission',
    //     component: Layout,
    //     name: '权限测试',
    //     meta: { role: [] }, // 页面需要的权限
    //     children: [
    //         {
    //             path: 'index',
    //             component: Permission,
    //             name: '权限测试页',
    //             meta: { role: ['admin', 'super_editor'] } // 页面需要的权限
    //         }]
    // },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/user',
        name: 'User',
        meta: { title: '用户管理', icon: 'el-icon-s-help', roles: ['admin', 'super_editor'] },
        children: [
            {
                path: 'userlist',
                name: 'Userlist',
                component: () => import('@/views/user/userlist/index'),
                meta: { title: '用户列表', icon: 'table' }
            },
            {
                path: 'adminlist',
                name: 'Adminlist',
                component: () => import('@/views/user/adminlist/index'),
                meta: { title: '管理员列表', icon: 'tree', role: ['admin', 'super_editor'] }
            }
        ]
    },
    {
        path: '/business',
        component: Layout,
        redirect: '/business/business',
        name: 'Business',
        meta: { title: '商家管理', icon: 'el-icon-s-help', roles: ['admin', 'super_editor'] },
        children: [
            {
                path: 'businesslist',
                name: 'Businesslist',
                component: () => import('@/views/business/businesslist/index'),
                meta: { title: '商家列表', icon: 'table', role: ['admin', 'super_editor'] }
            },
            {
                path: 'businesssetting',
                name: 'Businesssetting',
                component: () => import('@/views/business/businesssetting/index'),
                meta: { title: '商家设置', icon: 'tree', role: ['admin', 'super_editor'] }
            }
        ]
    },
    {
        path: '/setting',
        component: Layout,
        redirect: '/setting',
        name: '系统设置',
        meta: { title: '系统设置', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'home/home',
                name: 'Home',
                component: () => import('@/views/setting/home/home'),
                meta: { title: '首页设置' }
            },
            {
                path: 'other',
                name: 'Other',
                component: () => import('@/views/setting/other'),
                meta: { title: '其他设置' }
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router

