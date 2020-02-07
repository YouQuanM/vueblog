<template>
  <div class="liangzhi-detail-page">
    <div class="liangzhi-detail">
      <section class="detail-header">
        <div class="detail-title">
          <span>{{article.title}}</span>
        </div>
        <div class="detail-author-type">
          <div class="detail-author">
            <div class="author-avatar">
              <el-avatar size="medium" :src="author.avatar || circleUrl"></el-avatar>
            </div>
            <div class="author-name">
              <span>{{author.name}}</span>
            </div>
          </div>
          <div class="detail-type">
            <span>{{article.type}}</span>
          </div>
        </div>
      </section>
      <section class="detail-content">
        <!-- <p class="article-content">{{article.content}}</p> -->
        <div v-html="article.content"></div>
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
import * as detailApis from '@/apis/article'
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
      this.article = {
        title: data.article.title,
        content: data.article.content,
        labels: data.article.labelsLabel,
        type: data.article.typeLabel,
        time: moment(data.article.createdAt).format('MMMM DD YYYY, hh:mm:ss')
      }
      this.author = data.user
    }
  }
}
</script>

<style lang="less">
.liangzhi-detail-page {
  margin: 12px;
  .liangzhi-detail {
    .detail-header {
      padding: 0 0 20px 0;
      border-bottom: 1px dashed #ccc;
      .detail-title {
        font-size: 40px;
        font-weight: 600;
      }
      .detail-author-type {
        display: flex;
        justify-content: space-between;
        .detail-author {
          display: flex;
          .author-avatar {
            width: 36px;
            height: 36px;
          }
          .author-name {
            margin: 0 0 0 10px;
            font-size: 24px;
            color: #666666;
          }
        }
        .detail-type {
          font-size: 24px;
          font-weight: 600;
        }
      }
    }
    .detail-content {
      padding: 20px;
      border-bottom: 1px dashed #ccc;
      font-size: 22px;
      img {
        width: 100% !important;
      }
    }
    .detail-footer {
      display: flex;
      justify-content: space-between;
      margin: 10px 0 0 0;
      .detail-labels {
        span {
          margin: 0 3px;
        }
      }
    }
  }
}
</style>