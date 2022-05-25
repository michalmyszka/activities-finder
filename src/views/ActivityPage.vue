<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { IonBackButton, IonButton, IonContent, IonPage, onIonViewWillEnter } from '@ionic/vue'
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

function showActivityOnMap(activity: Activity) {
  window.open(
    'https://www.google.com/maps/search/?api=1&query=' +
      activity.getPlace() +
      ',' +
      activity.getAddress()
  )
}
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ activity?.getTitle() }}</template>
      <template #start-buttons>
        <IonBackButton default-href="/activities" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <div v-if="activity">
        <IonButton @click="showActivityOnMap(activity!)">{{ activity.getAddress() }}</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>
