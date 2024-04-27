<template>
  <div>
    <div class="logo-container">
      <el-image class="logo" src="/logo.svg" />
      <h2 class="logo-text" v-if="$store.getters.sidebarOpened">Admin</h2>
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
  .logo-text {
    margin-left: 12px;
    color: #fff;
  }
}
</style>
