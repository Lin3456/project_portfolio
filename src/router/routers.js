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
    path: '/Portfolio',
    name: 'Portfolio',
    meta: {title: '作品集', hidden: false},
    children: [
      {
        path: '/ToDoList',
        name: 'ToDoList',
        meta: {title: 'ToDoList'},
        component: () => import('@/views/content/toDoList.vue'),
      }
    ],
  },
]

export default routes;