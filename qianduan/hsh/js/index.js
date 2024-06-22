import { ajax, isLogin } from '../utils/ajax.js';  
import '../lib/jquery.js';  
import '../lib/layui/layui.js';  
  
// 登录逻辑处理
(async () => {  
    let { status, user } = await isLogin();  
    if (status === 1) {  
        handleLoginSuccess(user);  
    }  
})();  
  
// 处理登录成功的函数
function handleLoginSuccess(user) {  
    $('.off').removeClass('active'); // 隐藏未登录状态
    $('.on').addClass('active'); // 显示已登录状态
    $('.nickname').text(user.nickname); // 显示用户昵称
  
    // 点击个人中心跳转
    $('.self').on('click', () => location.href = './self.html');  
  
    // 点击退出登录按钮
    $('.logout').on('click', async () => {  
        if (!confirm('确定要退出登录吗？')) return;  
  
        let id = localStorage.getItem('uid');  
        let token = localStorage.getItem('token');  
  
        let { data: { code } } = await ajax.get('/users/logout', {  
            params: { id },  
            headers: { authorization: token }  
        });  
  
        if (code !== 1) {  
            alert('注销失败');  
            return;  
        }  
  
        localStorage.removeItem('token');  
        localStorage.removeItem('uid');  
  
        $('.off').addClass('active'); // 显示未登录状态
        $('.on').removeClass('active'); // 隐藏已登录状态
    });  
}  
  
// 渲染轮播图函数
async function renderCarousel() {  
    let { data: { code, list } } = await ajax.get('/carousel/list');  
    if (code !== 1) {  
        console.log('获取轮播图失败');  
        return;  
    }  
  
    let carouselContent = '';  
    list.forEach(e => {  
        carouselContent += `<div><img src="${ajax.defaults.baseURL}/${e.name}"></div>`;  
    });  
  
    $('#carousel > .carousel-item:first').html(carouselContent); // 假设 .carousel-item 是轮播图的容器类
  
    layui.carousel.render({  
        elem: '#carousel',  
        width: '1200px',  
        height: '600px',  
        arrow: 'hover',  
        anim: 'fade'  
    });  
}  
  
// 调用渲染轮播图函数
renderCarousel();
