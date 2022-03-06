<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  useIonRouter
} from '@ionic/vue'
import { addOutline } from 'ionicons/icons'
import { storeToRefs } from 'pinia'

let activitiesStore = useActivitiesStore()
let router = useIonRouter()

const { activities } = storeToRefs(activitiesStore)

try {
  activitiesStore.getAllActivities()
} catch (e) {
  ErrorService.handleError(e)
}

function showCreateActivityPage() {
  router.push({ name: 'AppCreateActivity' })
}

function showActivityDetails(activity: Activity) {
  router.push({ name: 'AppActivities', params: { id: activity.id } })
}
</script>

<template>
  <ion-page>
    <app-toolbar>
      <template #end-buttons>
        <ion-button @click="showCreateActivityPage()">
          <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
        </ion-button>
      </template>
    </app-toolbar>
    <ion-content>
      <ion-spinner v-if="!activities"></ion-spinner>
      <ion-list>
        <ion-item
          v-for="activity in activities"
          :key="activity.id"
          @click="showActivityDetails(activity)"
        >
          <ion-label>{{ activity }} - {{ activity.category }}: {{ activity.subcategory }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>