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
        <!-- Add subscript and superscript buttons -->
        <span class="ql-formats"><button class="ql-script" value="sub"></button></span>
        <span class="ql-formats"><button class="ql-script" value="super"></button></span>
        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
        <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
        <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
        <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
        <span class="ql-formats">
          <button type="button" @click="imgClick" style="outline:none">
          <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle
            class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
          </button>
        </span>
      </div>
  </quill-editor>
</template>
<script>
import { quillEditor } from "vue-quill-editor"
import { uploadImg } from '@/apis/article'
export default {
  data() {
    return {
      content: null,
      editorOption: {
        modules: {
           toolbar: '#toolbar'
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange(e) {
      //内容改变事件
    },
    onFileChange(e) {
      var fileInput = e.target;
      if (fileInput.files.length === 0) {
        return
      }
      this.editor.focus();
      if (fileInput.files[0].size > 2097152) {
        this.$alert('图片不能大于2M', '图片尺寸过大', {
          confirmButtonText: '确定',
          type: 'warning',
        })
        return
      }
      var data = new FormData;
      data.append(this.fileName, fileInput.files[0]);
      // 图片上传
      uploadImg(data).then(res => {
        if (res?.success) {
          // 把图片插入富文本中
          this.editor.insertEmbed(this.editor.getSelection().index, 'image', process.env.VUE_APP_ASSETS_URL + res.imgUrl)
        }
      })
    },
    /*点击上传图片按钮*/
    imgClick() {
      /*内存创建input file*/
      var input = document.createElement('input');
      input.type = 'file';
      input.name = this.fileName;
      input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
      input.onchange = this.onFileChange;
      input.click()
    }
  }
};
</script>
