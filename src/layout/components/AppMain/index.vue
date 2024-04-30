<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<style lang="scss" scoped>
.app-main {
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 105px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
