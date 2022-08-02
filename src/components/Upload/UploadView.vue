<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>上传文件</el-breadcrumb-item>
    </el-breadcrumb>
    <el-upload
      class="upload-demo"
      :mode="upload"
      action="http://127.0.0.1:8081/api/v1/upload"
      multiple
      :on-preview="handlePreview" :on-remove="handleRemove"  :headers="headersObj" :on-success="handleSuccess"
    >
      <el-button type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">请选择你要上传的文件</div>
      </template>
    </el-upload>
  </div>
</template>

<script>
export default {
  data () {
    return {
      upload: []
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%;
  height: 60%;
  transform: translate(-50%, -50%);
}
</style>
