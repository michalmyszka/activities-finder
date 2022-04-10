<script setup lang="ts">
import ActivityForm from '@/components/ActivityForm.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity, ActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import {
  IonBackButton,
  IonContent,
  IonPage,
  IonSpinner,
  onIonViewWillEnter,
  useIonRouter,
} from '@ionic/vue'
import { formatISO } from 'date-fns'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const router = useIonRouter()
const route = useRoute()
const activitiesStore = useActivitiesStore()

const activityId = route.params.id as string
const { activityCategories } = storeToRefs(activitiesStore)
let activity = ref<Activity>()

onIonViewWillEnter(() => {
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

async function submitActivityChanges(payload: ActivityPayload) {
  try {
    await ActivityService.updateActivity(payload, activity.value!)
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
        <IonBackButton></IonBackButton>
      </template>
    </AppToolbar>
    <ion-content>
      <IonSpinner v-if="!activity"></IonSpinner>
      <ActivityForm
        v-else
        :title="activity.title()"
        :description="activity.description()"
        :activity-category="activityCategories.find((value) => value.name() === activity!.category())"
        :activity-subcategory="activity.subcategory()"
        :date-time="formatISO(activity.dateTime())"
        @submit="submitActivityChanges"
      ></ActivityForm>
    </ion-content>
  </IonPage>
</template>
