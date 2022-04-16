<script setup lang="ts">
import ActivityForm from '@/components/ActivityForm.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { ActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { IonBackButton, IonContent, IonPage } from '@ionic/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

async function createActivity(payload: ActivityPayload) {
  try {
    await ActivityService.createActivity(payload)
    router.push({ name: 'AppActivities' })
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
        <IonBackButton default-href="/" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <ActivityForm @submit="createActivity"></ActivityForm>
    </IonContent>
  </IonPage>
</template>
