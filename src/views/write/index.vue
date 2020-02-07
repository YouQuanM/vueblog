<template>
  <div class="liangzhi-write-page">
    <div class="write-title">
      <el-input placeholder="请输入内容" v-model="title">
        <template slot="prepend">标题: </template>
      </el-input>
    </div>
    <div class="write-content">
      <write-editor ref="editor"></write-editor>
    </div>
    <div class="write-operation">
      <el-select
        v-model="type"
        collapse-tags
        placeholder="请选择类别">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
      <el-button type="success" round @click="submit">发布</el-button>
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
      title: '',
      labels: [],
      content: '',
      type: '',
      typeOptions: [],
      labelOptions: []
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
    }
    const {data} = await articleApis.getArticleTypesLabels()
    this.typeOptions = data.types
    this.labelOptions = data.labels
  },
  methods: {
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
        typeLabel: this.typeOptions.find(v => v.value === this.type).label,
        // 标签value
        labelsValue: this.labels,
        // 标签label
        labelsLabel: this.getLabelsLabel(this.labels)
      }).then(res => {
        // 跳转详情
        if (res.success) {
          this.$router.push({
            path: '/article/' + res.data.articleId + '/detail'
          })
        }
      })
    },
    getLabelsLabel(labels) {
      let labelsArr = []
      labels.forEach(v => {
        labelsArr.push(this.labelOptions.find(value => value.value === v).label)
      })
      return labelsArr
    }
  }
}
</script>

<style lang="less" scoped>
.write-title {
  margin: 10px 0;
}
.write-content {
  margin: 10px 0;
}
.write-operation {
  margin: 10px 0;
  * {
    margin: 0 5px 0 0;
  }
}
</style>