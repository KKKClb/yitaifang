<template>
    <div>
        <div>
            <!-- 搜索框，用于输入时自动触发搜索功能 -->
            搜索用户：<el-input class="searchInp" v-model="searchStr" placeholder="搜索用户" clearable @input="searchUser"></el-input>
        </div>
        <!-- 表格显示用户数据，showList 是一个计算属性，用于处理分页 -->
        <el-table :data="showList" border style="width: 100%">
            <!-- 用户名列，显示用户名 -->
            <el-table-column label="用户名" prop="username" align="center">
            </el-table-column>
            <!-- 年龄列，显示用户年龄 -->
            <el-table-column label="年龄" prop="age" align="center">
            </el-table-column>
            <!-- 性别列，显示用户性别 -->
            <el-table-column label="性别" prop="gender" align="center">
            </el-table-column>
            <!-- 昵称列，显示用户昵称 -->
            <el-table-column label="昵称" prop="nickname" align="center">
            </el-table-column>
            <!-- 角色列，显示用户角色 -->
            <el-table-column label="角色" prop="role" align="center">
            </el-table-column>
            <!-- 冻结账号操作列 -->
            <el-table-column align="center" prop="flag">
                <!-- 列头，显示冻结账号 -->
                <template slot="header">
                    冻结账号
                </template>
                <template slot-scope="scope">
                    <!-- 根据用户状态显示冻结或解冻按钮 -->
                    <el-button v-if="scope.row.flag" size="mini" type="warning" @click="freezeUser(scope.row.id)">冻结</el-button>
                    <el-button v-else size="mini" type="success" @click="thawUser(scope.row.id)">解冻</el-button>
                </template>
            </el-table-column>
            <!-- 操作列，显示重置密码和删除按钮 -->
            <el-table-column align="center" width="200px">
                <template slot="header">
                    操作
                </template>
                <template slot-scope="scope">
                    <!-- 重置密码按钮 -->
                    <el-button size="mini" type="primary" @click="resetPassword(scope.row.id)">重置密码</el-button>
                    <!-- 删除用户按钮 -->
                    <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页控件 -->
        <!-- page-size 每页显示 5 个，current-page 当前页码 -->
        <!-- @current-change 页码变化时触发的事件，调用 curPageChange 方法 -->
        <!-- 页码变化不会自动改变数据，需手动处理页码变化 -->
        <el-pagination :page-size="5" :current-page="1" @current-change="curPageChange"
            layout="total, prev, pager, next, jumper" :total="list.length">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 用户列表和搜索关键词
            list: [],
            searchStr: '',
            // 当前页码
            curPage: 1,
        }
    },
    methods: {
        // 修改当前页码的方法，传入新的页码值并更新当前页码
        curPageChange(newVal) {
            this.curPage = newVal;
        },
        // 重置用户密码的方法
        resetPassword(uid) {
            // 获取用户信息
            let user = this.list.find(e => e.id == uid);
            // 确认是否重置密码
            if (!confirm('确定要重置用户' + user.nickname + '的密码吗？')) return;
            // 获取管理员 ID 和 token
            let id = this.$store.state.uid;
            let token = this.$store.state.token;
            // 发送请求重置密码
            this.$http.post('/users/backend/reset', { id, uid }, { headers: { authorization: token } })
                .then(({ data: { code } }) => {
                    // 根据返回的状态码显示提示信息
                    if (code == 1) alert('重置密码成功！');
                    else alert('重置密码失败');
                })
        },
        // 删除用户的方法
        deleteUser(uid) {
            // 获取用户信息
            let user = this.list.find(e => e.id == uid);
            // 确认是否删除用户
            if (!confirm('确定要删除用户' + user.nickname + '吗？')) return;
            // 获取管理员 ID 和 token
            let id = this.$store.state.uid;
            let token = this.$store.state.token;
            // 发送请求删除用户
            this.$http.post('/users/backend/del', { id, uid }, { headers: { authorization: token } })
                .then(({ data: { code } }) => {
                    if (code != 1) return alert('删除失败！');
                    // 从列表中删除用户
                    this.list = this.list.filter(e => e.id != uid);
                })
        },
        // 冻结用户的方法
        freezeUser(uid) {
            // 获取用户信息
            let user = this.list.find(e => e.id == uid);
            // 确认是否冻结用户
            if (!confirm('确定要冻结用户' + user.nickname + '吗？')) return;
            // 获取管理员 ID 和 token
            let id = this.$store.state.uid;
            let token = this.$store.state.token;
            // 发送请求冻结用户
            this.$http.post('/users/backend/flag', { id, uid }, { headers: { authorization: token } })
                .then(({ data: { code } }) => {
                    if (code != 1) return alert('冻结失败！');
                    // 冻结成功后更新用户状态
                    user.flag = false;
                })
        },
        // 解冻用户的方法
        thawUser(uid) {
            // 获取用户信息
            let user = this.list.find(e => e.id == uid);
            // 获取管理员 ID 和 token
            let id = this.$store.state.uid;
            let token = this.$store.state.token;
            // 发送请求解冻用户
            this.$http.post('/users/backend/flag', { id, uid }, { headers: { authorization: token } })
                .then(({ data: { code } }) => {
                    if (code != 1) return alert('解冻失败！');
                    // 解冻成功后更新用户状态
                    user.flag = true;
                })
        },
        // 搜索用户的方法
        searchUser() {
            // 获取管理员 ID 和 token
            let id = this.$store.state.uid;
            let token = this.$store.state.token;
            // 发送搜索请求
            this.$http.get('/users/backend/search', { params: { id, searchStr: this.searchStr }, headers: { authorization: token } })
                .then(({ data: { code, list } }) => {
                    // 搜索失败时显示提示信息
                    if (code != 1) return alert('搜索失败');
                    // 搜索成功后更新用户列表
                    this.list = list;
                })
        }
    },
    computed: {
        // 当前页显示的用户列表
        showList() {
            // 计算当前页显示的用户列表，左闭右开区间
            let l = (this.curPage - 1) * 5;
            let r = l + 5 > this.list.length ? this.list.length : l + 5;
            return this.list.slice(l, r);
        }
    },
    created() {
        // 初始化时获取用户列表
        // 获取管理员 ID 和 token
        let id = this.$store.state.uid;
        let token = this.$store.state.token;
        // 请求获取用户信息
        this.$http.get('/users/backend/list', { params: { id }, headers: { authorization: token } })
            .then(({ data: { code, list } }) => {
                // 获取用户信息失败时显示提示
                if (code != 1) return alert('获取用户信息失败');
                // 获取用户信息成功后更新用户列表
                this.list = list;
            })
    }
}
</script>

<style scoped>
.searchInp {
    width: 200px;
    margin-bottom: 20px;
}

span {
    margin-left: 10px;
}
</style>
