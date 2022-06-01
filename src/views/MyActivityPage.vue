<script setup lang="ts">
import ActivityCard from '@/components/ActivityCard.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonPage,
  onIonViewWillEnter,
  useIonRouter,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useIonRouter()

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

function manageActivity(activity: Activity) {
  router.push({ name: 'ManageActivity', params: { id: activity.id } })
}

function showUpdateActivityPage(activity: Activity) {
  router.push({ name: 'EditActivity', params: { id: activity.id } })
}
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ activity?.getTitle() }}</template>
      <template #start-buttons>
        <IonBackButton default-href="/my-activities" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <div v-if="activity">
        <IonButton expand="block" @click="manageActivity(activity!)">
          {{ $t('manage') }}
        </IonButton>
        <IonButton expand="block" @click="showUpdateActivityPage(activity!)">
          {{ $t('edit') }}
        </IonButton>
        <ActivityCard :activity="activity"></ActivityCard>
      </div>
    </IonContent>
  </IonPage>
</template>
