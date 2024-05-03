import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout'
import userManage from './modules/userManage'
import roleList from './modules/roleList'
import permission from './modules/permission'
import article from './modules/article'
import articleCreate from './modules/articleCreate'
import store from '@/store'
export const publicRoutes = [
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile'),
        meta: {
          title: 'profile',
          icon: 'user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]
export const privateRoutes = [
  userManage,
  article,
  articleCreate,
  roleList,
  permission
]
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu.path)
    })
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
