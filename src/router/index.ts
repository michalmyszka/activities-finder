import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import AppPage from '../views/AppPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/app',
  },
  {
    path: '/app/',
    component: AppPage,
    children: [
      {
        path: '',
        redirect: '/app/activities',
      },
      {
        path: 'activities',
        component: () => import('@/views/ActivitiesPage.vue'),
      },
      {
        path: 'activities/create',
        component: () => import('@/views/CreateActivityPage.vue'),
      },
      {
        path: 'activities/:id',
        component: () => import('@/views/ActivityPage.vue'),
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
