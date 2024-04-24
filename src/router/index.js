import { createRouter, createWebHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/',
    component: () => import('@/layout/index')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes
})

export default router
