import { PRIMARYCOLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'
const getters = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => ({
    ...state.app.variables,
    ...generateColors(getItem(PRIMARYCOLOR))
  }),
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  primaryColor: (state) => state.app.primaryColor
}
export default getters
