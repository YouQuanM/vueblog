<template>
  <div class="layout-header-user">
    <!-- 未登录情况 -->
    <div class="login-button" v-if="user === null">
      <el-button type="text" @click="loginDialogFlag = true">登录</el-button>
    </div>
    <!-- 登录情况 -->
    <div class="user-operation" v-else>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar size="medium" :src="circleUrl"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 登录弹窗 -->
    <el-dialog title="登录" :visible.sync="loginDialogFlag">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="100px">
        <el-form-item label="username" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="loginForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeLoginDialog">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as userApis from '@/apis/user'
import { getToken, setToken, removeToken } from '@/common/cookie'
export default {
  data() {
    return {
      // 登录data
      loginDialogFlag: false,
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
      },
      // 用户data
      user: null,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  },
  computed: {
    ...mapGetters([
      'loginFlag'
    ]),
  },
  watch: {
    loginFlag(val) {
      if (val) {
        this.loginDialogFlag = val
      }
    }
  },
  created() {
    if(getToken()){
      // 通过token获取用户信息接口
      userApis.getUserInfo().then(res => {
        if (res?.success) {
          this.user = res
        } else {
          removeToken()
        }
      })
    }
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          userApis.login({
            name: this.loginForm.username,
            password: this.loginForm.password
          }).then(res => {
            this.user = res.userInfo
            setToken(res.token)
            this.closeLoginDialog()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    closeLoginDialog() {
      this.loginDialogFlag = false
      this.loginForm = {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>