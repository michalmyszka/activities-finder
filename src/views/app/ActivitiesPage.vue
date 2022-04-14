<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  onIonViewWillEnter,
  useIonRouter,
} from '@ionic/vue'
import {
  addOutline,
  calendarOutline,
  fileTrayOutline,
  fileTrayStackedOutline,
} from 'ionicons/icons'
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
        <IonItem
          v-for="activity in usersActivities"
          :key="activity.id"
          @click="showUpdateActivityPage(activity)"
        >
          <IonCard button="true" @click="showUpdateActivityPage(activity)">
            <IonCardHeader>
              <IonCardTitle>{{ activity.title() }}</IonCardTitle>
            </IonCardHeader>
            <IonItem>
              <IonIcon slot="start" :icon="fileTrayOutline"></IonIcon>
              <ion-label>{{ activity.category() }}</ion-label>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" :icon="fileTrayStackedOutline"></IonIcon>
              <ion-label>{{ activity.subcategory() }}</ion-label>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" :icon="calendarOutline"></IonIcon>
              <ion-label>{{ activity.dateTime() }}</ion-label>
            </IonItem>
          </IonCard>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>
