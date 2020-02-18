import Layout from '@/layout'

const routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/mine',
        name: 'minePage',
        component: () => import('@/views/mine/index.vue'),
        meta: {
          title: '我的'
        }
      }
    ]
  }
]

export default routes