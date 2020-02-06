import Layout from '@/layout'

const routes = [
  {
    path: '/write',
    component: Layout,
    children: [
      {
        path: '',
        name: 'WritePage',
        component: () => import('@/views/write/index.vue'),
        meta: {
          title: '写文章'
        }
      }
    ]
  }
]

export default routes