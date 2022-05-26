<script setup lang="ts">
import ActivityForm from '@/components/ActivityForm.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { ActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { IonBackButton, IonContent, IonPage, onIonViewWillEnter, useIonRouter } from '@ionic/vue'

const router = useIonRouter()

onIonViewWillEnter(() => {
  ActivityService.loadActivityCategories().catch((e) => {
    ErrorService.handleError(e)
  })
})

async function createActivity(payload: ActivityPayload) {
  try {
    await ActivityService.createActivity(payload)
    router.push({ name: 'MyActivities' })
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
        <IonBackButton default-href="/my-activities" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <ActivityForm @submit="createActivity"></ActivityForm>
    </IonContent>
  </IonPage>
</template>
