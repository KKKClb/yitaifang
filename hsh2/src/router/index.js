import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    // 根路径默认跳转到登录页面
    {
        path: '/',
        redirect: '/login'
    },
    // 登录页面路由
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login')
    },
    // 主页面路由
    {
        path: '/index',
        component: () => import('@/views/Index'),
        children: [
            // 主页面默认子路由
            {
                path: '/',
                name: 'index',
                component: () => import('@/components/manager/Home'),
            },
            // 用户列表子路由
            {
                path: 'users',
                component: () => import('@/components/manager/Users'),
            },
            // 轮播图列表子路由
            {
                path: 'carousel',
                component: () => import('@/components/manager/Carousel'),
            },
            // 添加轮播图子路由
            {
                path: 'add-carousel',
                component: () => import('@/components/manager/AddCarousel'),
            },
        ]
    },
    // 未匹配到路由时重定向到登录页面
    {
        path: '/*',
        redirect: '/login'
    }
]

// 解决导航重复点击导致的错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

// 创建并配置路由实例
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 导出路由实例
export default router;
