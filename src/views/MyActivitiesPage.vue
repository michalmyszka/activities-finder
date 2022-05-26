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

const { myActivities } = storeToRefs(activitiesStore)

onIonViewWillEnter(() => {
  ActivityService.getMyActivities().catch((e) => {
    ErrorService.handleError(e)
  })
})

function showCreateActivityPage() {
  router.push({ name: 'CreateActivity' })
}

function showMyActivityPage(activity: Activity) {
  router.push({ name: 'MyActivity', params: { id: activity.id } })
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
    <IonContent>
      <IonList>
        <ActivityItem
          v-for="activity in myActivities"
          :key="activity.id"
          :activity="activity"
          @click="showMyActivityPage(activity)"
        >
        </ActivityItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>
