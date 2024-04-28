import { getItem, setItem } from '@/utils/storage'
import { LANG, PRIMARYCOLOR, DEFAULT_PRIMARYCOLOR } from '@/constant'
import variables from '@/styles/variables.module.scss'
export default {
  namespaced: true,
  state: {
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    primaryColor: getItem(PRIMARYCOLOR) || DEFAULT_PRIMARYCOLOR,
    variables
  },
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, language) {
      state.language = language
      setItem(LANG, language)
    },
    setPrimaryColor(state, primaryColor) {
      state.primaryColor = primaryColor
      state.variables.menuBg = primaryColor
      setItem(PRIMARYCOLOR, primaryColor)
    }
  }
}
