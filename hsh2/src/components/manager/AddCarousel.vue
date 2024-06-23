<template>
    <div class="carousel-upload-container">
      <div class="carousel-upload-box">
        <!-- 文件上传输入框 -->
        <input type="file" @change="handleFileChange" class="carousel-file-input"/>
      </div>
      <div class="carousel-btn-box">
        <!-- 点击按钮触发 submitUpload 方法，向后端服务器发送请求添加轮播图 -->
        <el-button type="primary" @click="submitUpload">上传轮播图</el-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 上传文件的状态
        isFileSelected: false,
        // 存储上传的文件
        selectedFile: null,
      };
    },
    methods: {
      handleFileChange(event) {
        // 获取上传的文件并更新状态
        this.selectedFile = event.target.files[0];
        this.isFileSelected = true;
      },
      submitUpload() {
        // 检查是否选择了文件
        if (!this.isFileSelected) {
          alert('请先上传图片');
          return;
        }
        // 获取管理员ID和token
        const userId = this.$store.state.uid;
        const authToken = this.$store.state.token;
        // 创建表单数据对象，添加管理员ID和上传的文件
        const formData = new FormData();
        formData.append('id', userId);
        formData.append('carousel', this.selectedFile);
        // 发送请求以添加轮播图
        this.$http.post('/carousel/backend/add', formData, { headers: { authorization: authToken } })
          .then(response => {
            const { code } = response.data;
            // 根据响应结果显示消息
            if (code !== 1) {
              alert('上传失败');
            } else {
              alert('上传成功');
            }
          })
          .catch(error => {
            console.error('上传轮播图失败', error);
            alert('上传轮播图失败，请稍后重试');
          });
      }
    },
  }
  </script>
  
  <style scoped>
  .carousel-upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  
  .carousel-upload-box {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .carousel-file-input {
    font-size: 16px;
    padding: 10px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .carousel-btn-box {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .el-button {
    width: 200px;
    height: 50px;
    font-size: 18px;
  }
  </style>
  