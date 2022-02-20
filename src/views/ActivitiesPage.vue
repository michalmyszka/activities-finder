<template>
  <ion-page>
    <app-toolbar>
      <template #end-buttons>
        <ion-button router-link="/app/activities/create">
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
          <ion-label>{{ activity.category }}: {{ activity.subcategory }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  useIonRouter,
} from '@ionic/vue'
import { addOutline } from 'ionicons/icons'
import AppToolbar from '@/components/AppToolbar.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import ErrorService from '@/services/ErrorService'
import { Activity } from '@/models/models'

let store = useStore()
let router = useIonRouter()

const activities = computed(
  () => store.state.activities.activities as Activity[]
)

try {
  store.dispatch('activities/getAllActivities')
} catch (e) {
  ErrorService.handleError(e)
}

function showActivityDetails(activity: Activity) {
  router.push('/app/activities/' + activity.id)
}
</script>
