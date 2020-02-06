import Layout from '@/layout'

const routes = [
  {
    path: '/article/:id',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '文章详情'
        }
      }
    ]
  }
]

export default routes