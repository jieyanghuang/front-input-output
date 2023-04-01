// 配置路由相关的信息
import VueRouter from 'vue-router'
import Vue from 'vue'

// 1.通过Vue.use(插件), 安装插件
Vue.use(VueRouter)

// 2.创建VueRouter对象
const routes = [
    {
        path: '/',
        // redirect重定向
        redirect: '/empty'
    },
    {
        path: '/empty',
        component: () => import("../components/empty")

    },
    {
        path: '/heatmap',
        component: () => import("../components/heatMap")
    }
]
const router = new VueRouter({
    // 配置路由和组件之间的应用关系
    routes,
    mode: 'history',
    linkActiveClass: 'active'
})

// 重写push，使得相同路由之间的跳转不报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

// 3.将router对象传入到Vue实例
export default router

