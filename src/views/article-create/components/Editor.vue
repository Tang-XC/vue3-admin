<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { createArticle } from '@/api/article'
const props = defineProps({
  title: {
    required: true,
    type: String
  }
})
const emits = defineEmits(['onSuccess'])

// Editor实例
let editor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  editor.create()
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
    content: editor.txt.html()
  })

  editor.txt.html('')
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
