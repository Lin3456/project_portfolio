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
        path: 'overView',
        name: 'weatherOverview',
        meta: {
          title: '本周天氣概覽',
          icon: 'fa-cloud-sun',
        },
        component: () => import('@/views/content/weather/overView.vue'),
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