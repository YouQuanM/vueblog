import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index/index.vue'
import Layout from '../layout'
import articleRoutes from './modules/article'
import writeRoutes from './modules/write'
import Test from '../views/test.vue'
import mineRoutes from './modules/mine'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index
      }
    ]
  },
  ...articleRoutes,
  ...writeRoutes,
  ...mineRoutes,
  {
    path: '',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '/test',
        name: 'Text',
        component: Test
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
