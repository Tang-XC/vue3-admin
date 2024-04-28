<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import En from 'element-plus/es/locale/lang/en'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  computed: {
    locale() {
      switch (this.$store.getters.language) {
        case 'zh':
          return this.zhCn

        case 'en':
          return this.En

        default:
          return this.zhCn
      }
    }
  },
  setup() {
    const store = useStore()
    generateNewStyle(store.getters.primaryColor).then((newStyleText) => {
      writeNewStyle(newStyleText)
    })
    return {
      zhCn,
      En
    }
  }
})
</script>

<style></style>
