<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
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
  router.push({ name: 'AppCreateActivity' })
}

function showUpdateActivityPage(activity: Activity) {
  router.push({ name: 'AppUpdateActivity', params: { id: activity.id } })
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
      <IonLoading :is-open="!usersActivities"></IonLoading>
      <IonList>
        <IonItem v-for="activity in usersActivities" :key="activity.id">
          <IonLabel>
            <IonText @click="showUpdateActivityPage(activity)">
              <h1>{{ activity.title() }}</h1>
              <h2>{{ activity.category() }} - {{ activity.subcategory() }}</h2>
              <h2>{{ activity.dateTime() }}</h2>
            </IonText>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style>
.wrap-text {
  white-space: pre-wrap;
}
</style>
