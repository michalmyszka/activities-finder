import { useAuthStore } from '@/store/auth'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import AppPage from '../views/app/AppPage.vue'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import ResetPasswordPage from '../views/ResetPasswordPage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUpPage,
  },
  {
    path: '/reset-password',
    name: 'SignUp',
    component: ResetPasswordPage,
  },
  {
    path: '/app/',
    name: 'App',
    component: AppPage,
    children: [
      {
        path: '',
        redirect: '/app/activities',
      },
      {
        path: 'activities',
        name: 'AppActivities',
        component: () => import('@/views/app/ActivitiesPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'activities/create',
        name: 'AppCreateActivity',
        component: () => import('@/views/app/CreateActivityPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'activities/:id',
        name: 'AppActivity',
        component: () => import('@/views/app/ActivityPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'settings',
        name: 'AppSettings',
        component: () => import('@/views/app/SettingsPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  if (!authStore.user && to.meta.requiresAuth) {
    return { name: 'Login' }
  }
})

export default router
