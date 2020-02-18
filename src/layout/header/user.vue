<template>
  <div class="layout-header-user">
    <!-- 未登录情况 -->
    <div class="login-button" v-if="user === null">
      <el-button type="text" @click="loginDialogFlag = true">登录</el-button>
    </div>
    <!-- 登录情况 -->
    <div class="user-operation" v-else>
      <el-dropdown @command="handleDropdown">
        <span class="el-dropdown-link">
          <el-avatar size="medium" :src="user.avatar || circleUrl"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="main">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 登录弹窗 -->
    <el-dialog :visible.sync="loginDialogFlag">
      <login-component ref="loginComponent" v-if="signLoginFlag"></login-component>
      <signup-component ref="signupComponent" v-else></signup-component>
      <div slot="footer" class="dialog-footer user-login-dialog-footer">
        <div class="user-signup-btn">
          <el-button type="text" @click="switchLoginSignup">{{loginSignupTitle}}</el-button>
        </div>
        <div class="user-login-btn">
          <el-button @click="closeLoginDialog">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as userApis from '@/apis/user'
import { getToken, setToken, removeToken, setUserInfo, removeUserInfo } from '@/common/cookie'
import LoginComponent from './components/login'
import SignupComponent from './components/signup'
export default {
  components: { LoginComponent, SignupComponent },
  data() {
    return {
      // 登录data
      loginDialogFlag: false,
      signLoginFlag: 'login',
      loginSignupTitle: '未注册?',
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
          this.user = res.userInfo
          setUserInfo(res.userInfo)
        } else {
          removeToken()
          removeUserInfo()
        }
      })
    }
  },
  methods: {
    submit() {
      if (this.signLoginFlag) {
        this.$refs.loginComponent.login().then(res => {
          this.user = res.userInfo
          setToken(res.token)
          setUserInfo(res.userInfo)
          this.closeLoginDialog()
        })
      } else {
        this.$refs.signupComponent.signUp().then(res => {
          this.switchLoginSignup()
          this.$nextTick(() => {
            this.$refs.loginComponent.loginForm.username = res.name
          })
        })
      }
    },
    switchLoginSignup() {
      this.signLoginFlag = !this.signLoginFlag
      this.loginSignupTitle = this.signLoginFlag ? '未注册?' : '去登陆'
    },
    closeLoginDialog() {
      this.loginDialogFlag = false
      this.loginForm = {
        username: '',
        password: ''
      }
    },
    handleDropdown(command) {
      if (command === 'logout') {
        this.logout()
      } else {
        this.$router.push({
          path: 'mine'
        })
      }
    },
    logout() {
      this.user = null
      removeToken()
      removeUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.user-login-dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>