<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <div class="local-container">
      <SvgIcon class="local" icon="language" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languagesOptions"
          :key="item.value"
          :command="item.value"
          :style="{
            color:
              store.getters.language === item.value
                ? store.getters.cssVar.primaryColor
                : 'inherit'
          }"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import SvgIcon from '@/components/SvgIcon'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
const store = useStore()
const i18n = useI18n()
const languagesOptions = [
  {
    label: '中文',
    value: 'zh'
  },
  {
    label: 'English',
    value: 'en'
  }
]

const handleCommand = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
}
</script>
<style lang="scss" scoped>
.local-container {
  padding: 0 16px;
  .local {
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
  }
}
</style>
