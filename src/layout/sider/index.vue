<template>
  <div class="liangzhi-layout-sider">
    <el-button type="success" icon="el-icon-edit" @click="toWrite">写文章</el-button>
    <div class="layout-sider-ad">
      <img src="@/assets/ad.jpeg" alt="广告位招租">
    </div>
  </div>
</template>

<script>
import { getToken } from '@/common/cookie'
export default {
  methods: {
    toWrite() {
      if (!getToken()) {
        // 请先登录
        this.$alert('请先登录', '未登录', {
          confirmButtonText: '好的',
          type: 'warning',
          callback: action => {
            if (action === 'confirm') {
              this.$store.dispatch('user/toLogin', true)
            }
          }
        })
        return
      }
      this.$router.push({
        path: 'write'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.liangzhi-layout-sider {
  padding: 12px;
  .layout-sider-ad {
    margin: 20px 0 0 0;
    img {
      width: 240px;
      height: 300px;
    }
  }
}
</style>