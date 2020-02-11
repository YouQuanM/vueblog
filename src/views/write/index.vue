<template>
  <div class="liangzhi-write-page">
    <div class="write-title">
      <el-input placeholder="请输入内容" v-model="title" :disabled="modifyFlag">
        <template slot="prepend">标题: </template>
      </el-input>
    </div>
    <div class="write-content">
      <write-editor ref="editor"></write-editor>
    </div>
    <div class="write-operation">
      <div class="operation-choose-area">
        <!-- 类别选择 -->
        <el-select
          v-model="type"
          collapse-tags
          :disabled="modifyFlag"
          placeholder="请选择类别">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- 标签选择 -->
        <el-select
          v-model="labels"
          multiple
          collapse-tags
          placeholder="请选择标签">
          <el-option
            v-for="item in labelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- 匿名选择 -->
        <el-switch
          v-model="showAuthor"
          active-text="匿名">
        </el-switch>
      </div>
      <el-button type="success" round @click="modifyFlag ? modifyArticle() : submit()">{{submitText}}</el-button>
    </div>
  </div>
</template>

<script>
import WriteEditor from './editor'
import { getToken } from '@common/cookie'
import * as articleApis from '@/apis/article'
export default {
  components: {
    WriteEditor
  },
  data() {
    return {
      modifyFlag: false,
      title: '',
      labels: [],
      content: '',
      type: '',
      author: null,
      showAuthor: false,
      typeOptions: [],
      labelOptions: [],
      submitText: '发布'
    }
  },
  async created () {
    if (!getToken()) {
      // 请先登录
      this.$alert('请先登录', '未登录', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
          this.$store.dispatch('user/toLogin', true)
        }
      })
      return
    }
    const {data} = await articleApis.getArticleTypesLabels()
    this.typeOptions = data.types
    this.labelOptions = data.labels
    // 修改
    if (this.$route.params.id) {
      this.modifyFlag = true
      this.submitText = '修改'
      this.getModifyDetail(this.$route.params.id)
    }
  },
  methods: {
    // 提交发布
    submit() {
      if (this.title === '') {
        this.$message.error('标题不能为空！')
      }
      this.content = this.$refs.editor.content
      articleApis.addArticle({
        // 文章标题
        title: this.title,
        // 文章内容
        content: this.content,
        // 类型value
        typeValue: this.type,
        // 类型label
        typeLabel: this.typeOptions.find(v => v.value === this.type)?.label,
        // 标签value
        labelsValue: this.labels,
        // 标签label
        labelsLabel: this.getLabelsLabel(this.labels),
        // 匿名
        showAuthor: !this.showAuthor,
        // 删除默认为false
        delete: false,
        // 简洁化，首页用
        description: this.createDescription(this.content)
      }).then(res => {
        // 跳转详情
        if (res.success) {
          this.$router.push({
            path: '/article/' + res.data.articleId + '/detail'
          })
        }
      })
    },
    // 获取类别和标签
    getLabelsLabel(labels) {
      let labelsArr = []
      labels.forEach(v => {
        labelsArr.push(this.labelOptions.find(value => value.value === v).label)
      })
      return labelsArr
    },
    // 获取修改文章详情
    async getModifyDetail(id) {
      const { data } = await articleApis.articleDetail({id: id})
      this.title = data.article.title
      this.type = data.article.typeValue
      this.labels = data.article.labelsValue
      this.showAuthor = !data.article.showAuthor
      this.$refs.editor.content = data.article.content
      this.author = {
        id: data.article.userId,
        name: data.user.name
      }
    },
    // 提交修改
    modifyArticle() {
      this.content = this.$refs.editor.content
      articleApis.modifyArticle({
        articleId: this.$route.params.id,
        userId: this.author.id,
        content: this.content,
        labelsValue: this.labels,
        labelsLabel: this.getLabelsLabel(this.labels),
        showAuthor: !this.showAuthor,
        description: this.createDescription(this.content)
      }).then(res => {
        // 跳转详情
        if (res.success) {
          this.$router.replace({
            path: '/article/' + this.$route.params.id + '/detail'
          })
        }
      })
    },
    // 生成description
    createDescription(content) {
      if (content) {
        let reg=/<\/?.+?\/?>/g;
        let imgreg = /<img(.*?)>/g;
        return content.replace(imgreg,'[图片]').replace(reg, '').slice(0, 100)
      }
      return ''
    }
  }
}
</script>

<style lang="less" scoped>
.liangzhi-write-page {
  padding: 12px;
  .write-title {
    margin: 10px 0;
  }
  .write-content {
    margin: 10px 0;
  }
  .write-operation {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    * {
      margin: 0 5px 0 0;
    }
  }
}
</style>