<template>
    <div class="sidebar-container">
        <!-- 侧边栏菜单 -->
        <el-menu :default-active="cur_page" class="el-menu-vertical-demo custom-menu">
            <!-- 主页菜单项 -->
            <el-menu-item index="1" @click="goHome">
                <i class="el-icon-s-home"></i>
                <span slot="title">主页</span>
            </el-menu-item>
            <!-- 用户管理菜单项 -->
            <el-menu-item index="2" @click="goUsers">
                <i class="el-icon-user-solid"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <!-- 轮播图管理菜单项 -->
            <el-menu-item index="3" @click="goCarousel">
                <i class="el-icon-picture"></i>
                <span slot="title">轮播图管理</span>
            </el-menu-item>
            <!-- 添加轮播图菜单项 -->
            <el-menu-item index="4" @click="goAddCarousel">
                <i class="el-icon-circle-plus-outline"></i>
                <span slot="title">添加轮播图</span>
            </el-menu-item>
            <!-- 填充剩余空间的菜单项 -->
            <el-menu-item index="5" class="flex-grow"></el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 当前激活的菜单项索引
            cur_page: '1',
        };
    },
    methods: {
        // 跳转到主页
        goHome() {
            this.$router.push('/index/');
        },
        // 跳转到用户管理页面
        goUsers() {
            this.$router.push('/index/users');
        },
        // 跳转到轮播图管理页面
        goCarousel() {
            this.$router.push('/index/carousel');
        },
        // 跳转到添加轮播图页面
        goAddCarousel() {
            this.$router.push('/index/add-carousel');
        },
    },
    created() {
        // 根据当前路径设置激活的菜单项
        let path = this.$route.path;
        if (path.includes('/users')) this.cur_page = '2';
        if (path.includes('/carousel')) this.cur_page = '3';
        if (path.includes('/add-carousel')) this.cur_page = '4';
    },
};
</script>

<style scoped>
.custom-menu {
    background-color: #2c3e50; /* 设置侧边栏背景颜色 */
    color: #ecf0f1; /* 设置侧边栏字体颜色 */
    height: 100%; /* 确保菜单占满整个侧边栏 */
    display: flex;
    flex-direction: column;
    position: fixed; /* 固定定位，确保菜单始终在左侧 */
    top: 0; /* 侧边栏顶部对齐 */
    left: 0; /* 侧边栏左侧对齐 */
    width: 200px; /* 设置侧边栏宽度 */
}

.custom-menu .el-menu-item {
    background-color: #34495e; /* 设置菜单项背景色 */
    color: #ecf0f1; /* 设置菜单项字体颜色 */
}

.custom-menu .el-menu-item:hover {
    background-color: #1abc9c; /* 设置菜单项悬停时背景色 */
    color: #fff; /* 设置菜单项悬停时字体颜色 */
}

.custom-menu .el-menu-item.is-active {
    background-color: #1abc9c; /* 设置当前激活菜单项背景色 */
    color: #fff; /* 设置当前激活菜单项字体颜色 */
}

.sidebar-container {
    height: 100vh; /* 使侧边栏高度占满整个视口 */
    width: 200px; /* 设置侧边栏宽度 */
    position: fixed; /* 固定定位，确保侧边栏始终在左侧 */
    top: 0; /* 侧边栏顶部对齐 */
    left: 0; /* 侧边栏左侧对齐 */
    z-index: 1000; /* 设置层级，确保侧边栏在其他元素之上 */
}

.full-height {
    height: 100%; /* 确保 el-row 高度占满父容器 */
}

.flex-grow {
    flex-grow: 1; /* 填充剩余的垂直空间 */
    background-color: #34495e; /* 设置填充项的背景色与菜单项一致 */
}
</style>
