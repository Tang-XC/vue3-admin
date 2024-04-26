<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbData"
        :key="item.path"
      >
        <span class="no-redirect" v-if="index === breadCrumbData.length - 1">
          {{ item.meta.title }}
        </span>
        <span class="redirect" v-else @click="$router.push(item.path)">
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const store = useStore()
const breadCrumbData = ref([])
const primaryColor = store.getters.cssVar.primaryColor
console.log(primaryColor)
const getBreadCrumbData = () => {
  breadCrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}
watch(route, () => {
  getBreadCrumbData()
})
</script>
<style lang="scss" scoped>
.redirect {
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: v-bind(primaryColor);
  }
}
.no-redirect {
  font-size: 16px;
  font-weight: bold;
}
</style>
