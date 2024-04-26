<template>
  <el-icon><svg-icon :icon="icon"></svg-icon></el-icon>
  <span class="menuItem-title">{{ title }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.menuItem-title {
  // padding: 0 12px;
}
</style>
