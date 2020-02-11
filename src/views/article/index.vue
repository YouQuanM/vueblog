<template>
  <div class="liangzhi-detail-page">
    <div class="liangzhi-detail">
      <!-- loader header -->
      <content-loader :height="50" v-if="loaderDetail">
        <rect x="0" y="0" rx="3" ry="3" width="250" height="20" />
        <circle cx="10" cy="36" r="10" />
        <rect x="25" y="30" rx="3" ry="3" width="30" height="15" />
      </content-loader>
      <!-- header -->
      <section class="detail-header" v-else>
        <div class="detail-title">
          <span>{{article.title}}</span>
          <el-button @click="toModifyPage" v-if="canModify">修改文章</el-button>
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
      <!-- loader content -->
      <content-loader :height="50" v-if="loaderDetail">
        <rect x="0" y="0" rx="3" ry="3" width="380" height="6" /> 
        <rect x="0" y="10" rx="3" ry="3" width="380" height="6" /> 
        <rect x="0" y="20" rx="3" ry="3" width="178" height="6" /> 
      </content-loader>
      <!-- content -->
      <section class="detail-content ql-snow" v-else>
        <div class="ql-editor">
          <div v-html="article.content"></div>
        </div>
      </section>
      <!-- loader footer -->
      <content-loader :height="50" v-if="loaderDetail">
        <rect x="0" y="0" rx="3" ry="3" width="20" height="10" />
        <rect x="30" y="0" rx="3" ry="3" width="20" height="10" />
      </content-loader>
      <!-- footer -->
      <section class="detail-footer" v-else>
        <div class="detail-labels">
          <el-tag v-for="(item, index) in article.labels" :key="index">{{item}}</el-tag>
        </div>
        <span class="detail-time">{{article.time}}</span>
      </section>
    </div>
    <div class="liangzhi-comment-area">
      <div class="comment-header">
        <div class="add-comment-btn">
          <el-button type="success" plain icon="el-icon-edit" @click="addComment">添加评论</el-button>
        </div>
        <add-comment ref="addComment"></add-comment>
      </div>
      <div class="comment-list">
        <p v-if="commentList.length === 0">暂无评论，快来抢沙发</p>
        <template v-for="(item, index) in commentList">
          <comment-item :item="item" :key="index"></comment-item>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import * as detailApis from '@/apis/article'
import * as commentApis from '@/apis/comment'
import AddComment from './addcomment'
import CommentItem from './comment'
import { getUserInfo } from '@/common/cookie'
import { ContentLoader } from 'vue-content-loader'

export default {
  components: { AddComment, CommentItem, ContentLoader },
  data () {
    return {
      // 文章
      article: {
        title: '',
        content: '',
        labels: [],
        time: ''
      },
      // 作者
      author: {
        name: '',
        avatar: '',
        introduction: '',
        identity: ''
      },
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      // 评论
      addCommentFlag: false,
      commentList: [],
      canModify: false,
      // loader
      loaderDetail: true
    }
  },
  created() {
    this.getDetail(this.$route.params.id)
    this.getComment(this.$route.params.id)
  },
  methods: {
    // 获取文章详情
    async getDetail(id) {
      const { data } = await detailApis.articleDetail({id: id})
      this.article = {
        title: data.article.title,
        content: data.article.content,
        labels: data.article.labelsLabel,
        type: data.article.typeLabel,
        time: moment(data.article.createdAt).format('MMMM DD YYYY, HH:mm:ss')
      }
      this.author = data.user
      if (getUserInfo()) {
        this.canModify = JSON.parse(getUserInfo()).id === data.article.userId
      }
      this.loaderDetail = false
    },
    // 获取评论列表
    async getComment(id) {
      const { data } = await commentApis.commentList({id: id})
      this.commentList= data
    },
    // 添加评论
    addComment() {
      if (this.$refs.addComment.content === '' || this.$refs.addComment.content === null) {
        this.$message.error('评论不能为空')
        return
      }
      commentApis.addComment({
        articleId: this.$route.params.id,
        content: this.$refs.addComment.content,
        show: true
      }).then(res => {
        if (res.success) {
          this.$message.success('评论成功')
          setTimeout(() => {
            this.getComment(this.$route.params.id)
          }, 500);
        }
      })
    },
    toModifyPage() {
      this.$router.push({
        path: '/write/' + this.$route.params.id
      })
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
        display: flex;
        justify-content: space-between;
        > span {
          font-size: 40px;
          font-weight: 600;
        }
        
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
  .liangzhi-comment-area {
    margin: 20px 0 0 0;
    .comment-header {
      .add-comment-btn {
        margin: 10px 0;
      }
    }
  }
}
</style>