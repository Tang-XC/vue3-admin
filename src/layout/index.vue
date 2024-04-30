<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import TagsView from './components/TagsView'
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';
@import '~@/styles/mixins.scss';
@import './style.scss';
.app-wrapper {
  @include clearfix;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar {
  .sidebar-container {
    width: $hideSideBarWidth !important;
  }
  .fixed-header {
    width: calc(100% - #{$hideSideBarWidth});
  }
  .main-container {
    margin-left: $hideSideBarWidth !important;
  }
}
</style>
