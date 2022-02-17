<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import Parse from 'parse'
import ErrorService from '@/services/ErrorService'
import { useStore } from 'vuex'
import { ActivityCategory } from '@/models/models'

Parse.serverURL = 'https://parseapi.back4app.com/'
Parse.initialize(
  'VEFAbKE7LqjHdp7OYRsplJo4eVtYfSH8O2MBucrd',
  'BQYTCMxF4Jp5WRPmtrQXTCZopvGki4XgxMZgL4gC'
)

Parse.Object.registerSubclass('ActivityCategory', ActivityCategory)

try {
  useStore().dispatch('activities/getActivityCategories')
} catch (e) {
  ErrorService.handleError(e)
}
</script>
