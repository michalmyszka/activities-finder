<script setup lang="ts">
import ActivityForm from '@/components/ActivityForm.vue'
import AppModal from '@/components/AppModal.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity, ActivityPayload } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonPage,
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

async function updateActivity(activityPayload: ActivityPayload) {
  try {
    activityPayload.activity = activity.value
    await ActivityService.updateActivity(activityPayload)
    router.push({ name: 'UsersActivities' })
  } catch (e) {
    ErrorService.handleError(e)
  }
}

function openConfirmDeleteActivityModal() {
  confirmDeleteActivityModalOpen.value = true
}

function dismissDeleteActivityModal() {
  confirmDeleteActivityModalOpen.value = false
}

async function deleteActivity() {
  try {
    await ActivityService.deleteActivity({ activityId: activityId })
    dismissDeleteActivityModal()
    router.push({ name: 'UsersActivities' })
  } catch (e) {
    ErrorService.handleError(e)
  }
}
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ $t('updateActivity') }}</template>
      <template #start-buttons>
        <IonBackButton default-href="/users-activities" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <div v-if="activity">
        <ActivityForm
          :title="activity.getTitle()"
          :description="activity.getDescription()"
          :activity-category="activityCategories.find((value) => value.getName() === activity!.getCategory())"
          :activity-subcategory="activity.getSubcategory()"
          :place="activity.getPlace()"
          :date-time="formatISO(activity.getDateTime())"
          @submit="updateActivity"
        ></ActivityForm>
        <IonButton expand="block" @click="openConfirmDeleteActivityModal" color="danger">{{
          $t('delete')
        }}</IonButton>
        <AppModal
          :title="$t('deleteActivity')"
          :dismiss-button-text="$t('cancel')"
          :modal-open="confirmDeleteActivityModalOpen"
          @dismiss="dismissDeleteActivityModal"
        >
          <template #content>
            <IonButton expand="block" color="danger" @click="deleteActivity">{{
              $t('delete')
            }}</IonButton>
          </template>
        </AppModal>
      </div>
    </IonContent>
  </IonPage>
</template>
