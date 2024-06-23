import '../lib/jquery.js';  
import { ajax } from '../utils/ajax.js';  
import { nameTest, pwdTest } from "../utils/reg.js";  
  
// 验证用户名和密码的函数  
function validateForm(username, password) {  
    if (username === '') return '用户名不能为空';  
    if (!nameTest(username)) return '用户名格式错误';  
    if (password === '') return '密码不能为空';  
    if (!pwdTest(password)) return '密码格式错误';  
    return null; // 如果没有错误，返回 null  
}  
  
// 提交表单时的处理函数  
$('form').on('submit', async e => {  
    e.preventDefault();  
  
    const username = $('.username').val();  
    const password = $('.password').val();  
  
    const error = validateForm(username, password);  
    if (error) {  
        alert(error);  
        return;  
    }  
  
    try {  
        const { data: { code, message, token, user } } = await ajax.post('/users/login', { username, password });  
        if (code !== 1) {  
            // 登录失败  
            if (message === '用户名或密码错误') {  
                $('.error').css('display', 'block');  
                // 可以考虑在一段时间后隐藏错误信息  
                // setTimeout(() => $('.error').css('display', 'none'), 3000);  
            } else {  
                alert(message);  
            }  
            return;  
        }  
  
        // 登录成功  
        localStorage.setItem('token', token);  
        localStorage.setItem('uid', user.id);  
        location.href = './index.html';  
    } catch (error) {  
        // AJAX 请求失败或其他错误  
        alert('登录失败，请稍后重试。');  
    }  
});