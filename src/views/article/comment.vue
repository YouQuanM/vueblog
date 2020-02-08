<template>
  <div class="liangzhi-comment">
    <div class="comment-user">
      <el-avatar class="comment-user-avatar" size="medium" :src="item.user && item.user.avatar || circleUrl"></el-avatar>
      <span class="comment-user-name">{{item.user && item.user.name || '匿名'}}:</span>
    </div>
    <div class="comment-content">
      <div v-html="item.content"></div>
    </div>
    <div class="comment-footer">
      <div class="comment-time">{{disposeTime(item.createdAt)}}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  },
  methods: {
    disposeTime(time) {
      return moment(time).format('MMMM DD YYYY, hh:mm:ss')
    }
  }
}
</script>

<style lang="less">
.liangzhi-comment {
  margin: 10px;
  padding: 10px;
  box-shadow:0px 3px 3px #c8c8c8;
  .comment-user {
    display: flex;
    justify-items: center;
    .comment-user-avatar {
      width: 24px;
      height: 24px;
    }
    .comment-user-name {
      margin: 0 0 0 10px;
      font-size: 18px;
    }
  }
  .comment-content {
    color: #666666;
    margin: 0 0 0 36px;
  }
  .comment-footer {
    text-align: right;
    .comment-time {
      color: #666666;
    }
  }
}
</style>