import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 从 sessionStorage 中获取 token 和用户 ID，如果没有则为空字符串
        token: sessionStorage.getItem('token') || '',
        uid: sessionStorage.getItem('uid') || '',
    },
    mutations: {
        // 更新 token 并保存到 sessionStorage 中
        setToken(state, token) {
            state.token = token;
            sessionStorage.setItem('token', token);
        },
        // 更新用户 ID 并保存到 sessionStorage 中
        setUid(state, id) {
            state.uid = id;
            sessionStorage.setItem('uid', id);
        },
        // 注销，清空 state 和 sessionStorage 中的 token 和用户 ID
        logout(state) {
            state.token = '';
            state.uid = '';
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('uid');
        }
    }
})
