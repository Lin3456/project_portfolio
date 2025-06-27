const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首頁',
      icon: 'fa-house',
    },
    component: () => import('@/views/content/home.vue'),
  },
  {
    path: '/weather',
    name: 'weather',
    meta: {
      title: '天氣預報',
      icon: 'fa-cloud',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '天氣預報',
          icon: 'fa-house',
        },
        component: () => import('@/views/content/weather/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: '404',
    },
    component: () => import('@/views/content/error/404.vue'),
  }  
]

export default routes;