<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) in $store.getters.tagsView"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      <span>
        {{ generateTitle(tag.meta.title) }}
      </span>
      <span
        v-show="!isActive(tag)"
        class="el-icon-close"
        @click.prevent.stop="onCloseClick(index)"
      >
        <el-icon><Close /></el-icon>
      </span>
    </router-link>
    <contextMenu
      v-show="menuVisible"
      :index="selectedIndex"
      :style="menuStyle"
    />
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { generateTitle } from '@/utils/i18n'
import store from '@/store'

import contextMenu from './contextMenu.vue'
const router = useRouter()
const menuVisible = ref(false)
const menuStyle = ref({
  left: 0,
  top: 0
})
const selectedIndex = ref(0)
const isActive = (tag) => {
  return tag.path === router.currentRoute.value.fullPath
}
const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index,
    currentRoute: router.currentRoute.value.fullPath,
    callback: (path) => {
      router.push(path)
    }
  })
}
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  menuVisible.value = true
  selectedIndex.value = index
}
const onClose = () => {
  menuVisible.value = false
}
watch(menuVisible, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
</script>
<style lang="scss">
.tags-view-container {
  width: 100%;
  height: 34px;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background-color: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    .el-icon-close {
      display: inline-block;
      width: 16px;
      height: 16px;
      line-height: 16px;
      vertical-align: middle;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      padding-top: 2px;
      box-sizing: border-box;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
