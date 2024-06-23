<template>
    <div>
      <el-row>
        <!-- 循环渲染每个轮播图 -->
        <el-col :span="8" v-for="(carousel, index) in carousels" :key="carousel.id">
          <el-card class="carousel-card">
            <!-- 显示轮播图图片 -->
            <img :src="`${baseURL}/${carousel.name}`" class="carousel-image">
            <!-- 删除轮播图按钮 -->
            <el-button class="remove-btn" size="mini" type="danger" @click="removeCarousel(carousel.id)">删除</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 轮播图数据列表
        carousels: [],
        baseURL: this.$http.defaults.baseURL, // 基础URL
      };
    },
    methods: {
      removeCarousel(carouselId) {
        // 确认是否删除轮播图
        if (!confirm('确定要删除这张轮播图吗？')) return;
        // 获取管理员ID和token
        const userId = this.$store.state.uid;
        const authToken = this.$store.state.token;
        // 发送请求删除指定轮播图
        this.$http.post('/carousel/backend/remove', { id: userId, imgId: carouselId }, { headers: { authorization: authToken } })
          .then(response => {
            const { code } = response.data;
            // 根据响应结果更新轮播图列表
            if (code === 1) {
              this.carousels = this.carousels.filter(carousel => carousel.id !== carouselId);
            } else {
              alert('删除失败');
            }
          })
          .catch(error => {
            console.error('删除轮播图失败', error);
            alert('删除轮播图失败，请稍后重试');
          });
      },
      fetchCarousels() {
        // 获取轮播图列表数据
        this.$http.get('/carousel/list')
          .then(response => {
            const { code, list } = response.data;
            if (code === 1) {
              this.carousels = list;
            } else {
              console.error('获取轮播图列表失败');
            }
          })
          .catch(error => {
            console.error('获取轮播图列表失败', error);
            alert('获取轮播图列表失败，请稍后重试');
          });
      }
    },
    created() {
      // 组件创建时获取轮播图列表数据
      this.fetchCarousels();
    }
  };
  </script>
  
  <style scoped>
  .carousel-card {
    border: none;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .carousel-image {
    width: 100%;
    height: 213px;
    object-fit: cover;
  }
  
  .remove-btn {
    margin-top: 10px;
    width: 100%;
  }
  </style>
  