import {ajax, isLogin} from '../utils/ajax.js'
import '../lib/jquery.js'
import '../lib/layui/layui.js';

(async () => {  
    // 定义常量，表示用户已登录的状态码  
    const LOGGED_IN_STATUS = 1;  
  
    // 封装检查登录状态的函数  
    async function checkLoginStatus() {  
        let { status, user } = await isLogin();  
        if (status === LOGGED_IN_STATUS) {  
            // 登录状态处理逻辑  
            showLoggedInUI(user);  
            setupLogoutHandler();  
        } else {  
            // 非登录状态处理逻辑  
            showLoggedOutUI();  
        }  
    }  
  
    // 封装显示登录状态的UI逻辑  
    function showLoggedInUI(user) {  
        $('.off').removeClass('active');  
        $('.on').addClass('active');  
        $('.nickname').text(user.nickname);  
        // 点击个人信息按钮，跳转到个人信息页面  
        $('.self').on('click', () => location.href = './self.html');  
    }  
  
    // 封装退出登录的处理逻辑  
    async function setupLogoutHandler() {  
        $('.logout').on('click', async () => {  
            if (!confirm('确定要退出登录吗？')) return;  
            let id = localStorage.getItem('uid');  
            let token = localStorage.getItem('token');  
            try {  
                let { data: { code } } = await ajax.get('/users/logout', { params: { id }, headers: { authorization: token } });  
                if (code !== LOGGED_IN_STATUS) {  
                    throw new Error('注销失败');  
                }  
                // 注销成功，清除本地存储中的 token 和 uid  
                localStorage.removeItem('token');  
                localStorage.removeItem('uid');  
                // 显示未登录状态的 UI  
                showLoggedOutUI();  
            } catch (error) {  
                // 注销失败，显示错误信息  
                alert(error.message || '发生未知错误');  
            }  
        });  
    }  
  
    // 封装显示非登录状态的UI逻辑  
    function showLoggedOutUI() {  
        $('.off').addClass('active');  
        $('.on').removeClass('active');  
        // 其他非登录状态的 UI 处理  
    }  
  
    // 调用检查登录状态的函数  
    await checkLoginStatus();  
})();

// 渲染轮播图
async function render() {
    // 获取轮播图列表
    let { data: { code, list } } = await ajax.get('/carousel/list');
    if (code != 1) return console.log('获取轮播图失败');
    
    let str = ``;
    // 构建轮播图的 HTML 结构
    list.forEach(e => str += `<div><img src="${ajax.defaults.baseURL}/${e.name}"></div>`);
    // 渲染轮播图
    $('#carousel > :first-child').html(str);

    // 使用 layui 渲染轮播图，动起来
    layui.carousel.render({
        elem: '#carousel', // 选择器
        width: '1200px', // 设置容器宽度
        height: '600px', // 设置容器高度
        arrow: 'hover', // 鼠标悬停时显示箭头
        anim: 'fade' // 切换动画方式
    });
}
// 调用渲染轮播图的函数
render();
