const routes = [
  {
    path: '/',
    redirect: '/resume'
  },
  {
    path: '/resume',
    name: 'resume',
    meta: { title: '履歷表' },
    component: () => import('@/views/content/resume/index.vue'),
  },
  {
    path: '/sample',
    name: 'sample',
    meta: { title: '履歷表_範本' },
    component: () => import('@/views/content/resume/sample.vue'),
  },
  {
    path: '/Portfolio',
    name: 'Portfolio',
    // component: About,
    meta: { title: '作品集', hidden: false },
    children: [
      
    ],
  },
]

export default routes;