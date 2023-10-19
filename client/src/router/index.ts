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
      beforeEnter: requireLogin
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue'),
      beforeEnter: requireLogin
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Account.vue'),
      beforeEnter: requireLogin
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Users.vue'),
      beforeEnter: requireAdmin
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

function requireAdmin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  
  const session = getSession();
  if(!session.user?.role.includes('admin')){
    session.redirectUrl = to.fullPath;
  }else{
    next();
  }
}

export default router
