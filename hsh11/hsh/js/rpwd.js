import {ajax, isLogin} from '../utils/ajax.js'
import '../lib/jquery.js'
import {pwdTest} from '../utils/reg.js'

(async () => {
    // 检查用户是否已经登录
    let {status, user, token} = await isLogin();
    if (status != 1) {
        alert('请先登录！'); // 如果未登录，提示用户进行登录
        location.href = './login.html'; // 跳转到登录页面
        return; // 停止后续代码执行
    }

    // 当表单提交时触发事件
    $('form').on('submit', async e => {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 获取用户输入的密码信息
        let oldPassword = $('.oldpassword').val();
        let newPassword = $('.newpassword').val();
        let rNewPassword = $('.rnewpassword').val();

        // 验证用户输入的数据
        if (oldPassword == '') return alert('旧密码不能为空'); // 检查旧密码是否为空
        if (newPassword == '') return alert('新密码不能为空'); // 检查新密码是否为空
        if (rNewPassword == '') return alert('确认新密码不能为空'); // 检查确认新密码是否为空
        if (oldPassword === newPassword) return alert('新密码不能和旧密码相同'); // 新密码不能与旧密码相同
        if (!pwdTest(newPassword)) return alert('新密码格式不正确'); // 检查新密码格式是否正确
        if (newPassword != rNewPassword) return alert('两次输入的新密码不一致'); // 确认两次输入的新密码是否一致

        // 准备发送给服务器的数据
        let data = {id: user.id, oldPassword, newPassword, rNewPassword};
        try {
            // 发送修改密码请求
            let {data: {code}} = await ajax.post('/users/rpwd', data, {headers: {authorization: token}});
            if (code != 1) return alert('修改密码失败'); // 如果修改失败，提示用户

            // 修改密码成功后，清除本地存储的登录信息
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
            // 提示用户修改成功并重新登录
            alert('密码修改成功，请重新登录'); // 提示用户修改成功
            location.href = './login.html'; // 跳转到登录页面
        } catch (error) {
            console.error('修改密码请求失败', error); // 捕获并记录请求中的错误
            alert('修改密码过程中出现错误，请稍后重试'); // 提示用户修改失败
        }
    });
})();
