import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../layout'
import articleRoutes from './modules/article'
import writeRoutes from './modules/write'

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
  ...articleRoutes,
  ...writeRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
