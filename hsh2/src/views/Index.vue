<template>
    <el-container>
        <el-header>
            <!-- 顶部导航栏 -->
            <top-header></top-header>
        </el-header>
        <el-container>
            <!-- 左侧导航栏 -->
            <el-aside width="200px">
                <left-menu></left-menu>
            </el-aside>
            <!-- 主内容区域 -->
            <el-main>
                <!-- 子路由显示的内容区域 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </template>
  
  <script>
  import LeftMenu from "@/components/LeftMenu";
  import TopHeader from "@/components/TopHeader";
  
  export default {
    components: {
        LeftMenu,
        TopHeader,
    },
  };
  </script>
  