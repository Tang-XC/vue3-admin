import { getItem, setItem } from '@/utils/storage'
import { LANG, PRIMARYCOLOR, DEFAULT_PRIMARYCOLOR, TAGS_VIEW } from '@/constant'
import variables from '@/styles/variables.module.scss'
import _ from 'lodash'
export default {
  namespaced: true,
  state: {
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    primaryColor: getItem(PRIMARYCOLOR) || DEFAULT_PRIMARYCOLOR,
    variables,
    tagsView: getItem(TAGS_VIEW) || []
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
    },
    addTagsView(state, view) {
      if (state.tagsView.some((v) => v.path === view.path)) return
      state.tagsView.push(view)
      setItem(TAGS_VIEW, state.tagsView)
    },
    removeTagsView(state, view) {
      const beforeTags = _.cloneDeep(state.tagsView)
      if (
        beforeTags[view.index] &&
        beforeTags[view.index].path === view.currentRoute
      ) {
        let path = ''
        if (beforeTags[view.index - 1]) {
          path = beforeTags[view.index - 1].path
        } else if (beforeTags[view.index + 1]) {
          path = beforeTags[view.index + 1].path
        } else {
          return
        }
        view.callback(path)
      }
      switch (view.type) {
        case 'index':
          state.tagsView.splice(view.index, 1)
          break
        case 'other':
          state.tagsView.splice(
            view.index + 1,
            state.tagsView.length - view.index - 1
          )
          state.tagsView.splice(0, view.index)
          break
        case 'right':
          state.tagsView.splice(
            view.index + 1,
            state.tagsView.length - view.index - 1
          )
          break
        case 'left':
          state.tagsView.splice(0, view.index)
          break
      }
    }
  }
}
