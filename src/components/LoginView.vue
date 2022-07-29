<template>
  <!-- 登录容器 -->
  <div class="login_container">
    <!-- 登录盒子 -->
    <div class="login_box">
      <!-- 左侧图片盒子-->
      <div class="avatar_box">
        <img src="../assets/login-bg.3f7262b6.jpeg" alt />
      </div>
      <!-- 登录表单盒子 -->
      <div class="loginform_container">
        <div class="loginform_box">
          <el-form class="login_form"
        label-width="90px"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        v-on:keyup.enter="login">
            <!-- 用户名 -->
            <el-form-item label="用户名:" prop="mg_name">
              <el-input
              v-model="loginForm.mg_name"
                placeholder="请输入您的用户名"/>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码:" prop="mg_pwd">
              <el-input
                v-model="loginForm.mg_pwd"
                type="password"
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
        mg_name: 'admin',
        mg_pwd: '123456'
      },
      loginFormRules: {
        mg_name: [
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
        mg_pwd: [
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
          if (res.status !== 200) {
            this.$message.error('登录失败')
          } else {
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
  background-color: #fff;
  height: 100%;
  // 登录盒子区域
  .login_box {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    height: 550px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    border-radius: 1%;
    // 图片盒子区域
    .avatar_box {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-70%, -50%);
      display: flex;
      img {
        width: 100%;
        height: 100%;
      }
    }
    // 登录表单容器
    .loginform_container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(25%, -50%);
      background-color: #fff;
      width: 40%;
      height: 100%;
      // 登录表单盒子
      .loginform_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 50%;
        background-color: #fff;
        .login_form {
          width: 100%;
          height: 30%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 0 30px;
          box-sizing: border-box;
          .login_btns {
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>
