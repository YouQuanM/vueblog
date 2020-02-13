<template>
  <div class="liangzhi-index-page">
    首页 敬请期待
    <div class="index-article-list">
      <template v-for="(item, index) in articleList">
        <index-article :item="item" class="list-item" :key="index"></index-article>
      </template>
    </div>
    <div class="index-page-footer">
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters([
      'searchFlag',
      'searchParams'
    ]),
    disabled () {
      return this.loading || this.noMore
    }
  },
  watch: {
    searchFlag(val) {
      if (val === true) {
        this.articleList = []
        this.getArticleList()
        this.$store.dispatch('search/searchDone')
      }
    }
  },
  created() {
    this.getArticleList()
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollList)
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollList)
  },
  methods: {
    getArticleList() {
      let query = {}
      Object.assign(query, this.searchParams, {pageNum: this.pageNum})
      articleApis.articleList(query).then(res => {
        if (res.success) {
          this.articleList = [...this.articleList, ...res.data.list]
          this.loadFlag = false
          if (res.data.pagination.pageTotal === this.pageNum || res.data.pagination.pageTotal === 0) {
            this.loading = false
            this.noMore = true
          }
        }
      })
    },
    loadMore() {
      if (!this.loadFlag) {
        this.loadFlag = true
        this.pageNum = this.pageNum + 1
        setTimeout(() => {
          this.getArticleList()
        }, 1000);
      }
    },
    scrollList() {
      const scroll = document.documentElement.scrollTop + document.documentElement.clientHeight
      const height = document.documentElement.offsetHeight
      if (scroll === height && !this.noMore) {
        this.loadMore()
      }
    }
  }
}
</script>

<style lang="less">
.liangzhi-index-page {
  padding: 12px;
  .list-item {
    margin: 5px 0;
  }
  .index-page-footer {
    text-align: center;
  }
}
</style>