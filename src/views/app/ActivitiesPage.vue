<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  useIonRouter,
} from '@ionic/vue'
import {
  addOutline,
  calendarOutline,
  fileTrayOutline,
  fileTrayStackedOutline,
} from 'ionicons/icons'
import { storeToRefs } from 'pinia'
import ActivityService from '@/services/ActivityService'
import { useAuthStore } from '@/store/auth'

const activitiesStore = useActivitiesStore()
const authStore = useAuthStore()
const router = useIonRouter()

const { usersActivities } = storeToRefs(activitiesStore)

try {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ActivityService.getUsersActivities(authStore.user!)
} catch (e) {
  ErrorService.handleError(e)
}

function showCreateActivityPage() {
  router.push({ name: 'AppCreateActivity' })
}

function showActivityDetails(activity: Activity) {
  router.push({ name: 'AppActivity', params: { id: activity.id } })
}
</script>

<template>
  <ion-page>
    <app-toolbar>
      <template #end-buttons>
        <ion-button @click="showCreateActivityPage()">
          <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
        </ion-button>
      </template>
    </app-toolbar>
    <ion-content>
      <ion-spinner v-if="!usersActivities"></ion-spinner>
      <ion-list>
        <ion-item
          v-for="activity in usersActivities"
          :key="activity.id"
          @click="showActivityDetails(activity)"
        >
          <ion-card button="true" @click="showActivityDetails(activity)">
            <ion-card-header>
              <ion-card-title>{{ activity.title() }}</ion-card-title>
            </ion-card-header>
            <ion-item>
              <ion-icon slot="start" :icon="fileTrayOutline"></ion-icon>
              <ion-label>{{ activity.category() }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon slot="start" :icon="fileTrayStackedOutline"></ion-icon>
              <ion-label>{{ activity.subcategory() }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon slot="start" :icon="calendarOutline"></ion-icon>
              <ion-label>{{ activity.dateTime() }}</ion-label>
            </ion-item>
          </ion-card>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style>
ion-card {
  width: 100%;
}
</style>
