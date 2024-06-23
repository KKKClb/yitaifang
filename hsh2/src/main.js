import Vue from 'vue';
import App from './App.vue';
// 引入路由配置
import router from './router';
// 引入 Element-UI 组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入自定义配置的 axios 实例
import axios from '@/http';
// 引入 Vuex store
import store from './store';

// 配置 axios 响应拦截器
axios.interceptors.response.use(function(response) {
    // 获取响应数据
    let data = response.data;
    if (data) {
        // 更新 token，如果响应中存在 token
        if (data.token) {
            // console.log('更新 token: ' + data.token);
            store.commit('setToken', data.token);
        }
        // 保存管理员用户 ID，如果响应中存在
        if (data.user && data.user.id) {
            // console.log('设置用户 ID: ' + data.user.id);
            store.commit('setUid', data.user.id);
        }
    }
    return response;
});

// 配置全局前置路由守卫
router.beforeEach((to, from, next) => {
    // 如果前往登录页面，直接放行
    if (to.path === '/login') {
        next();
    } else {
        // 否则检查用户是否已登录
        if (store.state.token && store.state.uid) {
            next();
        } else {
            // 未登录，跳转到登录页面
            router.push('/login');
        }
    }
});

// 将 axios 实例挂载到 Vue 原型上
Vue.prototype.$http = axios;
// 将 store 实例挂载到 Vue 原型上
Vue.prototype.$store = store;
// 使用 Element-UI 插件
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 创建 Vue 实例并挂载
new Vue({
    render: h => h(App),
    router,  // 将路由配置注入 Vue 实例
}).$mount('#app');
