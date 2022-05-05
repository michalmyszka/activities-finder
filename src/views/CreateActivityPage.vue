<script setup lang="ts">
import ActivityForm from '@/components/ActivityForm.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { ActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { IonBackButton, IonContent, IonPage, useIonRouter } from '@ionic/vue'

const router = useIonRouter()

async function createActivity(payload: ActivityPayload) {
  try {
    await ActivityService.createActivity(payload)
    router.push({ name: 'AppMyActivities' })
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ $t('createActivity') }}</template>
      <template #start-buttons>
        <IonBackButton default-href="/app" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent class="ion-padding">
      <ActivityForm @submit="createActivity"></ActivityForm>
    </IonContent>
  </IonPage>
</template>
