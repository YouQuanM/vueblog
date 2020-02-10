<template>
  <div class="liangzhi-index-article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{item.title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toDetailPage(item.id)">查看详情</el-button>
      </div>
      <div class="index-article-content">
        <div class="ql-editor">
          <div v-if="item.content" v-html="item.content"></div>
          <div v-else class="article-content-default">
            <span>啥也没写</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    toDetailPage(id) {
      this.$router.push({
        path: 'article/' + id + '/detail'
      })
    }
  }
}
</script>

<style lang="less">
.index-article-content {
  max-height: 80px;
  overflow: hidden;
  img {
    width: 100% !important;
  }
}
</style>