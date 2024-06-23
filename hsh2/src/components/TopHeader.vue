<template>
  <div class="header-container">
    <el-menu class="el-menu-demo custom-menu" mode="horizontal">
      <el-menu-item index="1" style="flex-grow: 1;"></el-menu-item> <!-- 填充空白区域 -->
      <el-menu-item index="2" @click="logout" class="logout-button">注销</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { Message } from 'element-ui'; // 导入需要的 Element UI 组件

export default {
  methods: {
    logout() {
      if (!confirm('确定要注销吗？')) return;
      // 添加注销逻辑
      console.log('执行注销操作');
      Message.success('成功注销'); // 显示注销成功的消息
      // 示例：清除本地存储并重定向到登录页面
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      window.location.href = './login.html';
    }
  }
}
</script>

<style scoped>
.header-container {
  position: fixed; /* 固定定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度100%，撑满页面 */
  z-index: 1000; /* 可能需要调整的层级 */
}

.custom-menu {
  background-color: #2c3e50; /* 设置背景颜色，与左侧导航栏一致 */
  color: #ecf0f1; /* 设置字体颜色 */
  display: flex;
  align-items: center;
}

.custom-menu .el-menu-item {
  background-color: #34495e; /* 设置菜单项背景颜色 */
  color: #ecf0f1; /* 设置菜单项字体颜色 */
  flex-grow: 0; /* 禁止填充剩余空间 */
}

.custom-menu .el-menu-item:hover {
  background-color: #1abc9c; /* 设置菜单项悬停时背景颜色 */
  color: #fff; /* 设置菜单项悬停时字体颜色 */
}

.custom-menu .el-menu-item.is-active {
  background-color: #1abc9c; /* 设置菜单项激活时背景颜色 */
  color: #fff; /* 设置菜单项激活时字体颜色 */
}

.logout-button {
  margin-right: 20px; /* 设置右侧边距 */
}
</style>
