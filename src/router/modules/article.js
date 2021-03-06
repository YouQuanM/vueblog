import Layout from '@/layout'

const routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/article',
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