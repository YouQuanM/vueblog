<template>
  <quill-editor
    class="editor"
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)"
  >
    <div id="toolbar" slot="toolbar">
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
      </div>
  </quill-editor>
</template>
<script>
import { quillEditor } from "vue-quill-editor"
export default {
  data() {
    return {
      content: null,
      editorOption: {
        placeholder: '请输入评论...',
        modules: {
           toolbar: '#toolbar'
        }
      }
    };
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange(e) {
      //内容改变事件
    }
  }
}
</script>
