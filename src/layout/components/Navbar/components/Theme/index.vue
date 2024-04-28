<template>
  <div class="theme-container" @click="openThemeDialog">
    <SvgIcon class="theme" icon="change-theme" />
  </div>
  <el-dialog width="400px" :title="$t('changeTheme')" v-model="themeDialog">
    <div style="display: grid; place-items: center">
      <el-color-picker
        size="large"
        v-model="theme"
        show-alpha
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <el-button @click="handleSetTheme" type="primary">
        {{ $t('handle.ok') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
const store = useStore()
const themeDialog = ref(false)
const theme = ref(store.getters.primaryColor)
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]
const openThemeDialog = () => {
  themeDialog.value = true
}
const handleSetTheme = async () => {
  store.commit('app/setPrimaryColor', theme.value)
  const newStyleText = await generateNewStyle(theme.value)
  writeNewStyle(newStyleText)
  themeDialog.value = false
}
</script>
<style lang="scss" scoped>
.theme-container {
  padding: 0 16px;
  cursor: pointer;
  .theme {
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
  }
}
</style>
