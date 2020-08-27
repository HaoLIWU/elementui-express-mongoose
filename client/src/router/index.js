import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: {name: 'CaseHistory'}
  },
  {
    path: '/casehistory',
    name: 'CaseHistory',
    component: () => import('../views/CaseHistory')
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/Add')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('../views/Edit')
  },
  {
    path: '/display',
    name: 'Display',
    component: () => import('../views/Display')
  },
  {
    path: '/diary',
    name: 'Diary',
    component: () => import('../views/Diary')
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('../views/Me')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register')
  }
]
const router = new Router({
  mode: 'hash',
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  let name = localStorage.getItem('name')
  if (!name) {
    if (to.path === '/login' || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
