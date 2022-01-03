<template>
  <ion-page>
    <app-toolbar></app-toolbar>
    <ion-content>
      <ion-spinner v-if="!activities"></ion-spinner>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonSpinner } from '@ionic/vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

let store = useStore()

const activities = computed(() => store.state.activities.activities)

store
  .dispatch('activities/getAllActivities')
  .then(() => console.log(activities.value))
</script>
