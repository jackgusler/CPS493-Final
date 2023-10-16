import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/workoutle',
      name: 'workoutle',
      component: () => import('../views/Workoutle.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Account.vue')
    }
  ]
})

export default router
