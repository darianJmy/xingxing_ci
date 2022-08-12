<template>
  <div class="common-layout">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>服务治理</el-breadcrumb-item>
      <el-breadcrumb-item>服务管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#fff"
          text-color="#444e58"
          active-text-color="#0b5ca1"
        >
          <el-menu-item
            :index="item.projectId + ''"
            v-for="item in serviceManageList"
            :key="item.projectId"
            @click="getProjectServices(item.projectId)"
          >
            <template #title>
              <i class="el-icon-menu"></i>
              <span>{{ item.projectName }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            :row-key="getRowKeys"
            :expand-row-keys="expands"
            @expand-change="this.getPodList"
          >
            <el-table-column prop="projectName" label="所属项目" width="120"/>
            <el-table-column prop="fullServiceName" label="服务名称" />
            <el-table-column prop="serviceDescription" label="描述" />
            <el-table-column type="expand">
              <template #default>
                <el-table
                  :data="podList"
                  v-loading="loading"
                  border
                  style="width: 100%"
                >
                <el-table-column prop="podName" label="名称" />
                <el-table-column prop="podIp" label="pod地址" width="120" />
                <el-table-column prop="podRestartCount" label="pod重启次数" width="120" />
                <el-table-column prop="podStatus" label="状态" width="100"/>
                <el-table-column label="更多操作" width="200">
                  <template v-slot="scope">
                    <el-button size="small" disabled @click="getPodLogWebsocket()"
                      >查看日志</el-button
                    >
                    <el-button size="small" @click="getPodLogList(scope)"
                      >下载日志</el-button
                    >
                </template>
                </el-table-column>
              </el-table>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      serviceManageList: [],
      activePath: '',
      tableData: [],
      podList: [],
      url: '',
      loading: '',
      expands: [],
      socketServe: null
    }
  },
  created () {
    this.getServiceManageList()
  },
  methods: {
    async getServiceManageList () {
      const { data: res } = await require('axios').get('/getProjectDropVo/sbx')
      if (res.status !== 100) return this.$message.error('获取项目列表失败')
      this.serviceManageList = res.data
      this.$message.success('获取项目列表成功')
    },
    saveNavState (index) {
      this.activePath = index
    },
    async getProjectServices (projectId) {
      this.tableData = []
      const { data: res } = await require('axios').get(
        `/getProjectServices/sbx?projectId=${projectId}`
      )
      if (res.status !== 100) return this.$message.error('获取服务列表失败')
      this.tableData = res.data.records
    },
    getRowKeys (row) {
      return row.serviceId
    },
    async getPodList (row, expandedRows) {
      this.loading = true
      console.log(row, 'hello')
      if (expandedRows.length) {
        this.expands = []
        if (row) {
          this.expands.push(row.serviceId)
          const { data: res } = await require('axios').get(
            `/sbxPodList/sbx/${row.fullServiceName}`
          )
          if (res.meta.status !== 200) return console.log(res)
          this.podList = res.data
          this.loading = false
        }
      } else {
        this.expands = []
      }
    },
    getPodLogList (scope) {
      // window.location.href = `http://${scope.row.hostIp}:20080/${scope.row.namespaceName}/${scope.row.projectName}`
      this.url = `http://${scope.row.hostIp}:20080/${scope.row.namespaceName}/${scope.row.projectName}/${scope.row.ownerName}/${scope.row.podIp}/`
      console.log(this.url)
      window.open(this.url, '_blank')
    }
  }
}
</script>
<style lang="less" scoped>
.common-layout {
  height: 100%;
  .el-container {
    padding-top: 40px;
    height: 100%;
    .el-aside {
      height: 500px;
    }
    .el-main {
      height: 600px;
    }
  }
}
</style>
