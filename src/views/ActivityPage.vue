<script setup lang="ts">
import AppToolbar from '@/components/AppToolbar.vue'
import { Activity } from '@/models/activity'
import ActivityService from '@/services/ActivityService'
import ErrorService from '@/services/ErrorService'
import {
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  onIonViewWillEnter,
} from '@ionic/vue'
import { calendarOutline, locationOutline } from 'ionicons/icons'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const activityId = route.params.id as string
let activity = ref<Activity>()

const mapLink = computed(() => {
  return (
    'https://www.google.com/maps/search/?api=1&query=' +
    activity.value?.getPlace() +
    ',' +
    activity.value?.getAddress()
  )
})

onIonViewWillEnter(() => {
  ActivityService.loadActivityCategories().catch((e) => {
    ErrorService.handleError(e)
  })
  ActivityService.getActivityById({
    activityId: activityId,
  })
    .then((fetchedActivity) => {
      activity.value = fetchedActivity
    })
    .catch((e) => {
      ErrorService.handleError(e)
    })
})
</script>

<template>
  <IonPage>
    <AppToolbar>
      <template #title>{{ activity?.getTitle() }}</template>
      <template #start-buttons>
        <IonBackButton default-href="/activities" :text="$t('back')"></IonBackButton>
      </template>
    </AppToolbar>
    <IonContent>
      <IonCard v-if="activity">
        <IonCardHeader>
          <IonCardTitle>{{ activity.getTitle() }}</IonCardTitle>
          <IonCardSubtitle>
            {{ activity.getCategory() + ' - ' + activity.getSubcategory() }}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonItem>
          <IonIcon :icon="calendarOutline" slot="start"></IonIcon>
          <IonLabel>{{ activity.getDateTime() }}</IonLabel>
        </IonItem>
        <IonItem :href="mapLink" target="_blank">
          <IonIcon :icon="locationOutline" slot="start"></IonIcon>
          <IonLabel>{{ activity.getPlace() + ', ' + activity.getAddress() }}</IonLabel>
        </IonItem>
        <IonCardContent>
          <IonItem>
            {{ activity.getDescription() }}
          </IonItem>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
</template>
