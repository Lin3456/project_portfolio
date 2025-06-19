import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routers'

const PROD = process.env.NODE_ENV === 'production';

const router = createRouter({
  routes,
  history: PROD ? createWebHashHistory() : createWebHistory(),
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to) => {
  window.document.title = '作品集 | ' + to.meta.title //設定瀏覽器title，綁定當前頁面的title
  window.scrollTo(0, 0)
})

export default router
