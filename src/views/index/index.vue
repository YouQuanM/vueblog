<template>
  <div class="liangzhi-index-page">
    首页 敬请期待
    <ul
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="disabled">
      <template v-for="(item, index) in articleList">
        <li class="list-item" :key="index">
          <index-article :item="item" ></index-article>
        </li>
      </template>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import IndexArticle from './components/article'
import * as articleApis from '@/apis/article'
export default {
  components: {IndexArticle},
  data () {
    return {
      loading: true,
      noMore: false,
      pageNum: 1,
      articleList: []
    }
  },
  computed: {
    disabled () {
      return this.loading || this.noMore
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    getArticleList() {
      articleApis.articleList({pageNum: this.pageNum}).then(res => {
        if (res.success) {
          this.articleList = res.data.list
          if (res.data.pagination.pageTotal === this.pageNum) {
            this.loading = false
            this.noMore = true
          }
        }
      })
    },
    loadMore() {
      this.pageNum++
      this.getArticleList()
    }
  }
}
</script>

<style lang="less">
.liangzhi-index-page {
  padding: 12px;
  ul, li {
    list-style: none;
    .list-item {
      margin: 5px 0;
    }
  }
}
</style>