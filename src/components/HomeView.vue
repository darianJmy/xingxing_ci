<template>
  <!-- 整体页面容器 -->
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.d1460f28.png" str />
        <span>星星自动化运维</span>
      </div>
      <el-button @click="loginout" type="info" size="small">退出</el-button>
    </el-header>
    <!-- 头部一下页面容器 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 左侧菜单栏 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          unique-opened
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <template #title>
              <span>文件管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/upload">
              <i class="el-icon-menu"></i>
              <span>上传文件</span>
            </el-menu-item>
          </el-submenu>
          <!-- 服务治理 -->
          <el-submenu index="2">
            <template #title>
              <span>服务治理</span>
            </template>
            <el-menu-item index="/projectManage">项目管理</el-menu-item>
            <el-submenu index="/serviceManage">
              <template #title>服务管理</template>
                <el-menu-item index="/sbxSetting">sbx环境</el-menu-item>
                <el-menu-item index="/sitSetting">sit环境</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      iconsList: {
        125: 'el-icon-user',
        103: 'el-icon-conditions',
        101: 'el-icon-cart-Empty',
        102: 'el-icon-manage-order',
        145: 'el-icon-tradingdata'
      },
      // 是否折叠
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 重置按钮的重置函数
    loginout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单
    async getMenuList () {
      const { data: res } = await require('axios').get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    // 点击按钮切换菜单折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  top: 100%;
  height: 100%;
}
.el-header {
  background-color: #373d41;
  img {
    height: 60px;
    padding: 20px;
  }
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #333744;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
