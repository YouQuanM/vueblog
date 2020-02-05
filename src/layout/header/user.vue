<template>
  <div class="layout-header-user">

    <!-- 未登录情况 -->
    <div class="login-button" v-if="user === null">
      <el-button type="text">登录</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      // user: {
      //   name: 'yinhang',
      //   avatar: ''
      // },
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>

</style>