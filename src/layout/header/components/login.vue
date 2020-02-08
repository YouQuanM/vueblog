<template>
  <div class="user-login-component">
    <div class="login-pic">
      <span>登录</span>
    </div>
    <div class="login-form">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="100px">
        <el-form-item label="username" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="loginForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as userApis from '@/apis/user'
import { getToken, setToken, removeToken } from '@/common/cookie'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '长度不小于8位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      return new Promise((reslove, reject) => {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            userApis.login({
              name: this.loginForm.username,
              password: this.loginForm.password
            }).then(res => {
              this.$message.success('登录成功')
              reslove(res)
            })
          } else {
            console.log('error submit!!');
            reject(Error('error submit!!'))
          }
        });
      })
    }
  }
}
</script>

<style lang="less">
.user-login-component {
  display: flex;
  height: 200px;
  justify-content: space-around;
  .login-pic {
    font-size: 50px;
  }
}
</style>