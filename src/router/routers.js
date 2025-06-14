const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    meta: {title: '首頁'},
    component: () => import('@/views/content/home.vue'),
  },
  {
    path: '/resume',
    name: 'resume',
    meta: {title: '履歷表'},
    component: () => import('@/views/content/resume/index.vue'),
  },
  {
    path: '/Portfolio',
    name: 'Portfolio',
    // component: About,
    meta: {title: '作品集', hidden: false},
    children: [
      
    ],
  },
]

export default routes;