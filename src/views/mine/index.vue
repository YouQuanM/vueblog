<template>
  <div class="main-page">
    <div class="user-info-area">
      <div class="user-info-left">
        <div class="user-name">
          <span>{{userInfo.name}}</span>
        </div>
        <div class="user-introduction">
          <span>{{userInfo.introduction || '自我介绍'}}</span>
        </div>
      </div>
      <div class="user-avatar">
        <el-avatar :src="userInfo.avatar || circleUrl"></el-avatar>
      </div>
    </div>
    <div class="user-logs-area">
      <template v-for="(item, index) in userLogs">
        <user-log :key="index" :logItem="item"></user-log>
      </template>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/common/cookie'
import * as userApis from '@/apis/user'
import UserLog from './logs'
export default {
  components: {UserLog},
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

<style lang="less" scoped>
.main-page {
  padding: 12px;
  .user-info-area {
    display: flex;
    justify-content: space-between;
    .user-name {
      span {
        font-size: 30px;
      }
    }
    .user-introduction {
      margin: 10px 0 0 0;
    }
    .user-avatar {
      .el-avatar {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>