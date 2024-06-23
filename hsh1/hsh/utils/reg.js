// 正则表达式验证函数 (基础柯里化)
function regTest(reg) {
    return (value) => {
        return reg.test(value);
    };
}

// 用户名验证: 以小写字母或数字开头，后面跟 3-11 个字母、数字或下划线
let nameTest = regTest(/^[a-z0-9]\w{3,11}$/);

// 密码验证: 6-12 个字母、数字或下划线
let pwdTest = regTest(/\w{6,12}/);

// 昵称验证: 2-5 个汉字
let nickTest = regTest(/^[\u4e00-\u9fa5]{2,5}$/);

// 年龄验证: 1-120 之间的数字
let ageTest = regTest(/^([1-9]\d?|1[01]\d|120)$/);

// 性别验证: 男或女
let sexTest = regTest(/^(男|女)$/);

// 导出验证函数
export { nameTest, pwdTest, nickTest, ageTest, sexTest };
