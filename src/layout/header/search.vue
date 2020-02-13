<template>
  <div class="layout-header-search">
    <div class="search-type">
      <el-select
        v-model="type"
        collapse-tags
        clearable
        placeholder="类别">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="search-input">
      <el-input v-model="keyWord" placeholder="请输入搜索内容"></el-input>
    </div>
    <div class="search-button">
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
  </div>
</template>

<script>
import * as articleApis from '@/apis/article'

export default {
  data() {
    return {
      keyWord: null,
      type: null,
      typeOptions: []
    }
  },
  async created() {
    const {data} = await articleApis.getArticleTypesLabels()
    this.typeOptions = data.types
  },
  methods: {
    search() {
      let query = {}
      this.keyWord && (query.keyWord = this.keyWord)
      this.type && (query.type = this.type)
      this.$store.dispatch('search/changeSearchParams', query)
      if (this.$route.path !== '/') {
        this.$router.push({
          path: '/'
        })
      } else {
        this.$store.dispatch('search/searchStart')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header-search {
  display: flex;
  .search-type, .search-input, .search-button {
    margin-left: 10px;
  }
}
</style>