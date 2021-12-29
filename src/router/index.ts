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
        redirect: '/app/competitions',
      },
      {
        path: 'competitions',
        component: () => import('@/views/CompetitionsPage.vue'),
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
