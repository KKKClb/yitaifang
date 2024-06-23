<template>
    <div class="container" :style="containerStyle">
        <div class="box">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <!-- 用户名输入框 -->
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码输入框 -->
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 验证码输入框 -->
                <el-form-item label="验证码" prop="captcha">
                    <el-input type="text" v-model="ruleForm.captcha" autocomplete="off">
                        <template slot="append">
                            <!-- v-html 将变量内容作为 HTML 解析 -->
                            <!-- 点击刷新验证码 -->
                            <div v-html="captchaPic" @click="getCode"></div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 登录按钮和重置按钮 -->
                    <el-button class="btn" type="primary" @click="login('ruleForm')">登录</el-button>
                    <el-button class="btn" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        // 验证用户名
        let checkUsername = (rule, value, callback) => {
            if (value === '') callback(new Error('用户名不能为空'));
            else callback();
        };
        // 验证密码
        let checkPassword = (rule, value, callback) => {
            if (value === '') callback(new Error('密码不能为空'));
            else callback();
        };
        // 验证验证码
        let checkCaptcha = (rule, value, callback) => {
            if (value != this.captchaAns) callback(new Error('验证码错误'));
            else callback();
        };
        return {
            // 验证码答案
            captchaAns: '',
            // 验证码图片
            captchaPic: '',
            // 背景图片
            backgroundUrl: require('@/assets/bg.jpg'),
            ruleForm: {
                // 表单数据
                username: '',
                password: '',
                captcha: '',
            },
            rules: {
                username: [
                    // 自定义用户名验证规则
                    { validator: checkUsername, trigger: 'blur' }
                ],
                password: [
                    // 自定义密码验证规则
                    { validator: checkPassword, trigger: 'blur' }
                ],
                captcha: [
                    // 自定义验证码验证规则
                    { validator: checkCaptcha, trigger: 'blur' }
                ],
            }
        };
    },
    computed: {
        // 动态设置容器样式
        containerStyle() {
            return {
                background: `url(${this.backgroundUrl}) no-repeat center center`,
                backgroundSize: 'cover',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            };
        }
    },
    methods: {
        // 登录处理函数
        login(formName) {
            this.$refs[formName].validate((res) => {
                if (res) {
                    let username = this.ruleForm.username;
                    let password = this.ruleForm.password;
                    this.$http.post('/users/backend/login', {username, password})
                        .then(({data: {code}}) => {
                            if (code == 1) {
                                this.$router.push('/index');
                            } else {
                                alert('用户名或密码错误');
                            }
                        })
                } else {
                    console.log('参数错误');
                    return false;
                }
            });
        },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getCode();
        },
        // 获取验证码
        getCode() {
            this.$http.get('/users/backend/code')
                .then(({data: {code, data: {text, data}}}) => {
                    if (code != 1) return alert('获取验证码失败');
                    this.captchaAns = text;
                    this.captchaPic = data;
                    console.log(text);
                });
        }
    },
    created() {
        // 组件创建时获取验证码
        this.getCode();
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-size: cover;
}

.box {
    width: 500px; /* 增加宽度以确保内部空间充足 */
    padding: 40px; /* 调整内边距，使其均匀 */
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.9); /* 半透明背景 */
}

.el-form-item {
    margin-bottom: 20px;
}

.el-input__inner {
    height: 40px;
    font-size: 16px;
}

.el-button {
    height: 40px;
    font-size: 16px;
}

.btn {
    width: 48%;
}

.btn + .btn {
    margin-left: 4%;
}
</style>
