<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonList,
  IonPage,
  onIonViewWillEnter,
  useIonRouter,
} from '@ionic/vue'
import { addOutline } from 'ionicons/icons'
import { storeToRefs } from 'pinia'

const activitiesStore = useActivitiesStore()
const router = useIonRouter()

const { usersActivities } = storeToRefs(activitiesStore)

onIonViewWillEnter(() => {
  ActivityService.getUsersActivities().catch((e) => {
    ErrorService.handleError(e)
  })
})

function showCreateActivityPage() {
  router.push({ name: 'CreateActivity' })
}

function showUpdateActivityPage(activity: Activity) {
  router.push({ name: 'UpdateActivity', params: { id: activity.id } })
}
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #end-buttons>
        <IonButton @click="showCreateActivityPage()">
          <IonIcon slot="icon-only" :icon="addOutline"></IonIcon>
        </IonButton>
      </template>
    </AppToolbar>
    <IonContent class="ion-padding">
      <IonList>
        <ActivityItem
          v-for="activity in usersActivities"
          :key="activity.id"
          :activity="activity"
          @click="showUpdateActivityPage(activity)"
        >
        </ActivityItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>
