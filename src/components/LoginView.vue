<template>
  <!-- 登录容器 -->
  <div class="login_container">
    <div class="title_box">
      <img src="../assets/芯赛云logo.png" />
    </div>
    <div class="logo_box">
      <img src="../assets/login-left.aa3b20f2.png"  width="800" height="700"/>
    </div>
    <!-- 登录盒子 -->
    <div class="login_box">
      <!-- 登录表单盒子 -->
      <div class="avatar_box">欢迎登录简单的运维平台</div>
      <div class="loginform_container">
        <div class="loginform_box">
          <el-form
            :model="loginForm"
            :rules="loginFormRules"
            ref="loginFormRef"
            v-on:keyup.enter="login"
          >
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                prefix-icon="el-icon-yonghu"
                v-model="loginForm.username"
                placeholder="请输入您的用户名"
              />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                prefix-icon="el-icon-password"
                placeholder="请输入您的密码"
              ></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-row class="login_btns">
              <!-- 登录按钮 -->
              <el-button type="primary" round @click="login">登录</el-button>
              <!-- 重置按钮 -->
              <el-button round @click="resetLoginForm">重置</el-button>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'Length should be 3 to 10',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'Length should be 3 to 10',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 重置按钮的重置函数
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录按钮的记录token登录跳转函数
    login () {
      // 通过 axios 发送 post 请求
      this.$refs.loginFormRef.validate(async (valid) => {
        // 登录按钮预验证
        if (valid) {
          const { data: res } = await require('axios').post(
            'login',
            this.loginForm
          )
          console.log(res)
          // 判断 post 请求返回值
          if (res.meta.status !== 200) {
            this.$message.error('登录失败')
          } else {
            window.sessionStorage.setItem('token', res.data.token)
            this.$message.success('登录成功')
            this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 登录容器区域
.login_container {
  background-color: #e8f5ff;
  height: 100%;
  width: 100%;
  .title_box {
    position: absolute;
    top: 2%;
    left: 2%;
  }
  .logo_box {
    width: 100%;
  }
  // 登录盒子区域
  .login_box {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(50%, -50%);
    width: 400px;
    height: 450px;
    border-radius: 1%;
    // 图片盒子区域
    .avatar_box {
      position: absolute;
      font-size: large;
      width: 100%;
      height: 20%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 50px 0 0 90px;
    }
    // 登录表单容器
    .loginform_container {
      position: absolute;
      width: 100%;
      height: 80%;
      top: 20%;
      background-color: #fff;
      // 登录表单盒子
      .loginform_box {
        position: absolute;
        top: 10%;
        width: 100%;
        height: 50%;
        background-color: #fff;
        padding: 0 50px;
        box-sizing: border-box;
        .login_btns {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
