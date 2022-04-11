import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '*', name: 'page-not-found', component: () => import('../components/page-not-found/page-not-found') },
  { path: '/', name: 'home', component: () => import('../components/interface/home') },
  { path: '/login', name: 'login', component: () => import('../components/authentication/login') },
  { path: '/register', name: 'register', component: () => import('../components/authentication/register') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
