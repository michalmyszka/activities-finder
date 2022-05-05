import i18n from '@/i18n/i18n'
import { Activity, ActivityCategory } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import AuthService from '@/services/AuthService'
import { IonicVue } from '@ionic/vue'
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/display.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/float-elements.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/typography.css'
import Parse from 'parse'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { User } from './models/auth'
import router from './router'
/* Theme variables */
import './theme/variables.css'

Parse.serverURL = 'https://parseapi.back4app.com/'
Parse.initialize(
  'VEFAbKE7LqjHdp7OYRsplJo4eVtYfSH8O2MBucrd',
  'BQYTCMxF4Jp5WRPmtrQXTCZopvGki4XgxMZgL4gC'
)
Parse.Object.registerSubclass('Activity', Activity)
Parse.Object.registerSubclass('ActivityCategory', ActivityCategory)
Parse.Object.registerSubclass('_User', User)

const pinia = createPinia()
const app = createApp(App).use(IonicVue).use(router).use(i18n).use(pinia)

AuthService.loadCurrentUser()
ActivityService.loadActivityCategories()

router.isReady().then(() => {
  app.mount('#app')
})
