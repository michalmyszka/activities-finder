<script setup lang="ts">
import ErrorService from '@/services/ErrorService'
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { useActivitiesStore } from './store/activities'

try {
  useActivitiesStore().getActivityCategories()
} catch (e) {
  ErrorService.handleError(e)
}
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
