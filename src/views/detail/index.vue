<template>
  <div class="liangzhi-detail-page">
    <div class="liangzhi-detail">
      <section class="detail-header">
        <div class="detail-title">{{article.title}}</div>
        <div class="detail-author">
          <el-avatar size="medium" :src="author.avatar || circleUrl"></el-avatar>
          <span>{{author.name}}</span>
        </div>
      </section>
      <section class="detail-content">
        <p class="article-content">{{article.content}}</p>
      </section>
      <section class="detail-footer">
        <div class="detail-labels">
          <el-tag v-for="(item, index) in article.labels" :key="index">{{item}}</el-tag>
        </div>
        <span class="detail-time">{{article.time}}</span>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import * as detailApis from '@/apis/detail'
export default {
  data () {
    return {
      article: {
        title: '',
        content: '',
        labels: [],
        time: ''
      },
      author: {
        name: '',
        avatar: '',
        introduction: '',
        identity: ''
      },
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  },
  created() {
    this.getDetail(this.$route.params.id)
  },
  methods: {
    async getDetail(id) {
      const { data } = await detailApis.articleDetail({id: id})
      console.log(data)
      this.article = {
        title: data.article.title,
        content: data.article.content,
        labels: data.article.label,
        time: moment(data.article.createdAt).format('MMMM DD YYYY, hh:mm:ss')
      }
      this.author = data.user
    }
  }
}
</script>

<style>

</style>