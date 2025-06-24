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
    path: '/Portfolio',
    name: 'Portfolio',
    meta: {
      title: '作品集',
      icon: 'fa-briefcase',
      hidden: false,
    },
    children: [
      {
        path: 'ToDoList',
        name: 'ToDoList',
        meta: {
          title: 'ToDoList',
          icon: 'fa-list',
        },
        component: () => import('@/views/content/toDoList.vue'),
      }
    ],
  },
]

export default routes;