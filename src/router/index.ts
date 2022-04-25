import { useAuthStore } from '@/store/auth'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import ActivitiesPage from '../views/ActivitiesPage.vue'
import AppPage from '../views/AppPage.vue'
import CreateActivityPage from '../views/CreateActivityPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ResetPasswordPage from '../views/ResetPasswordPage.vue'
import SettingsPage from '../views/SettingsPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import UpdateActivityPage from '../views/UpdateActivityPage.vue'
import UsersActivitiesPage from '../views/UsersActivitiesPage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
  }
}

const routes: Array<RouteRecordRaw> = [
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
    name: 'ResetPassword',
    component: ResetPasswordPage,
  },
  {
    path: '/',
    name: 'App',
    component: AppPage,
    children: [
      {
        path: '',
        redirect: '/activities',
      },
      {
        path: 'activities',
        name: 'Activities',
        component: ActivitiesPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'users-activities',
        name: 'UsersActivities',
        component: UsersActivitiesPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'activities/create',
        name: 'CreateActivity',
        component: CreateActivityPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'activities/:id',
        name: 'UpdateActivity',
        component: UpdateActivityPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsPage,
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
