import '../lib/jquery.js'  
import { ajax } from '../utils/ajax.js'  
import { pwdTest, nickTest } from "../utils/reg.js"; // 注意这里移除了 nameTest 和 username 的验证  
  
// 当表单提交时  
$('form').on('submit', async e => {  
    // 阻止默认行为  
    e.preventDefault();  
  
    // 获取表单数据  
    var oldPassword = $('.oldPassword').val(); // 假设您有一个字段用于输入旧密码  
    var newPassword = $('.password').val();  
    var rNewPassword = $('.rpassword').val();  
    var nickname = $('.nickname').val(); // 昵称可能是可选的，取决于您的需求  
  
    // 验证空串以及格式  
    if (oldPassword == '' || newPassword == '' || rNewPassword == '') return alert('表单不能为空');  
    if (!pwdTest(newPassword)) return alert('密码格式错误');  
    if (nickname && !nickTest(nickname)) return alert('昵称格式错误'); // 如果昵称是可选的，则添加检查  
  
    // 两次密码是否一致  
    if (newPassword != rNewPassword) return alert('两次密码不一致');  
  
    // 发送的数据（注意：这里通常不需要发送昵称和用户名来修改密码）  
    let data = { oldPassword, newPassword }; // 根据您的后端API调整数据格式  
  
    // 发送请求到修改密码的API  
    let response = await ajax.post('/users/updatePassword', data); // 假设这是修改密码的API端点  
  
    // 检查响应  
    if (!response.success || response.data.code != 1) { // 根据您的API响应结构进行调整  
        return $('.error').css('display', 'block').text(response.message || '修改密码失败');  
    }  
  
    // 修改成功  
    alert('密码修改成功，点击确定跳转到登录页面或继续页面');  
    // 根据需要重定向到登录页面或留在当前页面  
    // location.href = './login.html'; // 如果需要重定向到登录页面，取消注释这行代码  
});