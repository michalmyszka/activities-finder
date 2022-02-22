<template>
  <ion-page>
    <app-toolbar>
      <template #title>{{ activityId }}</template>
      <template #start-buttons>
        <ion-back-button defaultHref="/app/activities"></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <ion-button @click="deleteActivity">Delete</ion-button>
    </ion-content>
  </ion-page>
</template>

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

const route = useRoute()
const activitiesStore = useActivitiesStore()
const router = useIonRouter()

const activityId = route.params.id as string
const activity = computed(
  () => activitiesStore.$state.selectedActivity as Activity
)

try {
  activitiesStore.getActivityById({
    activityId: activityId
  })
} catch (e) {
  ErrorService.handleError(e)
}

function deleteActivity() {
  try {
    activitiesStore.deleteActivity({
      activityId: activityId
    })
    activitiesStore.getAllActivities()
    router.back()
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>
