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
import { generateTitle } from '@/utils/i18n'
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
  methods: {
    getTitle(route) {
      let title = ''
      if (!route.meta) {
        const pathArr = route.path.split('/')
        title = pathArr[pathArr.length - 1]
      } else {
        title = generateTitle(route.meta.title)
      }
      return title
    }
  },

  watch: {
    $route: {
      handler(newVal, oldVal) {
        const whiteList = ['/', '/login', '/404', '/401']
        if (!whiteList.includes(newVal.path)) {
          this.$store.commit('app/addTagsView', {
            ...newVal
          })
        }
      },
      immediate: true
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
