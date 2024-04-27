import { createI18n } from 'vue-i18n'
import store from '@/store'
const message = {
  en: {
    msg: {
      test: 'HEllo world'
    }
  },
  zh: {
    msg: {
      test: '你好，世界'
    }
  }
}

const locale = store.getters.language
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  messages: message
})

export default i18n
