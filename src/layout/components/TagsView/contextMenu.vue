<template>
  <div class="context-menu">
    <el-menu>
      <el-menu-item
        style="height: 40px"
        v-for="item in menu"
        @click="onSelect(item.name)"
        :key="item.label"
      >
        <component class="menu-item-icon" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
import i18n from '@/local'
import { useRouter } from 'vue-router'
import store from '@/store'
const router = useRouter()
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  currentActive: {
    type: Boolean,
    default: false
  }
})
const menu = ref([
  {
    name: 'refresh',
    label: i18n.global.t('contextMenu.refresh'),
    icon: 'RefreshRight'
  },
  {
    name: 'closeCurrent',
    label: i18n.global.t('contextMenu.closeCurrent'),
    icon: 'Close'
  },
  {
    name: 'closeLeft',
    label: i18n.global.t('contextMenu.closeLeft'),
    icon: 'Arrow-left'
  },
  {
    name: 'closeRight',
    label: i18n.global.t('contextMenu.closeRight'),
    icon: 'Arrow-right'
  },
  {
    name: 'closeOther',
    label: i18n.global.t('contextMenu.closeOther'),
    icon: 'More'
  }
])
const onSelect = (val) => {
  const params = {
    index: props.index,
    currentRoute: router.currentRoute.value.fullPath,
    callback: (path) => {
      router.push(path)
    }
  }
  switch (val) {
    case 'refresh':
      router.go(0)
      break
    case 'closeCurrent':
      store.commit('app/removeTagsView', {
        type: 'index',
        ...params
      })
      break
    case 'closeLeft':
      store.commit('app/removeTagsView', {
        type: 'left',
        ...params
      })
      break

    case 'closeRight':
      store.commit('app/removeTagsView', {
        type: 'right',
        ...params
      })
      break
    case 'closeOther':
      store.commit('app/removeTagsView', {
        type: 'other',
        ...params
      })
      break
  }
}
</script>
<style lang="scss" scoped>
.context-menu {
  width: 150px;
  position: fixed;
  .menu-item-icon {
    width: 14px;
    height: 14px;
    margin-right: 8px;
  }
}
</style>
