<template>
  <div class="layout-header-search">
    <div class="search-type">
      <el-select
        v-model="type"
        multiple
        collapse-tags
        clearable
        placeholder="类别">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="search-input">
      <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
    </div>
    <div class="search-button">
      <el-button type="primary">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      type: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
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