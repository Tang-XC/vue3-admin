import i18n from '@/local'
import { watch } from 'vue'
import store from '@/store'
export function generateTitle(title) {
  return i18n.global.t('route.' + title)
}
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
