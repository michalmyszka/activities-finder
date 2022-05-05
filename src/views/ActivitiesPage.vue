<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import { useActivitiesStore } from '@/store/activities'
import { IonContent, IonList, IonLoading, IonPage, onIonViewWillEnter } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const activitiesStore = useActivitiesStore()

const loading = ref(false)
const { activities } = storeToRefs(activitiesStore)

onIonViewWillEnter(() => {
  loading.value = true
  ActivityService.getAllActivities()
    .catch((e) => {
      ErrorService.handleError(e)
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <IonPage>
    <AppToolbar> </AppToolbar>
    <IonContent>
      <IonLoading :is-open="loading"></IonLoading>
      <IonList>
        <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity">
        </ActivityItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>
