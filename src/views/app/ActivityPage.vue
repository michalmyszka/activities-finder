<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  useIonRouter,
} from '@ionic/vue'
import {
  calendarOutline,
  fileTrayOutline,
  fileTrayStackedOutline,
} from 'ionicons/icons'
import AppToolbar from '@/components/AppToolbar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { Activity } from '@/models/activity'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import ActivityService from '@/services/ActivityService'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const activitiesStore = useActivitiesStore()
const authStore = useAuthStore()
const router = useIonRouter()

const activityId = route.params.id as string
const activity = computed(() => activitiesStore.selectedActivity as Activity)

try {
  ActivityService.getActivityById({
    activityId: activityId,
  })
} catch (e) {
  ErrorService.handleError(e)
}

async function deleteActivity() {
  try {
    await ActivityService.deleteActivity({
      activityId: activityId,
    })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await ActivityService.getUsersActivities(authStore.user!)
    router.back()
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <ion-page v-if="activity">
    <app-toolbar>
      <template #title>{{ activity.title() }}</template>
      <template #start-buttons>
        <ion-back-button></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <ion-card>
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
        <ion-card-content>
          {{ activity.description() }}
        </ion-card-content>
        <ion-item>
          <ion-button slot="end" @click="deleteActivity" color="secondary"
            >Edit</ion-button
          >
          <ion-button slot="end" @click="deleteActivity" color="danger"
            >Delete</ion-button
          >
        </ion-item>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
