import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routers'

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to) => {
  window.document.title = '作品集 | ' + to.meta.title //設定瀏覽器title，綁定當前頁面的title
  window.scrollTo(0, 0)
})

export default router
