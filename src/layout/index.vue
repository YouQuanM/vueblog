<template>
  <!-- 外层layout -->
  <div class="liangzhi-layout">
    <!-- header -->
    <section class="layout-header">
      <layout-header></layout-header>
    </section>
    <div class="layout-main">
      <!-- 内容 -->
      <section class="layout-content">
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
  components: {
    LayoutHeader,
    LayoutContent,
    LayoutSider
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
    height: 800px;
    .layout-content {
      width: 100%;
      border-right: 1px solid #dcdfe6;
    }
    .layout-sider {
      width: 300px;
    }
  }
}
</style>