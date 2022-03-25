<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonPage,
  useIonRouter,
} from '@ionic/vue'
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

function deleteActivity() {
  try {
    ActivityService.deleteActivity({
      activityId: activityId,
    })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ActivityService.getUsersActivities(authStore.user!)
    router.back()
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <ion-page>
    <app-toolbar>
      <template #title>{{ activityId }}</template>
      <template #start-buttons>
        <ion-back-button></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <ion-button @click="deleteActivity">Delete</ion-button>
    </ion-content>
  </ion-page>
</template>
