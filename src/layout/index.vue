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
      <div class="layout-footer" :style="footerWidth">
        <layout-footer></layout-footer>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from './header/index'
import LayoutContent from './content/index'
import LayoutSider from './sider/index'
import LayoutFooter from './footer/index'
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
    LayoutSider,
    LayoutFooter
  },
  mounted() {
    this.styleObj = {
      width: (this.$refs.layout.offsetWidth - 300) + 'px'
    }
    this.footerWidth = {
      width: (this.$refs.layout.offsetWidth) + 'px'
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
    .layout-footer {
      width: 100%;
      padding: 10px 0;
      position: fixed;
      bottom: 0;
      border-top: 1px solid #dcdfe6;
    }
  }
  
}
</style>