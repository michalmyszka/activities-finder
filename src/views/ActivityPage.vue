<script setup lang="ts">
import ActivityCard from '@/components/ActivityCard.vue'
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
      <template #title>{{ activity?.getTitle() }}</template>
      <template #start-buttons>
        <IonBackButton default-href="/activities" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <ActivityCard v-if="activity" :activity="activity"></ActivityCard>
    </IonContent>
  </IonPage>
</template>
