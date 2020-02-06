import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../layout'
// import detailRoutes from './modules/detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/article/:id',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/detail/index.vue'),
        meta: {
          title: '文章详情'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
