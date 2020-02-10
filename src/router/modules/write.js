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
      },
      {
        path: ':id',
        name: 'ModifyArticle',
        component: () => import('@/views/write/index.vue'),
        meta: {
          title: '修改文章'
        }
      }
    ]
  }
]

export default routes