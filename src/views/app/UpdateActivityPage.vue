<script setup lang="ts">
import ActivityForm from '@/components/ActivityForm.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity, ActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import {
  IonBackButton,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
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
const confirmDeleteActivityModalOpen = ref(false)

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

async function updateActivity(activityPayload: ActivityPayload) {
  try {
    activityPayload.activity = activity.value
    await ActivityService.updateActivity(activityPayload)
    router.push({ name: 'AppActivities' })
  } catch (e) {
    ErrorService.handleError(e)
  }
}

function openConfirmDeleteActivityModal() {
  confirmDeleteActivityModalOpen.value = true
}

async function deleteActivity() {
  try {
    await ActivityService.deleteActivity({ activityId: activityId })
    router.push({ name: 'AppActivities' })
  } catch (e) {
    ErrorService.handleError(e)
  } finally {
    confirmDeleteActivityModalOpen.value = false
  }
}

function cancelDeleteActivity() {
  confirmDeleteActivityModalOpen.value = false
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
    <ion-content>
      <IonLoading :is-open="!activity"></IonLoading>
      <div v-if="activity">
        <ActivityForm
          :title="activity.title()"
          :description="activity.description()"
          :activity-category="activityCategories.find((value) => value.name() === activity!.category())"
          :activity-subcategory="activity.subcategory()"
          :date-time="formatISO(activity.dateTime())"
          @submit="updateActivity"
        ></ActivityForm>
        <IonButton expand="block" @click="openConfirmDeleteActivityModal" color="danger">{{
          $t('delete')
        }}</IonButton>
        <IonModal :is-open="confirmDeleteActivityModalOpen">
          <IonHeader>
            <IonToolbar>
              <IonTitle>{{ $t('deleteActivity') }}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol>{{ $t('deleteActivityAreYouSure') }}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol
                  ><IonButton expand="block" color="danger" @click="deleteActivity">{{
                    $t('ok')
                  }}</IonButton></IonCol
                >
                <IonCol
                  ><IonButton expand="block" color="primary" @click="cancelDeleteActivity">{{
                    $t('cancel')
                  }}</IonButton></IonCol
                >
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </div>
    </ion-content>
  </IonPage>
</template>
