<template>
  <div class="liangzhi-layout-header">
    <header-logo></header-logo>
    <header-search></header-search>
    <header-user></header-user>
  </div>
</template>

<script>
import HeaderLogo from './logo'
import HeaderSearch from './search'
import HeaderUser from './user'
export default {
  components: {
    HeaderLogo,
    HeaderSearch,
    HeaderUser
  }
}
</script>

<style lang="less" scoped>
.liangzhi-layout-header {
  display: flex;
  justify-content: space-between;
  height: 50px;
}
</style>