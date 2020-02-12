<template>
  <div class="layout-header-logo texiao rectangle">
    <img class="liangzhi-logo" src="@/assets/lzlogo.png" alt="logo" @click="toIndex" />
  </div>
</template>

<script>
export default {
  methods: {
    toIndex() {
      if (this.$route.path !== "/") {
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>

<style lang="less">
.layout-header-logo {
  .liangzhi-logo {
    width: 120px;
    height: 40px;
  }
  img:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    cursor:pointer
  }
}
</style>