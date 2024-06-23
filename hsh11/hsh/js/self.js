import { ajax, isLogin } from '../utils/ajax.js';  
import '../lib/jquery.js';  
import { nickTest, sexTest, ageTest } from '../utils/reg.js';  
  
(async () => {  
    // 判断是否登录  
    try {  
        let { status, user, token } = await isLogin();  
        if (status !== 1) {  
            alert('请先登录！');  
            location.href = './login.html';  
            return; // 如果未登录，则退出整个异步函数  
        }  
  
        // 渲染用户数据  
        $('.username').val(user.username);  
        $('.age').val(user.age);  
        $('.gender').val(user.gender);  
        $('.nickname').val(user.nickname);  
  
        // 绑定表单提交事件  
        $('form').on('submit', async (e) => {  
            e.preventDefault();  
  
            // 验证表单  
            if (!validateForm()) {  
                return; // 如果验证失败，则不执行后续操作  
            }  
  
            // 提交表单  
            await submitForm(user.id, token);  
        });  
    } catch (error) {  
        console.error('An error occurred:', error);  
        // 在这里可以添加更详细的错误处理逻辑  
    }  
})();  
  
// 表单验证函数  
function validateForm() {  
    let age = $('.age').val();  
    let gender = $('.gender').val();  
    let nickname = $('.nickname').val();  
  
    // 判断各数据是否为空串  
    if (age === '') {  
        alert('年龄不能为空');  
        return false;  
    }  
    if (gender === '') {  
        alert('性别不能为空');  
        return false;  
    }  
    if (nickname === '') {  
        alert('昵称不能为空');  
        return false;  
    }  
  
    // 正则校验  
    if (!ageTest(age)) {  
        alert('年龄格式错误');  
        return false;  
    }  
    if (!sexTest(gender)) {  
        alert('性别格式错误');  
        return false;  
    }  
    if (!nickTest(nickname)) {  
        alert('昵称格式错误');  
        return false;  
    }  
  
    return true;  
}  
  
// 表单提交函数  
async function submitForm(userId, token) {  
    // 获取表单字段的值
    let age = $('.age').val();  
    let gender = $('.gender').val();  
    let nickname = $('.nickname').val();  
  
    // 要传递给服务器的数据  
    let data = { id: userId, age, gender, nickname };  
  
    // 请求更新接口，更新用户信息  
    try {  
        let { data: { code } } = await ajax.post('/users/update', data, { headers: { authorization: token } });  
        if (code !== 1) {  
            throw new Error('修改失败');  
        }  
        alert('修改成功');  
    } catch (error) {  
        alert('修改失败: ' + error.message);  
    }  
}