<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { IonBackButton, IonContent, IonPage, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const activityId = route.params.id as string
let activity = ref<Activity>()

onIonViewWillEnter(() => {
  ActivityService.loadActivityCategories().catch((e) => {
    ErrorService.handleError(e)
  })
  ActivityService.getActivityById({
    activityId: activityId,
  })
    .then((fetchedActivity) => {
      activity.value = fetchedActivity
    })
    .catch((e) => {
      ErrorService.handleError(e)
    })
})
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ $t('manage') }}</template>
      <template #start-buttons>
        <IonBackButton
          :default-href="'/my-activities/' + activityId"
          :text="$t('back')"
        ></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <div v-if="activity">xxx</div>
    </IonContent>
  </IonPage>
</template>
