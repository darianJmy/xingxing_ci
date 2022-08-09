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
          text-color="#hhh"
          unique-opened
          active-text-color="#409EFF"
        >
          <el-menu-item
            :index="item.projectId"
            v-for="item in serviceManageList"
            :key="item.projectId"
            @click="saveNavState(index)"
          >
            <template #title>
              <span>{{ item.projectName }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card>
          <!-- 搜索和添加用户区域 -->
          <el-row :gutter="20">
            <!-- 搜索区域 -->
            <el-col :span="6">
              <el-input
              >
                <template #append>
                  <el-button />
                </template>
              </el-input>
            </el-col>
          </el-row>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" width="180" />
            <el-table-column prop="serviceId" label="编码" width="180" />
            <el-table-column prop="serviceName" label="服务名称" width="180" />
            <el-table-column prop="projectName" label="所属项目" width="180" />
            <el-table-column
              prop="serviceDescription"
              label="描述"
              width="180"
            />
            <el-table-column label="操作">
              <el-row>
                <el-button>查看日志</el-button>
                <el-button>下载日志</el-button>
              </el-row>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-sizes="[100, 200, 300, 400]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
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
      tableData: [
        {
          id: 215,
          serviceId: '137',
          serviceName: 'model',
          serviceDescription: '数据字典服务',
          projectName: 'newnoa',
          namespaceName: 'sbx',
          createTime: '2022-05-26 09:58:34',
          lastUpdateTime: '2022-06-06 14:05:48'
        },
        {
          id: 203,
          serviceId: '128',
          serviceName: 'operation',
          serviceDescription: '操作日志服务',
          projectName: 'newnoa',
          namespaceName: 'sbx',
          createTime: '2022-05-10 13:07:12',
          lastUpdateTime: '2022-05-10 13:07:12'
        }
      ]
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
.common-layout {
  height: 100%;
  .el-container {
    padding-top: 40px;
    height: 100%;
  }
}
</style>
