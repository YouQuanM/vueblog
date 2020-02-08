<template>
  <div class="user-signup-component">
    <div class="signup-pic">
      <span>注册</span>
    </div>
    <div class="signup-form">
      <el-form :model="signupForm" :rules="signupRules" ref="signupForm" label-position="left" label-width="100px">
        <el-form-item label="username" prop="name">
          <el-input v-model="signupForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="signupForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="signupForm.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as userApis from '@/apis/user'

export default {
  data () {
    return {
      // 注册data
      signupForm: {
        name: '',
        password: '',
        email: ''
      },
      signupRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '长度不小于8位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    signUp () {
      return new Promise((reslove, reject) => {
        this.$refs['signupForm'].validate((valid) => {
          if (valid) {
            // 注册
            userApis.signUp(this.signupForm).then(res => {
              if (res.success) {
                this.$message.success('注册成功')
                reslove({
                  name: this.signupForm.name
                })
              } else {
                reject(res.msg)
              }
            })
          } else {
            console.log('error submit!!');
            reject(Error('error submit'))
          }
        });
      })
    }
  }
}
</script>

<style lang="less">
.user-signup-component {
  display: flex;
  justify-content: space-around;
  height: 200px;
  .signup-pic {
    font-size: 50px;
  }
}
</style>