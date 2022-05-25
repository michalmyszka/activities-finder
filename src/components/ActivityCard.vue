<script setup lang="ts">
import { Activity } from '@/models/activity'
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/vue'
import { calendarOutline, locationOutline } from 'ionicons/icons'
import { computed, defineProps } from 'vue'

const props = defineProps({
  activity: { type: Activity, required: true },
})

const mapLink = computed(() => {
  return (
    'https://www.google.com/maps/search/?api=1&query=' +
    props.activity.getPlace() +
    ',' +
    props.activity.getAddress()
  )
})
</script>

<template>
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{{ activity.getTitle() }}</IonCardTitle>
      <IonCardSubtitle>
        {{ activity.getCategory() + ' - ' + activity.getSubcategory() }}
      </IonCardSubtitle>
    </IonCardHeader>
    <IonItem :href="mapLink" target="_blank">
      <IonIcon :icon="locationOutline" slot="start"></IonIcon>
      <IonLabel>{{ activity.getPlace() + ', ' + activity.getAddress() }}</IonLabel>
    </IonItem>
    <IonItem>
      <IonIcon :icon="calendarOutline" slot="start"></IonIcon>
      <IonLabel>{{ activity.getDateTime() }}</IonLabel>
    </IonItem>
    <IonCardContent>
      <IonItem>
        {{ activity.getDescription() }}
      </IonItem>
    </IonCardContent>
  </IonCard>
</template>
