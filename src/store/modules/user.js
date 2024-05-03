import { login, getUserInfo } from '@/api/sys'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import md5 from 'md5'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            // 登录成功，设置token
            this.commit('user/setToken', data.token)
            // 跳转到首页
            router.push('/')
            // 记录时间戳
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getUserInfo(context) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            this.commit('user/setUserInfo', res)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout() {
      resetRouter()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
