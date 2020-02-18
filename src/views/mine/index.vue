<template>
  <div class="main-page">
    <div class="user-info-area">
      <div class="user-name">
        <span>{{userInfo.name}}</span>
      </div>
      <div class="user-avatar">
        <el-avatar size="medium" :src="userInfo.avatar || circleUrl"></el-avatar>
      </div>
      <div class="user-introduction">
        <span>{{userInfo.introduction || '自我介绍'}}</span>
      </div>
    </div>
    <div class="user-logs-area">

    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/common/cookie'
import * as userApis from '@/apis/user'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        avatar: '',
        introduction: ''
      },
      userLogs: [],
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  },
  created() {
    this.userInfo = JSON.parse(getUserInfo())
    this.getUserLogs(this.userInfo.id)
  },
  methods: {
    async getUserLogs(id) {
      const userLogs = await userApis.getUserLogs({userId: id})
      this.userLogs = userLogs.data
    }
  }
}
</script>

<style>

</style>