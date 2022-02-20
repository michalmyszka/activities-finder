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
import { useStore } from 'vuex'
import { computed } from 'vue'
import { Activity, DeleteActivityPayload } from '@/models/models'
import ErrorService from '@/services/ErrorService'

const route = useRoute()
const store = useStore()
const router = useIonRouter()

const activityId = route.params.id as string
const activity = computed(
  () => store.state.activities.selectedActivity as Activity
)

try {
  store.dispatch('activities/getActivityById', {
    activityId: activityId,
  })
} catch (e) {
  ErrorService.handleError(e)
}

function deleteActivity() {
  try {
    let payload: DeleteActivityPayload = {
      activityId: activityId,
    }
    store.dispatch('activities/deleteActivity', payload)
    store.dispatch('activities/getAllActivities')
    router.back()
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>
