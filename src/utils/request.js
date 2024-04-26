import axios from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.icode = 'helloqianduanxunlianying'

    if (store.getters.token) {
      // 请求头携带token
      config.headers.Authorization = `Bearer ${store.getters.token}`

      // 判断登录token是否过期
      if (isCheckTimeout()) {
        // 退出登录
        store.dispatch('user/logout')
        return Promise.reject(new Error('登录已过期，请重新登录'))
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    try {
      const { message } = error.response.data
      ElMessage.error(message)
    } catch (_) {
      ElMessage.error(error.message)
    }

    return Promise.reject(error)
  }
)

export default service
