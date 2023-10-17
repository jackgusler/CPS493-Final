import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { getSession } from '@/models/session';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      beforeEnter: requireLogin
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')

    },
    {
      path: '/my-workouts',
      name: 'my-workouts',
      component: () => import('../views/MyWorkouts.vue'),
      beforeEnter: requireLogin
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/Statistics.vue'),
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Account.vue'),
      beforeEnter: requireLogin
    }
  ]
})

function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  
  const session = getSession();
  if(!session.user){
    session.redirectUrl = to.fullPath;
    next('/login');
  }else{
    next();
  }
}

export default router
