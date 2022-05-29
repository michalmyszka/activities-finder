import { useAuthStore } from '@/store/auth'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import ActivitiesPage from '../views/ActivitiesPage.vue'
import ActivityPage from '../views/ActivityPage.vue'
import AppPage from '../views/AppPage.vue'
import CreateActivityPage from '../views/CreateActivityPage.vue'
import EditActivityPage from '../views/EditActivityPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ManageActivityPage from '../views/ManageActivityPage.vue'
import MyActivitiesPage from '../views/MyActivitiesPage.vue'
import MyActivityPage from '../views/MyActivityPage.vue'
import ConnectionsPage from '../views/ConnectionsPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import ResetPasswordPage from '../views/ResetPasswordPage.vue'
import SettingsPage from '../views/SettingsPage.vue'
import SignUpPage from '../views/SignUpPage.vue'

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
        path: 'activities/:id',
        name: 'Activity',
        component: ActivityPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'my-activities',
        name: 'MyActivities',
        component: MyActivitiesPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'my-activities/create',
        name: 'CreateActivity',
        component: CreateActivityPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'my-activities/:id',
        name: 'MyActivity',
        component: MyActivityPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'my-activities/:id/edit',
        name: 'EditActivity',
        component: EditActivityPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'my-activities/:id/manage',
        name: 'ManageActivity',
        component: ManageActivityPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'settings/profile',
        name: 'Profile',
        component: ProfilePage,
        meta: { requiresAuth: true },
      },
      {
        path: 'connections',
        name: 'Connections',
        component: ConnectionsPage,
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
