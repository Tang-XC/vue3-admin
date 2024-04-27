import { createI18n } from 'vue-i18n'
import store from '@/store'
const langs = require.context('./lang', false, /\.js$/)
let message = {}
langs.keys().forEach((key) => {
  const lang = langs(key).default
  message = { ...message, ...lang }
})

const locale = store.getters.language
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  messages: message
})

export default i18n
