<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import SubmitActivityForm from '@/components/SubmitActivityForm.vue'
import { SubmitActivityPayload } from '@/models/activity'
import router from '@/router'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { IonBackButton, IonContent, IonPage } from '@ionic/vue'

async function createActivity(payload: SubmitActivityPayload) {
  try {
    await ActivityService.createActivity(payload)
    router.push({ name: 'AppActivities' })
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
      <submit-activity-form @submit="createActivity"></submit-activity-form>
    </ion-content>
  </ion-page>
</template>
