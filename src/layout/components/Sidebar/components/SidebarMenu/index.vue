<template>
  <el-menu
    router
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    style="border-right: none"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
  >
    <SidebarMenuItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup>
import SidebarMenuItem from '../SidebarMenuItem'
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import { computed } from 'vue'
const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})
const activeMenu = computed(() => {
  const { path } = router
  return path
})
</script>
<style lang="scss" scoped></style>
