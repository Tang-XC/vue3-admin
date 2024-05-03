<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from '@toast-ui/editor'
import { onMounted, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { createArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'

// Editor实例
let mkEditor
// 处理离开页面切换语言导致 dom 无法被获取
let el
const props = defineProps({
  title: {
    required: true,
    type: String
  }
})
const emits = defineEmits(['onSuccess'])

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })

  mkEditor.getMarkdown()
}
const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success('成功')
  return res
}
const onSubmitClick = async () => {
  // 创建文章
  await commitArticle({
    title: props.title,
    content: mkEditor.getHTML()
  })

  mkEditor.reset()
  emits('onSuccess')
}
watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHtml()
  mkEditor.destroy()
  initEditor()
  el.innerHTML = htmlStr
})
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
