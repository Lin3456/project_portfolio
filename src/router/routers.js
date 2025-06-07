const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue'),
    meta: { title: '首頁' },
  },
  {
    path: '/about',
    name: 'About',
    // component: About,
    meta: { title: '關於我們', hidden: false },
    children: [
      {
        path: 'team',
        name: 'Team',
        // component: Team,
        meta: { title: '團隊介紹' },
      },
      {
        path: 'history',
        name: 'History',
        // component: History,
        meta: { title: '公司歷史' },
      },
    ],
  },
  {
    path: '/contact',
    name: 'Contact',
    // component: Contact,
    meta: { title: '聯絡我們', hidden: false },
    children: [
      {
        path: 'email',
        name: 'Email',
        // component: Email,
        meta: { title: '電子郵件' },
      },
      {
        path: 'phone',
        name: 'Phone',
        // component: Phone,
        meta: { title: '電話' },
      },
    ],
  },
]

export default routes;