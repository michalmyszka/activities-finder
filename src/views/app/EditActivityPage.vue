<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import SubmitActivityForm from '@/components/SubmitActivityForm.vue'
import { Activity, SubmitActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import { useAuthStore } from '@/store/auth'
import { IonBackButton, IonContent, IonPage, useIonRouter } from '@ionic/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

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

async function submitActivityChanges(payload: SubmitActivityPayload) {
  try {
    console.log(payload)
  } catch (e) {
    ErrorService.handleError(e)
  }
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
  <ion-page>
    <app-toolbar>
      <template #title>{{ $t('createActivity') }}</template>
      <template #start-buttons>
        <ion-back-button></ion-back-button>
      </template>
    </app-toolbar>
    <ion-content>
      <submit-activity-form @submit="submitActivityChanges"></submit-activity-form>
    </ion-content>
  </ion-page>
</template>
