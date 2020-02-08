<template>
  <div class="home">
    <el-button type="success" icon="el-icon-edit" circle @click="toWrite"></el-button>
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
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            this.$store.dispatch('user/toLogin', true)
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
