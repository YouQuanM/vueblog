<template>
  <div class="userlogs-component">
    <div class="operator">
      <span>{{ isYou ? '你' : logItem.operator.name }}</span>
    </div>
    <div class="operation">
      <span>{{ logItem.operationLabel }}了</span>
    </div>
    <div class="user">
      <span>{{ isYou ? '你' : logItem.user.name }}的文章:</span>
    </div>
    <div class="article">
      <span>{{ logItem.article.title }}</span>
    </div>
    <div class="comment" v-if="logItem.comment.content">
      <span>:{{ logItem.comment.content }}</span>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/common/cookie'
export default {
  props: {
    logItem: {
      type: Object
    }
  },
  methods: {
    isYou(id) {
      return id === JSON.parse(getUserInfo()).id
    }
  }
}
</script>

<style lang="less">
.userlogs-component {
  display: flex;
  margin: 10px 0 0 0;
  padding: 5px;
  border: 1px solid #dcdfe6;
}
</style>