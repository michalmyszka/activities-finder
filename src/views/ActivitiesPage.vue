<script setup lang="ts">
import ActivityFilters from '@/components/ActivityFilters.vue'
import ActivityItem from '@/components/ActivityItem.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import { IonContent, IonList, IonPage, onIonViewWillEnter } from '@ionic/vue'
import { storeToRefs } from 'pinia'

const activitiesStore = useActivitiesStore()

const { activities } = storeToRefs(activitiesStore)

onIonViewWillEnter(() => {
  ActivityService.getAllActivities().catch((e) => {
    ErrorService.handleError(e)
  })
})
</script>

<template>
  <IonPage>
    <AppToolbar> </AppToolbar>
    <IonContent class="ion-padding">
      <ActivityFilters></ActivityFilters>
      <IonList>
        <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity">
        </ActivityItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>
