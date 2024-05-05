import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404']

/**
 * 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 从哪里来
 * @param {*} next 放行
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        console.log(router.getRoutes())
        const { permission } = await store.dispatch('user/getUserInfo')
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })

        return next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
