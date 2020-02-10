<template>
  <!-- 外层layout -->
  <div class="liangzhi-layout" ref="layout">
    <!-- header -->
    <section class="layout-header">
      <layout-header></layout-header>
    </section>
    <div class="layout-main">
      <!-- 内容 -->
      <section class="layout-content" :style="styleObj">
        <layout-content></layout-content>
      </section>
      <!-- 侧边 -->
      <section class="layout-sider">
        <layout-sider></layout-sider>
      </section>
    </div>
  </div>
</template>

<script>
import LayoutHeader from './header/index'
import LayoutContent from './content/index'
import LayoutSider from './sider/index'
export default {
  data() {
    return {
      styleObj: {
        width: '0px'
      }
    }
  },
  components: {
    LayoutHeader,
    LayoutContent,
    LayoutSider
  },
  mounted() {
    console.log(this.$refs.layout.offsetWidth)
    this.styleObj = {
      width: (this.$refs.layout.offsetWidth - 300) + 'px'
    }
  }
}
</script>

<style lang="less">
.liangzhi-layout {
  margin: 0 100px;
  .layout-header {
    border-bottom: 1px solid #dcdfe6;
  }
  .layout-main {
    display: flex;
    .layout-content {
      width: 100%;
      border-right: 1px solid #dcdfe6;
      margin: 12px;
    }
    .layout-sider {
      width: 300px;
    }
  }
}
</style>