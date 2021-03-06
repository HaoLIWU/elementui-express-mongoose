import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../views/Edit')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
