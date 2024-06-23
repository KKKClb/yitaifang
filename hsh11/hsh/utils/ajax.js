import axios from '../lib/axios.js';

// 设置默认基础URL
axios.defaults.baseURL = 'http://localhost:9000';
let ajax = axios;

// 检查用户是否已登录
async function isLogin() {
    // 从本地存储中获取 token 和用户 ID
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('uid');

    // 返回状态码 0 表示未登录，1 表示已登录
    // 如果 token 或 ID 为空
    if (!token || !id) return {status: 0, message: '未登录'};

    // 使用 token 和 ID 请求用户信息
    let {data: {code, user}} = await ajax.get('/users/info', {params: {id}, headers: {authorization: token}});
    // 如果 code 为 1 则表示成功，否则表示失败
    if (code != 1) return {status: 0, message: '未登录'};
    // 返回状态码、用户信息和 token
    return {status: 1, message: '已登录', user, token};
}

// 导出模块
export {ajax, isLogin};
