<template>
  <div>
    <div class="logo-container">
      <el-image class="logo" src="/logo.svg" />
      <h1 style="margin-left: 12px" v-if="$store.getters.sidebarOpened">
        Admin
      </h1>
    </div>
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>
<script setup>
import SidebarMenu from './components/SidebarMenu'
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';
.logo-container {
  .logo {
    width: 30px;
    height: 30px;
  }
  height: $headerHeight;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
