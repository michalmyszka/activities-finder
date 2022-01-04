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
        <ion-item v-for="activity in activities" :key="activity.id">
          <ion-label>{{ activity.type }}</ion-label>
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
} from '@ionic/vue'
import { addOutline } from 'ionicons/icons'
import AppToolbar from '@/components/AppToolbar.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

let store = useStore()

const activities = computed(() => store.state.activities.activities)

store.dispatch('activities/getAllActivities')
</script>
