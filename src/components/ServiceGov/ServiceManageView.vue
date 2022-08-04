<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>服务治理</el-breadcrumb-item>
      <el-breadcrumb-item>服务管理</el-breadcrumb-item>
    </el-breadcrumb>
      </el-header>
      <el-container>
        <el-aside width="200px">
             <el-menu
          background-color="#fff"
          text-color="#hhh"
          unique-opened
          active-text-color="#409EFF"
        >
        <el-menu-item :index="item.projectId" v-for="item in serviceManageList" :key="item.projectId" @click="saveNavState(index)">
        <template #title>
            <span>{{item.projectName}}</span>
        </template>
        </el-menu-item>
        </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      serviceManageList: [],
      activePath: ''
    }
  },
  created () {
    this.getServiceManageList()
  },
  methods: {
    async getServiceManageList () {
      const { data: res } = await require('axios').get('/projectList')
      if (res.status !== 100) return this.$message.error('获取服务列表失败')
      this.serviceManageList = res.data
      console.log(res)
    },
    saveNavState (index) {
      this.activePath = index
    }
  }
}
</script>
<style lang="less" scoped>
</style>
