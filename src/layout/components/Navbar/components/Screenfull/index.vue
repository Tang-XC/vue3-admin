<template>
  <div class="screenfull-container" @click="toggleClick">
    <SvgIcon class="screenfull" :icon="icon"></SvgIcon>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import SvgIcon from '@/components/SvgIcon'
import screenfull from 'screenfull'
const isFullscreen = ref(false)

const toggleClick = () => {
  screenfull.toggle()
}

const icon = computed(() =>
  isFullscreen.value ? 'exit-fullscreen' : 'fullscreen'
)
const onChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}

onMounted(() => {
  screenfull.on('change', onChange)
})

onUnmounted(() => {
  screenfull.off('change', onChange)
})
</script>

<style lang="scss" scoped>
.screenfull-container {
  padding: 0 16px;
  .screenfull {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
