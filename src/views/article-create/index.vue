<template>
  <div class="article-create">
    <el-input v-model="title"> </el-input>
    <el-tabs v-model="activeName">
      <el-tab-pane label="写作" name="markdown">
        <MarkDown />
      </el-tab-pane>

      <el-tab-pane label="预览" name="editor">
        <div class="preview">
          <Editor />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Editor from './components/Editor'
import MarkDown from './components/MarkDown'

const title = ref('')
const activeName = ref('markdown')
</script>

<style lang="scss" scoped></style>
