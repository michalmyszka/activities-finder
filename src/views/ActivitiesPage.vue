<script setup lang="ts">
import ActivityFiltersToolbar from '@/components/ActivityFiltersToolbar.vue'
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
    <ActivityFiltersToolbar></ActivityFiltersToolbar>
    <IonContent class="ion-padding">
      <IonList>
        <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity">
        </ActivityItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>
