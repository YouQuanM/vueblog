<template>
  <div class="liangzhi-index-article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{item.title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toDetailPage(item.id)">查看详情</el-button>
      </div>
      <div class="index-article-content">
        <div class="article-description" v-if="item.description">
          <span>{{item.user.name}}: {{item.description}}...</span>
        </div>
        <div v-else class="article-content-default">
          <span>啥也没写</span>
        </div>
      </div>
      <div class="index-article-footer">
        <div class="article-likes-number">
          <span>likes: {{item.likes || 0}}</span>
        </div>
        <div class="article-time">
          <span>{{item.createdAt === item.updatedAt ? '创建于' + disposeTime(item.createdAt) : '更新于' + disposeTime(item.updatedAt)}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    item: Object
  },
  methods: {
    toDetailPage(id) {
      this.$router.push({
        path: 'article',
        query: {
          id: id
        }
      })
    },
    disposeTime (time) {
      return moment(time).format('MMMM DD YYYY, HH:mm:ss')
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
.index-article-footer {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 0;
  padding: 5px 0 0 0;
  border-top: 1px solid #EBEEF5;
}
</style>