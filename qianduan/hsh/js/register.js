import '../lib/jquery.js';
import { ajax } from '../utils/ajax.js';
import { nameTest, pwdTest, nickTest } from "../utils/reg.js";

// 为表单的提交事件绑定事件处理程序
$('form').on('submit', async (e) => {
    // 阻止表单的默认提交行为
    e.preventDefault();

    // 获取表单字段的值
    const username = $('.username').val();
    const password = $('.password').val();
    const rpassword = $('.rpassword').val();
    const nickname = $('.nickname').val();

    // 检查表单字段是否为空
    if (!username || !password || !rpassword || !nickname) {
        return alert('表单不能为空');
    }

    // 验证用户名格式
    if (!nameTest(username)) {
        return alert('用户名格式错误');
    }

    // 验证密码格式
    if (!pwdTest(password)) {
        return alert('密码格式错误');
    }

    // 验证昵称格式
    if (!nickTest(nickname)) {
        return alert('昵称格式错误');
    }

    // 检查两次输入的密码是否一致
    if (password !== rpassword) {
        return alert('两次密码不一致');
    }

    // 准备提交的数据
    const data = { username, password, rpassword, nickname };

    try {
        // 发送注册请求到服务器
        const response = await ajax.post('/users/register', data);
        const { data: { code } } = response;

        // 检查服务器响应的代码
        if (code !== 1) {
            return $('.error').css('display', 'block');
        }

        // 注册成功，提示用户并跳转到登录页面
        alert('注册成功，点击确定跳转到登录页面');
        location.href = './login.html';
    } catch (error) {
        // 捕获并处理请求错误
        console.error('Error during registration:', error);
        $('.error').css('display', 'block');
    }
});
